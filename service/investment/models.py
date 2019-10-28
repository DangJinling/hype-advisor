from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Info(models.Model):
    amount = models.DecimalField(max_digits=14, decimal_places=2)
    comments = models.TextField(null=True, max_length=500)
    owner = models.ForeignKey(User, related_name='investment', on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
