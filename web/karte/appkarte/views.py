from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from appkarte.models import Box

# Return home page
def index(request):
    return render(request, "index.html")

# Used to make a box, this is very manual (and was only used once) as 
# we only made one actual box, not to be reused
def makeBox(request):
    box = Box.objects.get(id=1)
    box.latitude = 36.00015
    box.longitude = -78.94090
    box.save()

# Decrement the stock of a box, ID is in GET request
def decrementCount(request):
    id = request.GET["id"]
    box = Box.objects.get(id=id)
    box.stock -= 1
    box.save()
    return HttpResponse(status=200)

# Retrieve the current stock of a box by its ID
def getCount(request, id):
    box = Box.objects.get(id=id)
    d = dict()
    d["stock"] = box.stock
    d["title"] = box.title
    return JsonResponse(d)

# Return JSON of every box's ID, and their current stock
def getAll(request):
    d = dict()
    for box in Box.objects.all():
        d[box.id] = dict()
        d[box.id]["stock"] = box.stock
    return JsonResponse(d)

# Restock a box, hardcoded to be our only actual box
# Not really used
def restock(request):
    id = 1 #request.GET["id"]
    box = Box.objects.get(id=id)
    box.stock = 20
    box.save()
    print(box.stock)
    return HttpResponse("restocked")

# Return JSON of every box and respective data
def getMarkers(request):
    boxList = Box.objects.all()
    boxData = dict()
    for box in boxList:
        boxData[box.id] = dict()
        boxData[box.id]["id"] = box.id
        boxData[box.id]["lat"] = box.latitude
        boxData[box.id]["long"] = box.longitude
        boxData[box.id]["title"] = box.title
        boxData[box.id]["desc"] = box.desc
        boxData[box.id]["stock"] = box.stock
    print(boxData)
    return JsonResponse(boxData)