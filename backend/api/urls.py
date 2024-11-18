from django.urls import path
from . import views

urlpatterns = [
    path("requests/", views.RequestListCreate.as_view(), name = "request-list"),
    path("requests/delete/<int:pk>/", views.RequestDelete.as_view(), name = "delete-request"),
    path("requests/update", views.RequestUpdate.as_view(), name = "update-request"),


    path("item/electronics/", views.ListCreateElectronicItem.as_view(), name = "item-electronic"),
    path("item/itsupplies/", views.ListCreateITSupplyItem.as_view(), name = "item-itsupply"),
    path("item/office/", views.ListCreateOfficeItem.as_view(), name = "item-office"),
    path("item/janitorial/", views.ListCreateJanitorialItem.as_view(), name = "item-janitorial"),

    path("item/electronics/delete/<int:id>/", views.DeleteElectronicItem.as_view(), name = "item-delete-electronic"),
    path("item/itsupplies/delete/<int:id>/", views.DeleteITSupplyItem.as_view(), name = "item-delete-itsupply"),
    path("item/office/delete/<int:id>/", views.DeleteOfficeItem.as_view(), name = "item-delete-office"),
    path("item/janitorial/delete/<int:id>/", views.DeleteJanitorialItem.as_view(), name = "item-delete-janitorial"),

    path("item/electronics/update/<int:id>/", views.UpdateElectronics.as_view(), name = "item-update-janitorial"),
    path("item/itsupplies/update/<int:id>/", views.UpdateITSupply.as_view(), name = "item--update-janitorial"),
    path("item/office/update/<int:id>/", views.UpdateOffice.as_view(), name = "item-update-janitorial"),
    path("item/janitorial/update/<int:id>/", views.UpdateJanitorial.as_view(), name = "item-update-janitorial"),

    path("logs/request/", views.ListCreateRequestLog.as_view(), name = "request-log"),
    path("logs/item/", views.ListCreateItemLog.as_view(), name = "item-log"),

    path("item/dashboard/lowquantity/", views.ListCombinedLowItems.as_view(), name = "low-items"),
    path("item/dashboard/zeroquantity/", views.ListZeroItems.as_view(), name = "zero-items"),

     path('profile/', views.ProfileDetailView.as_view(), name='profile-detail'),

]
