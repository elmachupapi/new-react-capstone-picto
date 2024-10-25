from django.urls import path
from . import views

urlpatterns = [
    path("requests/", views.RequestListCreate.as_view(), name = "request-list"),
    path("requests/delete/<int:pk>/", views.RequestDelete.as_view(), name = "delete-request"),
    path("item/electronics", views.ListCreateElectronicItem.as_view(), name = "item-electronic"),
    path("item/electronics/delete/<int:pk>/", views.DeleteElectronicItem.as_view(), name = "item-delete-electronic"),
    path("item/itsupplies", views.ListCreateITSupplyItem.as_view(), name = "item-itsupply"),
    path("item/itsupplies/delete/<int:pk>/", views.DeleteITSupplyItem.as_view(), name = "item-delete-itsupply"),
    path("item/office", views.ListCreateOfficeItem.as_view(), name = "item-office"),
    path("item/office/delete/<int:pk>/", views.DeleteOfficeItem.as_view(), name = "item-delete-office"),
    path("item/janitorial", views.ListCreateJanitorialItem.as_view(), name = "item-janitorial"),
    path("item/janitorial/delete/<int:pk>/", views.DeleteJanitorialItem.as_view(), name = "item-delete-janitorial"),
]
