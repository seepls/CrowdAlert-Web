"""Events Model serializer for rest framework
"""
from rest_framework import serializers

class EventSerialzer(serializers.Serializer):
    """Builds the helper for rest api endpoints for the Event Model.
    Raises:
        NotImplementedError -- Requires Event model to be implemented
    """
    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()
