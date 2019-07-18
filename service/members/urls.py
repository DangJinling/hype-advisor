from rest_framework import routers
from .api import MemberViewSet

router = routers.DefaultRouter()
router.register('api/members', MemberViewSet, 'members')

urlpatterns = router.urls