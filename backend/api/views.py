from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, RequestSerializer, ElectronicsSerializer, ITSuppliesSerializer, OfficeSerializer, JanitorialSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Request, Electronics, ITSupplies, Office, Janitorial

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





class ListCreateElectronicItem(generics.ListCreateAPIView):
    queryset = Electronics.objects.all()
    serializer_class = ElectronicsSerializer
    permission_classes = [AllowAny]

class DeleteElectronicItem(generics.DestroyAPIView):
    serializer_class = ElectronicsSerializer
    permission_classes = [AllowAny]

class ListCreateITSupplyItem(generics.ListCreateAPIView):
    queryset = ITSupplies.objects.all()
    serializer_class = ITSuppliesSerializer
    permission_classes = [AllowAny]

class DeleteITSupplyItem(generics.DestroyAPIView):
    serializer_class = ITSuppliesSerializer
    permission_classes = [AllowAny]

class ListCreateOfficeItem(generics.ListCreateAPIView):
    queryset = Office.objects.all()
    serializer_class = OfficeSerializer
    permission_classes = [AllowAny]

class DeleteOfficeItem(generics.DestroyAPIView):
    serializer_class = OfficeSerializer
    permission_classes = [AllowAny]

class ListCreateJanitorialItem(generics.ListCreateAPIView):
    queryset = Janitorial.objects.all()
    serializer_class = JanitorialSerializer
    permission_classes = [AllowAny]

class DeleteJanitorialItem(generics.DestroyAPIView):
    serializer_class = JanitorialSerializer
    permission_classes = [AllowAny]
