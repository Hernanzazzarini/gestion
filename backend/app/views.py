from rest_framework import viewsets
from .models import Capacitacion
from .serializers import CapacitacionSerializer

class CapacitacionViewSet(viewsets.ModelViewSet):
    queryset = Capacitacion.objects.all()
    serializer_class = CapacitacionSerializer

