from django.urls import include, path
from rest_framework import routers
from . import views


urlpatterns = [
    path('v1/notes/', views.NoteListCreateView.as_view(), name='note-create'),
    path('v1/notes/<int:id>/',views.SingleNoteOPView.as_view(), name='note-retrive')
]
