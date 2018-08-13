"""The urls for images api
"""
from django.urls import path
from api.images import views

urlpatterns = [
    path('image', views.ImagesView.as_view(), name='Image Upload'),
]