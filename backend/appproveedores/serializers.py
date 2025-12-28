from rest_framework import serializers
from .models import TipoProveedor, Proveedor, DocumentoProveedor


class TipoProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoProveedor
        fields = '__all__'


class DocumentoProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentoProveedor
        fields = '__all__'


class ProveedorSerializer(serializers.ModelSerializer):

    # lectura
    tipo = TipoProveedorSerializer(read_only=True)
    documentos = DocumentoProveedorSerializer(many=True, read_only=True)

    # escritura
    tipo_id = serializers.PrimaryKeyRelatedField(
        queryset=TipoProveedor.objects.all(),
        source='tipo',
        write_only=True
    )

    class Meta:
        model = Proveedor
        fields = [
            'id',
            'tipo',
            'tipo_id',
            'nombre',
            'fecha_alta',
            'ciudad',
            'provincia',
            'telefono',
            'email',
            'documentos'
        ]
