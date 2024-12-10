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
    serial_number = models.CharField(max_length=50, default= '', null=True, blank=True)
    requestor = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "requests")

    def __str__(self):
        return self.request_number

class Electronics(models.Model):
    item_name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    unit = models.CharField(max_length=20)
    date_added = models.DateField()
    PO_number = models.CharField(max_length=50)
    year_quarter = models.CharField(max_length=10)
    serial_number = models.CharField(max_length=50, null=True, blank=True)
    obsolete = models.CharField(max_length=50, null=True, blank=True)

class ITSupplies(models.Model):
    item_name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    unit = models.CharField(max_length=20)
    date_added = models.DateField()
    PO_number = models.CharField(max_length=50)
    year_quarter = models.CharField(max_length=10)
    serial_number = models.CharField(max_length=50, null=True, blank=True)
    obsolete = models.CharField(max_length=50, null=True, blank=True)

class Office(models.Model):
    item_name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    unit = models.CharField(max_length=20)
    date_added = models.DateField()
    PO_number = models.CharField(max_length=50)
    year_quarter = models.CharField(max_length=10)
    serial_number = models.CharField(max_length=50, null=True, blank=True)
    obsolete = models.CharField(max_length=50, null=True, blank=True)
    
class Janitorial(models.Model):
    item_name = models.CharField(max_length=100)
    quantity = models.IntegerField(null=True, blank=True)
    unit = models.CharField(max_length=20, null=True, blank=True)
    date_added = models.DateField(null=True, blank=True)
    PO_number = models.CharField(max_length=50, null=True, blank=True)
    year_quarter = models.CharField(max_length=20, null=True, blank=True)
    serial_number = models.CharField(max_length=50, null=True, blank=True)
    obsolete = models.CharField(max_length=50, null=True, blank=True)

class RequestLogs(models.Model):
    item_name = models.CharField(max_length=100)
    requestor = models.CharField(max_length=50)
    request_number = models.CharField(max_length=50)
    date = models.DateTimeField(auto_now_add=True)
    action = models.CharField(max_length=50)
    admin = models.CharField(max_length=50, null=True, blank=True)

class ItemLogs(models.Model):
    item_name = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    action = models.CharField(max_length=50)
    current_quantity = models.IntegerField()

class Profile(models.Model):
    ROLE_CHOICES = [
        ('superadmin', 'Superadmin'),
        ('admin', 'Admin'),
        ('viewer', 'Viewer'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='viewer')

# Create your models here.
