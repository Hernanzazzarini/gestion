from rest_framework import serializers
from .models import Area, Responsable, Tarea

class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = '__all__'

class ResponsableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Responsable
        fields = '__all__'

class TareaSerializer(serializers.ModelSerializer):
    responsable_nombre = serializers.CharField(source='responsable.nombre', read_only=True)
    area_nombre = serializers.CharField(source='area.nombre', read_only=True)

    class Meta:
        model = Tarea
        fields = '__all__'
