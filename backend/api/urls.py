from django.urls import path
from . import views

urlpatterns = [
    path("requests/", views.RequestListCreate.as_view(), name = "request-list"),
    path("requests/delete/<int:pk>/", views.RequestDelete.as_view(), name="delete-request"),
]
