from django.db import models
from django.contrib.auth.models import User

class Request(models.Model):
    category = models.CharField(max_length=20)
    item_name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    unit = models.CharField(max_length=20)
    purpose = models.TextField(null = True)
    RF_number = models.CharField(max_length=20)
    date_created = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50)
    requestor = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "requests")

    def __str__(self):
        return self.request_number

class Electronics(models.Model):
    item_name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    unit = models.CharField(max_length=20)
    date_added = models.DateField()
    RF_number = models.CharField(max_length=50)

class ITSupplies(models.Model):
    item_name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    unit = models.CharField(max_length=20)
    date_added = models.DateField()
    RF_number = models.CharField(max_length=50)

class Office(models.Model):
    item_name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    unit = models.CharField(max_length=20)
    date_added = models.DateField()
    RF_number = models.CharField(max_length=50)

class Janitorial(models.Model):
    item_name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    unit = models.CharField(max_length=20)
    date_added = models.DateField()
    RF_number = models.CharField(max_length=50)

class RequestLogs(models.Model):
    item_name = models.CharField(max_length=100)
    requestor = models.CharField(max_length=50)
    request_number = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)
    action = models.CharField(max_length=50)
    admin = models.CharField(max_length=50)

class ItemLogs(models.Model):
    item_name = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    action = models.CharField(max_length=50)
    current_quantity = models.IntegerField()
# Create your models here.
