""" Django view module
"""

import json
import time
from django.http import JsonResponse, HttpResponseBadRequest
from django.conf import settings
from rest_framework.views import APIView
from api.location.gps import distance
from api.firebase_auth.authentication import TokenAuthentication
from api.firebase_auth.permissions import FirebasePermissions

DB = settings.FIREBASE.database()

class EventView(APIView):
    """ API view class for events
    """
    authentication_classes = (TokenAuthentication,)
    permission_classes = (FirebasePermissions,)

    def get(self, request):
        """Returns events within a certain radius for a given location

        GET request parameters:
            [REQUIRED]
            id: firebase event id
        Arguments:
            request {[type]} -- [ Contains the django request object]
        Returns:
            [HttpResponseBadRequest] -- [If  event id is not given]
            [JsonResponse] -- [Containing the event data]
        """
        query = request.GET.get('id', '')
        if query == '':
            return HttpResponseBadRequest("Bad request: No Id specified")

        data = DB.child('incidents').child(query).get().val()
        for key in data['reportedBy']:
            udata = DB.child('users').child(data['reportedBy'][key]).get().val()
            data['reportedBy'][key] = {
                'displayName': udata['displayName'],
                'photoURL': udata['photoURL'],
            }
        return JsonResponse(data, safe=False)

    def post(self, request):
        """Post event to firebase DB.

        Potential required features:
            Custom validation
            Location validation
            Spam classification
        """
        event_data = json.loads(request.body.decode()).get('eventData', '')
        if event_data == '':
            return HttpResponseBadRequest("Bad request")
        decoded_json = json.loads(event_data)
        decoded_json['datetime'] = int(time.time()*1000)
        decoded_json['comments'] = ''
        decoded_json['images'] = {}
        decoded_json['upvotes'] = 0
        data = DB.child('incidents').push(decoded_json)
        key = data['name']
        uid = str(request.user)
        DB.child('incidents/' + str(key) + '/reportedBy/').push(uid)
        DB.child('users/' + uid + '/incidents/').push(key)
        return JsonResponse({"eventId":str(key)})

class MultipleEventsView(APIView):
    """API View for grouping incidents by location
    """

    def get(self, request):
        """Returns events within a certain radius for a given location

        POST request parameters:
            [REQUIRED]
            lat: latitude of the location

            long: longitude of the location

            dist: maximum radius of the location

        Arguments:
            request {[type]} -- [ Contains the django request object]

        Returns:
            [HttpResponseBadRequest] -- [If  any of the required parameters is
                                        not given.]
            [JsonResponse] -- [Containing the event data]
        """

        # Should use API View here
        lat = float(request.GET.get('lat', ''))
        lng = float(request.GET.get('long', ''))
        thresold = float(request.GET.get('dist', ''))
        if lat == '' or lng == '' or thresold == '':
            return HttpResponseBadRequest("Bad request")

        incidents = DB.child('incidents').get()
        data = []

        # Find events which are inside the circle

        # This method is highly inefficient
        # In takes O(n) time for each request
        # Should use a GeoHash based solution instead of this
        for incident in incidents.each():
            event = dict(incident.val())
            temp = {}
            temp['key'] = incident.key()
            temp['lat'] = event['location']['coords']['latitude']
            temp['long'] = event['location']['coords']['longitude']
            temp['category'] = event['category']
            temp['title'] = event['title']
            temp['datetime'] = event['datetime']
            tmplat = float(event['location']['coords']['latitude'])
            tmplng = float(event['location']['coords']['longitude'])
            dist = distance(tmplat, tmplng, lat, lng)
            if dist < thresold:
                data.append(temp)

        # Cluster the events
        cluster_thresold = float(request.GET.get('min', 0))
        # This code should also be present on client side
        if cluster_thresold:
            # clustered incidents data
            clustered_data = []
            # Consider each node as root for now
            for root in data:
                # If is clustered flag is not present
                if not root.get('isClustered', False):
                    # Loop though the points
                    for child in data:
                        # Base case
                        if child['key'] == root['key']:
                            continue
                        # If node is not clustered
                        if not child.get('isClustered', False):
                            # Calculate the distance
                            temp_distance = distance(root['lat'], root['long'],
                                                     child['lat'], child['long'])
                            # If two points are too close on map cluster them
                            if temp_distance < cluster_thresold:
                                # Update root
                                root['isClustered'] = True
                                root['lat'] = (root['lat'] + child['lat'])/2
                                root['long'] = (root['long'] + child['long'])/2
                                # Mark child
                                child['isClustered'] = True
                    clustered_data.append(root)
            return JsonResponse(clustered_data, safe=False)
        return JsonResponse(data, safe=False)
