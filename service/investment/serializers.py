from rest_framework import serializers
from .models import Info


class InfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Info
        # fields = '__all__'
        fields = ('id', 'amount', 'comments', 'created_at')
