from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, serializers
from .serializers import UserSerializer, RequestSerializer, ElectronicsSerializer, ITSuppliesSerializer, OfficeSerializer, JanitorialSerializer, RequestLogSerializer, ItemLogSerializer, ProfileSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Request, Electronics, ITSupplies, Office, Janitorial, RequestLogs, ItemLogs, Profile
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView

class RequestListCreate(generics.ListCreateAPIView):
    serializer_class = RequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Request.objects.filter(requestor=user)

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

class ProfileDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Ensure the profile being accessed belongs to the authenticated user
        return self.request.user.profile

class ProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]


class ListCreateElectronicItem(generics.ListCreateAPIView):
    queryset = Electronics.objects.all()
    serializer_class = ElectronicsSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data

        # Check if the input is a list for batch creation
        if isinstance(data, list):
            serializer = self.get_serializer(data=data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Fallback to single object creation
            return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save()

class DeleteElectronicItem(generics.DestroyAPIView):
    queryset = Electronics.objects.all()
    serializer_class = ElectronicsSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class ListCreateITSupplyItem(generics.ListCreateAPIView):
    queryset = ITSupplies.objects.all()
    serializer_class = ITSuppliesSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data

        # Check if the input is a list for batch creation
        if isinstance(data, list):
            serializer = self.get_serializer(data=data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Fallback to single object creation
            return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save()

class DeleteITSupplyItem(generics.DestroyAPIView):
    queryset = ITSupplies.objects.all()
    serializer_class = ITSuppliesSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class ListCreateOfficeItem(generics.ListCreateAPIView):
    queryset = Office.objects.all()
    serializer_class = OfficeSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data

        # Check if the input is a list for batch creation
        if isinstance(data, list):
            serializer = self.get_serializer(data=data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Fallback to single object creation
            return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save()

class DeleteOfficeItem(generics.DestroyAPIView):
    queryset = Office.objects.all()
    serializer_class = OfficeSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class ListCreateJanitorialItem(generics.ListCreateAPIView):
    queryset = Janitorial.objects.all()
    serializer_class = JanitorialSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        data = request.data

        # Check if the input is a list for batch creation
        if isinstance(data, list):
            serializer = self.get_serializer(data=data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Fallback to single object creation
            return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save()

class DeleteJanitorialItem(generics.DestroyAPIView):
    queryset = Janitorial.objects.all()
    serializer_class = JanitorialSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class ListCreateRequestLog(generics.ListCreateAPIView):
    queryset = RequestLogs.objects.all()
    serializer_class = RequestLogSerializer
    permission_classes = [AllowAny]

class ListCreateItemLog(generics.ListCreateAPIView):
    queryset = ItemLogs.objects.all()
    serializer_class = ItemLogSerializer
    permission_classes = [AllowAny]


class ListCombinedLowItems(generics.ListAPIView):
    serializer_class = ITSuppliesSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        it_supplies_qs = ITSupplies.objects.filter(quantity__lt=5, quantity__gt=0)
        electronics_qs = Electronics.objects.filter(quantity__lt=5, quantity__gt=0)
        office_qs = Office.objects.filter(quantity__lt=5, quantity__gt=0)
        janitorial_qs = Janitorial.objects.filter(quantity__lt=5, quantity__gt=0)
        
        return it_supplies_qs.union(electronics_qs, office_qs, janitorial_qs)

class ListZeroItems(generics.ListAPIView):
    serializer_class = ITSuppliesSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        it_supplies_qs = ITSupplies.objects.filter(quantity=0)
        electronics_qs = Electronics.objects.filter(quantity=0)
        office_qs = Office.objects.filter(quantity=0)
        janitorial_qs = Janitorial.objects.filter(quantity=0)
        
        return it_supplies_qs.union(electronics_qs, office_qs, janitorial_qs)
    

class RequestUpdate(generics.RetrieveUpdateAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def get_queryset(self):
        user = self.request.user
        return Request.objects.filter(requestor=user)

class UpdateElectronics(generics.RetrieveUpdateAPIView):
    queryset = Electronics.objects.all()
    serializer_class = ElectronicsSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class UpdateITSupply(generics.RetrieveUpdateAPIView):
    queryset = ITSupplies.objects.all()
    serializer_class = ITSuppliesSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class UpdateOffice(generics.RetrieveUpdateAPIView):
    queryset = Office.objects.all()
    serializer_class = OfficeSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'

class UpdateJanitorial(generics.RetrieveUpdateAPIView):
    queryset = Janitorial.objects.all()
    serializer_class = JanitorialSerializer
    permission_classes = [AllowAny]
    lookup_field = 'id'


class PendingRequestListView(generics.ListAPIView):
    serializer_class = RequestSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        # Filter by 'pending' status and order by 'date_created' (FIFO)
        return Request.objects.filter(status="Pending").order_by('date_created')

class ApproveRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        # Fetch the request object
        request_obj = get_object_or_404(Request, pk=pk)

        # Map categories to models
        category_model_map = {
            "electronics": Electronics,
            "it supplies": ITSupplies,
            "office supplies": Office,
            "janitorial supplies": Janitorial,
        }

        model = category_model_map.get(request_obj.category)
        if not model:
            return Response({"error": "Invalid category"}, status=400)

        # Fetch all matching items for the item_name (case-insensitive)
        matching_items = model.objects.filter(item_name__iexact=request_obj.item_name).order_by("date_added")
        if not matching_items.exists():
            return Response({"error": "No matching item found"}, status=404)

        remaining_quantity = request_obj.quantity
        used_serial_numbers = []

        # Iterate through matching items to fulfill the request
        for item in matching_items:
            if remaining_quantity <= 0:
                break

            if item.quantity > 0:
                updated_quantity = 0
                if item.quantity >= remaining_quantity:
                    updated_quantity = remaining_quantity
                    item.quantity -= remaining_quantity
                    remaining_quantity = 0
                else:
                    updated_quantity = item.quantity
                    remaining_quantity -= item.quantity
                    item.quantity = 0

                # Log the update action
                ItemLogs.objects.create(
                    item_name=item.item_name,
                    action="Item Updated",
                    current_quantity=item.quantity,
                )

                # Only append serial number if it exists
                if item.serial_number:
                    used_serial_numbers.append(item.serial_number)
                
                item.save()

        if remaining_quantity > 0:
            return Response(
                {"error": "Insufficient inventory across all items to fulfill the request"},
                status=400,
            )

        # Update the request object
        request_obj.serial_number = ", ".join(used_serial_numbers) if used_serial_numbers else None  # Use None if no serial numbers
        request_obj.status = "Approved"
        request_obj.save()

        return Response({"message": "Request approved and inventory updated successfully"})
    
class DenyRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        # Fetch the request object
        request_obj = get_object_or_404(Request, pk=pk)

        # Update the status to "Denied"
        request_obj.status = "Denied"
        request_obj.save()

        return Response({"message": "Request denied successfully!"})