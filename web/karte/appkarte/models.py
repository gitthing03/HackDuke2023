from django.db import models

# Create your models here.

class Box(models.Model):
  stock = models.IntegerField(default=20)
  title = models.CharField(max_length=100)
  desc = models.CharField(max_length=200)
  latitude = models.FloatField(null=True)
  longitude = models.FloatField(null=True)
