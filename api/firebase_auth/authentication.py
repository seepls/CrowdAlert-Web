""" Implements Authentication mechanism using firebase tokens
"""

from rest_framework import authentication
from firebase_admin import auth
from .users import FirebaseUser
from .exceptions import InvalidAuthToken, FirebaseError

class TokenAuthentication(authentication.BaseAuthentication):
    """Token Based Authentication using firebase tokens

    Arguments:
        authentication {[type]} -- [Rest Framework basic auth]

    Raises:
        InvalidAuthToken -- [If token is bad]
        FirebaseError    -- [If user isn't authenticated]

    Returns:
        [type] -- [description]
    """

    def authenticate(self, request):
        try:
            token = request.META.get('HTTP_TOKEN', False)
            if not token:
                return None
            user = FirebaseUser(auth.verify_id_token(token))
        except Exception:
            raise InvalidAuthToken()

        if not user:
            raise FirebaseError()
        return (user, None)
