from django.db import models
from django.contrib.auth.models import User

class Request(models.Model):
    category = models.CharField(max_length=20)
    item_name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    unit = models.CharField(max_length=20)
    RF_number = models.CharField(max_length=20)
    date_created = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50)
    requestor = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "requests")

    def __str__(self):
        return self.request_number



# Create your models here.
