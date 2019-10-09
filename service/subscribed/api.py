from rest_framework import viewsets, permissions
from .serializers import MemberSerializer
from .models import User

class MemberViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = MemberSerializer
