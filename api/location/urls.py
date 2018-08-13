""" Django URL config for location app
"""

from django.urls import path
from api.location import views

urlpatterns = [
    path('places_autocomplete',views.PlacesView.as_view(),
         name='places autocomplete'),
    path('reverse_geocode', views.ReverseGeocodeView.as_view(),
         name='reverse geocode'),
    path('get_location', views.IPLocationView.as_view(),
         name='get location using ip'),
]
