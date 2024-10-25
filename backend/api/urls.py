from django.urls import path
from . import views

urlpatterns = [
    path("requests/", views.RequestListCreate.as_view(), name = "request-list"),
    path("requests/delete/<int:pk>/", views.RequestDelete.as_view(), name = "delete-request"),
    path("item/electronics", views.CreateElectronicItem.as_view(), name = "item-add-electronic"),
    path("item/electronics/delete/<int:pk>/", views.DeleteElectronicItem.as_view(), name = "item-delete-electronic"),
    path("item/ITSupplies", views.CreateITSupplyItem.as_view(), name = "item-add-itsupply"),
    path("item/ITSupplies/delete/<int:pk>/", views.DeleteITSupplyItem.as_view(), name = "item-delete-itsupply"),
]
