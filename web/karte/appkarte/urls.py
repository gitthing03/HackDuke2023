from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("api/count", views.getCount, name="count"),
    path("create", views.makeBox, name="create"),
    path("api/restock", views.restock, name="restock")
]