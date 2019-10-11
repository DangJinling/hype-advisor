from django.http import HttpResponse
from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer
from django.core.mail import EmailMessage, send_mail
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth.models import User
from .models import UserInfo
from .tokens import account_activation_token

# Register API


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        # serializer = self.get_serializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # user = serializer.save()
        # return Response({
        #     "user": UserSerializer(user, context=self.get_serializer_context()).data,
        #     "token": AuthToken.objects.create(user)[1]
        # })

        register = RegisterSerializer()
        user = register.create(validated_data=request.data)
        user.is_active = False
        # user.amount =
        user.save()
        # token = AuthToken.objects.create(user)[1]
        token = account_activation_token.make_token(user)
        current_site = get_current_site(request)
        url = 'http://' + current_site.domain + "/activate?uidb64=" + urlsafe_base64_encode(force_bytes(user.id)) + '&token=' + token
        message = render_to_string('acc_active_email.html', {
            'user': user,
            'domain': current_site.domain,
            'uid': urlsafe_base64_encode(force_bytes(user.id)),
            'token': token,
            'url': url
        })
        # message = MIMEText('hello, send by Python...', 'plain', 'utf-8')
        mail_subject = 'Activate your blog account.'
        to_email = user.email
        # to_email = 'dangjinling_1012@126.com'
        email = EmailMessage(mail_subject, message, to=[to_email])
        email.send()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })


# Login API


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Get User API


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
        # permissions.AllowAny,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class GetUsersAPI(viewsets.ModelViewSet):
    queryset = UserInfo.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer

    # def get_object(self):
    #     queryset = UserInfo.objects.all()
    #     return queryset


# Active account
class ActiveAPI(generics.GenericAPIView):

    def get(self, request, *args, **kwargs):
        try:
            uid = force_text(urlsafe_base64_decode(request.query_params['uidb64']))
            user = UserInfo.objects.get(pk=uid)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is not None and account_activation_token.check_token(user, request.query_params['token']):
            user.is_active = True
            user.save()
            # login(request, user)
            # return redirect('home')
            return HttpResponse('Thank you for your email confirmation. Now you can login your account.')
        else:
            return HttpResponse('Activation link is invalid!')