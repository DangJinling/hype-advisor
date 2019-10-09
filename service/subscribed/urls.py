from rest_framework import routers
from .api import MemberViewSet

router = routers.DefaultRouter()
router.register('api/subscribed', MemberViewSet, 'subscribed')

urlpatterns = router.urls