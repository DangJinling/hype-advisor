from django.urls import path
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns

from .api import EmailConfigViewSet

#1
# router = routers.DefaultRouter()
# router.register('api/emailConfig', EmailConfigViewSet, 'emailConfig')
#
# urlpatterns = router.urls

#2
email_list = EmailConfigViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
email_detail = EmailConfigViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = format_suffix_patterns([
    path('api/emailConfig/', email_list, name='email_list'),
    path('api/emailConfig/<int:pk>/', email_detail, name='email_detail'),
])


