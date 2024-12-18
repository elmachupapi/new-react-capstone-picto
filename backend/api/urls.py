from django.urls import path
from . import views

urlpatterns = [
    path("requests/", views.RequestListCreate.as_view(), name = "request-list"),
    path("requests/delete/<int:pk>/", views.RequestDelete.as_view(), name = "delete-request"),
    path("requests/update/<int:id>/", views.RequestUpdate.as_view(), name = "update-request"),

    path("requests/list/pending/", views.PendingRequestListView.as_view(), name = "pending-request"),
    path("approvals/approved/<int:pk>/", views.ApproveRequestView.as_view(), name = "approve"),
    path("approvals/deny/<int:pk>/", views.DenyRequestView.as_view(), name = "deny-request"),

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
    path('profile/view/', views.ProfileListView.as_view(), name='profile-list'),

    path('accounts/', views.UserProfileListView.as_view(), name='accounts-list'),
    path('accounts/<str:user__username>/', views.UserProfileUpdateView.as_view(), name='user-profile-update'),

    path('reports/total-vs-approved-vs-pending/', views.InventoryComparisonView.as_view(), name='report-total-vs-approved-vs-pending'),
<<<<<<< HEAD
    path('electronics-by-year-quarter/', views.ElectronicsDataView.as_view(), name='electronics-data'),
    path('itsupplies-by-year-quarter/', views.ITSuppliesDataView.as_view(), name='itsupplies-data'),
    path('office-by-year-quarter/', views.OfficeDataView.as_view(), name='office-data'),
    path('janitorial-by-year-quarter/', views.JanitorialDataView.as_view(), name='janitorial-data'),
    path('reports/requests/', views.RequestsStatsView.as_view(), name='report-requests'),
=======
>>>>>>> parent of 31b9e62 (reports for item)

]
