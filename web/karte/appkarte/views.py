from django.http import HttpResponse
from django.shortcuts import render
from serial import SerialException
from appkarte.models import Box


def index(request):
    return HttpResponse("test.")

def makeBox(request):
    title = "Penn Box"
    desc = "This is a test!"
    stock = 20
    location = "TBD"
    box = Box.objects.create(title=title, desc=desc, stock=stock, location=location)
    box.save()
    print(box.id)

def getCount(request):
    id = request.GET["id"]
    box = Box.objects.get(id=id)
    box.stock -= 1
    box.save()
    print(box.stock)
    return HttpResponse(f"removed stock from {id}")

def restock(request):
    id = 1 #request.GET["id"]
    box = Box.objects.get(id=id)
    box.stock = 20
    box.save()
    print(box.stock)
    return HttpResponse("restocked")