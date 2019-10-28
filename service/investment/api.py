from rest_framework.decorators import action
from rest_framework.generics import GenericAPIView

from .models import Info
from rest_framework import viewsets, permissions, generics
from .serializers import InfoSerializer
from .models import Info
from rest_framework.response import Response


class InfoViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = InfoSerializer

    def get_queryset(self):
        return self.request.user.investment.all()

    def perform_create(self, serializer):
        return serializer.save(owner=self.request.user)

    # @action(detail=True, methods=['post'])
    # def post_queryset(self, request, user):
    #     result = self.request.investment.all(owner=user)
    #     return Response({'investment': result})


def saveInvestmentInfo(user, amount):
    info = Info(amount=amount)
    info.owner = user
    info.save()


class GetInvestmentAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = InfoSerializer

    def post(self, request, *args, **kwargs):
        serializer = InfoSerializer(Info.objects.filter(owner=request.data['user']['id']), many=True)
        return Response({
            "investment": serializer.data,
        })





