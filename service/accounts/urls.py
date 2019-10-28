from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI, ActiveAPI, GetUsersAPI
from knox import views as knox_views
from django.conf.urls import url
from . import views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/getUsers', GetUsersAPI.as_view({'get': 'list'})),
    path('activate', ActiveAPI.as_view()),
    # url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
    #     views.activate, name='activate'),
    # url(r'^activate/$',
    #     views.activate, name='activate'),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]
