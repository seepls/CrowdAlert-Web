""" Viw module for user app
"""
import json
from django.conf import settings
from django.http import JsonResponse, HttpResponseBadRequest
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from api.firebase_auth.authentication import TokenAuthentication

DB = settings.FIREBASE.database()

class UserView(APIView):
    """ User View Class
    """
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    def get(self):
        """ Not implemented yet
        """
        return JsonResponse({}, safe=False)

    def post(self, request):
        """ Updates the user data
        """
        try:
            user_data = json.loads(json.loads(request.body.decode()).get('userData'))      
        except Exception:
            return HttpResponseBadRequest("Bad request")

        if user_data == '':
            return HttpResponseBadRequest("Bad request")
        uid = str(request.user)
        if user_data.get('displayName', False):
            DB.child('users/'+uid+'/displayName').set(
                user_data.get('displayName', ' ')
            )
        print(DB.child('users/'+uid+'/displayName').get().val())
        return JsonResponse({"status": "ok"}, safe=False)
