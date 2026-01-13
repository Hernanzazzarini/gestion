from rest_framework import viewsets, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
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
    parser_classes = [MultiPartParser, FormParser]  # Permite subir archivos

    def create(self, request, *args, **kwargs):
        # Guardar la tarea
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        tarea = serializer.save()

        # Guardar los archivos si existen
        archivos = request.FILES.getlist('archivos')
        for archivo in archivos:
            ArchivoAdjunto.objects.create(tarea=tarea, archivo=archivo)

        # Devolver tarea con archivos
        resp_serializer = self.get_serializer(tarea)
        return Response(resp_serializer.data, status=status.HTTP_201_CREATED)

class ArchivoAdjuntoViewSet(viewsets.ModelViewSet):
    queryset = ArchivoAdjunto.objects.all()
    serializer_class = ArchivoAdjuntoSerializer
    parser_classes = [MultiPartParser, FormParser]  # Permite subir archivos

