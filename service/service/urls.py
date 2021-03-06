from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html'), name='index'),
    path('', include('accounts.urls')),
    path('', include('subscribed.urls')),
    path('', include('investment.urls')),
    path('', include('email_config.urls'))
]