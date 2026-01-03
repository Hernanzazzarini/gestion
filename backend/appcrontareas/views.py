from django.shortcuts import render

from rest_framework import viewsets
from .models import Area, Responsable, Tarea
from .serializers import AreaSerializer, ResponsableSerializer, TareaSerializer

class AreaViewSet(viewsets.ModelViewSet):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer

class ResponsableViewSet(viewsets.ModelViewSet):
    queryset = Responsable.objects.all()
    serializer_class = ResponsableSerializer

class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all().order_by('-fecha_ejecucion')
    serializer_class = TareaSerializer

