""" The urls for images api
"""
from django.urls import path
from api.images.views import ImagesView

urlpatterns = [
    path('image', ImagesView.as_view(), name='Image Upload'),
]