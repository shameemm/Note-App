from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from .models import Note
from rest_framework.response import Response
from .serializers import NoteSerializer

# Create your views here.
class NoteListCreateView(APIView):
    def post(self,request):
        serializer = NoteSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status = status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    def get(self,request):
        notes = Note.objects.all()
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)

class SingleNoteOPView(APIView):
    
    def get_object(self,id):
        try:
            return Note.objects.get(id=id)
        except Note.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
    def get(self,request,id):
        print(id)
        note = self.get_object(id)
        serializer = NoteSerializer(note)
        return Response(serializer.data)
    
    def put(self,request,id):
        note = self.get_object(id)
        serializer = NoteSerializer(note, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, id):
        note = self.get_object(id)
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        