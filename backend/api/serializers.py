from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Request

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ["id", "category", "item_name", "quantity", "unit", "RF_number", "date_created", "status", "requestor"]
        extra_kwargs = {"requestor": {"read_only": True}}