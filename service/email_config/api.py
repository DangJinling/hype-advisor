from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response

from .serializers import EmailConfigSerializer
from .models import EmailConfig


class EmailConfigViewSet(viewsets.ModelViewSet):
    queryset = EmailConfig.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = EmailConfigSerializer

