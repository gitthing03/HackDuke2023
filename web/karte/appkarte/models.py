from django.db import models

# Create your models here.

class Box(models.Model):
  stock = models.IntegerField(default=20)
  title = models.CharField(max_length=100)
  desc = models.CharField(max_length=200)
  location = models.CharField(max_length=200)
