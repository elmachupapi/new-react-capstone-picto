from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Request, Electronics, ITSupplies, Office, Janitorial, RequestLogs, ItemLogs, Profile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['user', 'role']
        extra_kwargs = {"user": {"read_only": True}}

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ["id", "category", "item_name", "quantity", "unit", "RF_number", "date_created", "status", "requestor"]
        extra_kwargs = {"requestor": {"read_only": True}}


class ElectronicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Electronics
        fields = ["id", "item_name", "quantity", "unit", "date_added", "RF_number"]

    def create(self, validated_data):
        if isinstance(validated_data, list):
            return Electronics.objects.bulk_create(
                [Electronics(**item) for item in validated_data]
            )
        return super().create(validated_data)

class ITSuppliesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ITSupplies
        fields = ["id", "item_name", "quantity", "unit", "date_added", "RF_number"]

    def create(self, validated_data):
        if isinstance(validated_data, list):
            return ITSupplies.objects.bulk_create(
                [ITSupplies(**item) for item in validated_data]
            )
        return super().create(validated_data)
        
class OfficeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Office
        fields = ["id", "item_name", "quantity", "unit", "date_added", "RF_number"]

    def create(self, validated_data):
        if isinstance(validated_data, list):
            return Office.objects.bulk_create(
                [Office(**item) for item in validated_data]
            )
        return super().create(validated_data)

class JanitorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Janitorial
        fields = ["id", "item_name", "quantity", "unit", "date_added", "RF_number"]
    
    def create(self, validated_data):
        # Check if the input is a list (batch creation)
        if isinstance(validated_data, list):
            # Use bulk_create for efficient batch saving
            return Janitorial.objects.bulk_create(
                [Janitorial(**item) for item in validated_data]
            )
        # Handle single object creation
        return super().create(validated_data)
    
class RequestLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = RequestLogs
        fields = ["id", "item_name", "requestor", "request_number", "date", "action", "admin"]

class ItemLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemLogs
        fields = ["id", "item_name", "date", "action", "current_quantity"]


