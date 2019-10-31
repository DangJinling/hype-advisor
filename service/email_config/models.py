from django.db import models

# Create your models here.


class EmailConfig(models.Model):
    email_host = models.CharField(max_length=100)
    email_user = models.EmailField(max_length=100, unique=True)
    email_pwd = models.CharField(max_length=128)
    email_port = models.IntegerField(default=587)

    class Meta:
        db_table = 'email_config'