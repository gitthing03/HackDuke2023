from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("api/decrement", views.decrementCount, name="decrement"),
    path("create", views.makeBox, name="create"),
    path("api/restock", views.restock, name="restock"),
    path("api/getmarkers", views.getMarkers, name="markers"),
    path("api/getcount/<int:id>", views.getCount, name="getcount"),
    path("api/getall", views.getAll, name="getall")
]