from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Area, Operario, Tarea, ArchivoAdjunto
from .serializers import AreaSerializer, OperarioSerializer, TareaSerializer, ArchivoAdjuntoSerializer

class AreaViewSet(viewsets.ModelViewSet):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer

class OperarioViewSet(viewsets.ModelViewSet):
    queryset = Operario.objects.all()
    serializer_class = OperarioSerializer

class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all().order_by('-fecha_ejecucion')
    serializer_class = TareaSerializer

class ArchivoAdjuntoViewSet(viewsets.ModelViewSet):
    queryset = ArchivoAdjunto.objects.all()
    serializer_class = ArchivoAdjuntoSerializer
    parser_classes = [MultiPartParser, FormParser]  # Permite subir archivos

