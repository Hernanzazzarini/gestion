from django.shortcuts import render

from rest_framework import viewsets
from .models import Proveedor, TipoProveedor, DocumentoProveedor
from .serializers import (
    ProveedorSerializer,
    TipoProveedorSerializer,
    DocumentoProveedorSerializer
)


class TipoProveedorViewSet(viewsets.ModelViewSet):
    queryset = TipoProveedor.objects.all()
    serializer_class = TipoProveedorSerializer


class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer


class DocumentoProveedorViewSet(viewsets.ModelViewSet):
    queryset = DocumentoProveedor.objects.all()
    serializer_class = DocumentoProveedorSerializer

