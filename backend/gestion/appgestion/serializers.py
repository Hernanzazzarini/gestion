# mi_app/serializers.py

from rest_framework import serializers
from .models import Personal, Capacitacion, CapacitacionPersonal, RecordatorioDeTarea, Tarea

class PersonalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personal
        fields = '__all__'

class CapacitacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Capacitacion
        fields = '__all__'

class CapacitacionPersonalSerializer(serializers.ModelSerializer):
    class Meta:
        model = CapacitacionPersonal
        fields = '__all__'

class RecordatorioDeTareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecordatorioDeTarea
        fields = '__all__'

class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = '__all__'
