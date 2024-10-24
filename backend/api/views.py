from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, RequestSerializer, ElectronicsSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Request, Electronics

class RequestListCreate(generics.ListCreateAPIView):
    serializer_class = RequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Request.objects.filter(requestor = user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(requestor=self.request.user)
        else:
            print(serializer.errors)


class RequestDelete(generics.DestroyAPIView):
    serializer_class = RequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Request.objects.filter(requestor = user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]





class CreateElectronicItem(generics.CreateAPIView):
    queryset = Electronics.objects.all()
    serializer_class = ElectronicsSerializer
    permission_classes = [AllowAny]

class DeleteElectronicItem(generics.DestroyAPIView):
    serializer_class = ElectronicsSerializer
    permission_classes = [AllowAny]