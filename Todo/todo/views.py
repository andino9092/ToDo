from re import search
from django.shortcuts import render
from django.views.decorators import csrf
from rest_framework import serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TodoSerializer
from .models import Todo

class TodoView(APIView):
    seralizer = TodoSerializer
    def get(self, request, id=-1, format = None):
        if id != -1:
            query = Todo.objects.get(id=id)
            serializer = TodoSerializer(query)
            if serializer == None:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response({"data": serializer.data}, status = status.HTTP_200_OK)
        else:
            query = Todo.objects.all()
            serializer = TodoSerializer(query, many=True)
            return Response({"data": serializer.data}, status = status.HTTP_200_OK)

    def put(self, request, format = None):

        data = request.data
        task = Todo.objects.get(id=data["id"])
        task.completed = data["completed"]
        task.title = data["title"]
        task.description = data["description"]
        task.dueDate = data["dueDate"]
        
        task.save()

        serializer = TodoSerializer(task)
        return Response(serializer.data)

    def post(self, request, format = None):
        data = request.data
        serializer = TodoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id, format = None):
        task = Todo.objects.get(id=id)
        task.delete()
        return Response(status=status.HTTP_200_OK)
