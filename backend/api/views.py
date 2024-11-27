from django.shortcuts import render
from django.db.models import Sum
from django.contrib.auth.models import User
from rest_framework import generics, serializers
from .serializers import UserSerializer, RequestSerializer, ElectronicsSerializer, ITSuppliesSerializer, OfficeSerializer, JanitorialSerializer, RequestLogSerializer, ItemLogSerializer, ProfileSerializer, UserProfileSerializer
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


class CreateUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User created successfully!"}, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
    permission_classes = [AllowAny]

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
    permission_classes = [AllowAny]

    def post(self, request, pk):
        # Fetch the request object
        request_obj = get_object_or_404(Request, pk=pk)

        # Update the status to "Denied"
        request_obj.status = "Denied"
        request_obj.save()

        # Create a request log
        RequestLogs.objects.create(
            item_name=request_obj.item_name,
            requestor=request_obj.requestor.username,  # Assuming `requestor` is a User object
            request_number=request_obj.RF_number,
            action="Request Denied",
            admin=request.user.username if request.user.is_authenticated else None,
        )

        return Response({"message": "Request denied successfully!"})

class UserProfileListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profiles = Profile.objects.select_related('user')
        serializer = UserProfileSerializer(profiles, many=True)
        return Response(serializer.data)
    
class UserProfileUpdateView(generics.UpdateAPIView):
    queryset = Profile.objects.select_related('user')
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'user__username'  # Allows us to filter by username

class InventoryComparisonView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        # Electronics Quantity Aggregation
        electronics_quantity = Electronics.objects.values('item_name').annotate(current_quantity=Sum('quantity'))
        electronics_approved_requests = Request.objects.filter(status="Approved", category="Electronics").values('item_name').annotate(approved_request_count=Sum('quantity'))
        electronics_total_requests = Request.objects.filter(category="Electronics").values('item_name').annotate(request_count=Sum('quantity'))
        electronics_pending_requests = Request.objects.filter(status="Pending", category="Electronics").values('item_name').annotate(pending_request_count=Sum('quantity'))

        # IT Supplies Quantity Aggregation
        it_supplies_quantity = ITSupplies.objects.values('item_name').annotate(current_quantity=Sum('quantity'))
        it_supplies_approved_requests = Request.objects.filter(status="Approved", category="IT Supplies").values('item_name').annotate(approved_request_count=Sum('quantity'))
        it_supplies_total_requests = Request.objects.filter(category="IT Supplies").values('item_name').annotate(request_count=Sum('quantity'))
        it_supplies_pending_requests = Request.objects.filter(status="Pending", category="IT Supplies").values('item_name').annotate(pending_request_count=Sum('quantity'))

        # Office Supplies Quantity Aggregation
        office_supplies_quantity = Office.objects.values('item_name').annotate(current_quantity=Sum('quantity'))
        office_supplies_approved_requests = Request.objects.filter(status="Approved", category="Office Supplies").values('item_name').annotate(approved_request_count=Sum('quantity'))
        office_supplies_total_requests = Request.objects.filter(category="Office Supplies").values('item_name').annotate(request_count=Sum('quantity'))
        office_supplies_pending_requests = Request.objects.filter(status="Pending", category="Office Supplies").values('item_name').annotate(pending_request_count=Sum('quantity'))

        # Janitorial Supplies Quantity Aggregation
        janitorial_supplies_quantity = Janitorial.objects.values('item_name').annotate(current_quantity=Sum('quantity'))
        janitorial_supplies_approved_requests = Request.objects.filter(status="Approved", category="Janitorial Supplies").values('item_name').annotate(approved_request_count=Sum('quantity'))
        janitorial_supplies_total_requests = Request.objects.filter(category="Janitorial Supplies").values('item_name').annotate(request_count=Sum('quantity'))
        janitorial_supplies_pending_requests = Request.objects.filter(status="Pending", category="Janitorial Supplies").values('item_name').annotate(pending_request_count=Sum('quantity'))

        # Function to combine and compare the data for each item
        def get_item_comparison(item_quantity, approved_requests, total_requests, pending_requests):
            comparison = []
            for item in item_quantity:
                # Get the approved, total, and pending request counts for each item
                approved_for_item = next((request for request in approved_requests if request['item_name'] == item['item_name']), None)
                total_for_item = next((request for request in total_requests if request['item_name'] == item['item_name']), None)
                pending_for_item = next((request for request in pending_requests if request['item_name'] == item['item_name']), None)

                # The total quantity is current quantity + approved requests
                item['total_quantity'] = item['current_quantity'] + (approved_for_item['approved_request_count'] if approved_for_item else 0)
                
                # Remaining quantity is just the current quantity
                item['remaining_quantity'] = item['current_quantity']
                
                # Number of pending requests
                item['pending_requests'] = pending_for_item['pending_request_count'] if pending_for_item else 0
                
                # Total number of requests for the item (including all statuses)
                item['request_count'] = total_for_item['request_count'] if total_for_item else 0

                comparison.append(item)
            return comparison

        # Get the combined data for each category
        electronics_comparison = get_item_comparison(electronics_quantity, electronics_approved_requests, electronics_total_requests, electronics_pending_requests)
        it_supplies_comparison = get_item_comparison(it_supplies_quantity, it_supplies_approved_requests, it_supplies_total_requests, it_supplies_pending_requests)
        office_supplies_comparison = get_item_comparison(office_supplies_quantity, office_supplies_approved_requests, office_supplies_total_requests, office_supplies_pending_requests)
        janitorial_supplies_comparison = get_item_comparison(janitorial_supplies_quantity, janitorial_supplies_approved_requests, janitorial_supplies_total_requests, janitorial_supplies_pending_requests)

        # Prepare the response data
        response_data = {
            "electronics": electronics_comparison,
            "it_supplies": it_supplies_comparison,
            "office_supplies": office_supplies_comparison,
            "janitorial_supplies": janitorial_supplies_comparison
        }

        # Return the data as a response
        return Response(response_data, status=status.HTTP_200_OK)

