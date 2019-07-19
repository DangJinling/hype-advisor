from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# User Serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'email')

# Register Serializer


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # user = User.objects.create_user(username=(validated_data['first_name'] + ' ' + validated_data['last_name']), email=validated_data['email'], password=validated_data['password'])
        user = User.objects.create_user(username=validated_data['email'], email=validated_data['email'], password=validated_data['password'])
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
