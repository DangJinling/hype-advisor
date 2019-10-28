from rest_framework import routers

from investment import api
from .api import InfoViewSet, GetInvestmentAPI
from django.urls import path, include

# router = routers.DefaultRouter()
# router.register('api/investment/', InfoViewSet, 'investment')
#
# urlpatterns = router.urls


router = routers.DefaultRouter()
router.register('api/investment', InfoViewSet, 'investment')
urlpatterns = [
    path('api/investment/getInvestmentByUser', GetInvestmentAPI.as_view()),

]
urlpatterns += router.urls


