from django.shortcuts import render
from rest_framework import viewsets
from .models import Personal, Capacitacion, CapacitacionPersonal, RecordatorioDeTarea, Tarea
from .serializers import PersonalSerializer, CapacitacionSerializer, CapacitacionPersonalSerializer, RecordatorioDeTareaSerializer, TareaSerializer

class PersonalViewSet(viewsets.ModelViewSet):
    queryset = Personal.objects.all()
    serializer_class = PersonalSerializer

class CapacitacionViewSet(viewsets.ModelViewSet):
    queryset = Capacitacion.objects.all()
    serializer_class = CapacitacionSerializer

class CapacitacionPersonalViewSet(viewsets.ModelViewSet):
    queryset = CapacitacionPersonal.objects.all()
    serializer_class = CapacitacionPersonalSerializer

class RecordatorioDeTareaViewSet(viewsets.ModelViewSet):
    queryset = RecordatorioDeTarea.objects.all()
    serializer_class = RecordatorioDeTareaSerializer

class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer
