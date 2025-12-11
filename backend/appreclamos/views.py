from rest_framework import viewsets
from .models import Reclamo
from .serializers import ReclamoSerializer

class ReclamoViewSet(viewsets.ModelViewSet):
    queryset = Reclamo.objects.all().order_by('-id')
    serializer_class = ReclamoSerializer

