from rest_framework import serializers
from .models import Area, Operario, Tarea, ArchivoAdjunto

class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = ['id', 'nombre']

class OperarioSerializer(serializers.ModelSerializer):
    area = AreaSerializer(read_only=True)
    class Meta:
        model = Operario
        fields = ['id', 'nombre', 'email', 'area']

class ArchivoAdjuntoSerializer(serializers.ModelSerializer):
    archivo_url = serializers.SerializerMethodField()
    class Meta:
        model = ArchivoAdjunto
        fields = ['id', 'archivo', 'archivo_url', 'descripcion']
    def get_archivo_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.archivo.url)
        return obj.archivo.url

class TareaSerializer(serializers.ModelSerializer):
    responsable = OperarioSerializer(read_only=True)
    responsable_id = serializers.PrimaryKeyRelatedField(
        queryset=Operario.objects.all(), source='responsable', write_only=True
    )
    archivos = ArchivoAdjuntoSerializer(many=True, read_only=True)
    class Meta:
        model = Tarea
        fields = [
            'id', 'responsable', 'responsable_id', 'tarea_asignada',
            'fecha_ejecucion', 'fecha_limite', 'fecha_finalizacion',
            'estado', 'observaciones', 'archivos'
        ]
