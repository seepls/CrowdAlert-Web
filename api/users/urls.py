""" Django based urlconfig
"""
from django.urls import path
from api.users import views

urlpatterns = [
    path('user', views.UserView.as_view(), name='User Data'),
]
