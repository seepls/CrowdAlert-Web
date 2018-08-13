"""Django view module
"""

import json
import time
from django.http import JsonResponse, HttpResponseBadRequest
from django.conf import settings
from rest_framework.views import APIView
from api.location.gps import distance

DB = settings.FIREBASE.database()

class EventView(APIView):
    """API view class for events
    """
    def get(self, request):
        """Event data for a given uuid
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
        return JsonResponse(data, safe=False)

    def post(self, request):
        """Post event to firebase DB.

        Potential required features:
            Custom validation
            Location validation
            Spam classification
        """

        event_data = request.POST.get('eventData', '')
        if event_data == '':
            return HttpResponseBadRequest("Bad request")
        decoded_json = json.loads(event_data)
        decoded_json['datetime'] = int(time.time()*1000)
        decoded_json['comments'] = ''
        decoded_json['images'] = {}
        decoded_json['upvotes'] = 0
        decoded_json['user_email'] = "digital0signature@gmail.com"
        decoded_json['user_id'] = "digital0signature@gmailcom"
        data = DB.child('incidents').push(decoded_json)
        key = data['name']
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
        lat = float(request.GET.get('lat', ''))
        lng = float(request.GET.get('long', ''))
        thresold = float(request.GET.get('dist', ''))
        # We need latitute, longiture and the thresold distance in-order to
        # locate the nearby incidents
        if lat == '' or lng == '' or thresold == '':
            return HttpResponseBadRequest("Bad request")
        # Fetch all the incidents in the database & query them in order to
        # group them  by location
        # Note: THIS METHOD IS VERY INEFFICIENT & COSTLY AT THE SAME TIME
        # WE NEED TO REPLACE IT WITH SOME GEOHASH BASED SOLUTION ASAP
        incidents = DB.child('incidents').get()
        data = []
        for incident in incidents.each():
            event = dict(incident.val())
            temp = {}
            temp['key'] = incident.key()
            # Store the coordinates
            temp['lat'] = event['location']['coords']['latitude']
            temp['long'] = event['location']['coords']['longitude']

            tmplat = float(event['location']['coords']['latitude'])
            tmplng = float(event['location']['coords']['longitude'])
            # Find the distance for the incidents
            dist = distance(tmplat, tmplng, lat, lng)
            # If the distance is lower than expected, append the incident
            if dist < thresold:
                data.append(temp)

        return JsonResponse(data, safe=False)
