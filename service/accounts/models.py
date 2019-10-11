from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class UserInfo(AbstractUser):
    amount = models.DecimalField(null=True, max_digits=10, decimal_places=2, blank=True)

    class Meta:
        pass