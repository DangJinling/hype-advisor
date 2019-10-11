from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import UserInfo
from django.contrib.auth import authenticate

# User Serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ('id','username', 'email', 'is_superuser', 'first_name', 'last_name', 'amount') ## 返回给前台
        # fields = '__all__'
# Register Serializer


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInfo
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name', 'amount')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # user = User.objects.create_user(username=(validated_data['first_name'] + ' ' + validated_data['last_name']), email=validated_data['email'], password=validated_data['password'])
        user = UserInfo.objects.create_user(username=validated_data['email'], email=validated_data['email'], password=validated_data['password'], first_name=validated_data['first_name'], last_name=validated_data['last_name'], amount=validated_data['amount'], is_superuser=False)
        return user


# Login Serializer


class LoginSerializer(serializers.Serializer):
    # first_name = serializers.CharField()
    # last_name = serializers.CharField()
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("incorrect Credentials")
