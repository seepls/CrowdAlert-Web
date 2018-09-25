from django.urls import path, include
from api.comments import views

urlpatterns = [
    path('comment', views.CommentView.as_view(), name='Comment')
]