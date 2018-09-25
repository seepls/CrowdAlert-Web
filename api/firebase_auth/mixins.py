""" Mixins for firebase db
"""

from rest_framework.permissions import IsAuthenticated
from .authentication import TokenAuthentication

class FirebaseAuthMixin():
    """ Firebase Token Authentication Mixin
    """
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
