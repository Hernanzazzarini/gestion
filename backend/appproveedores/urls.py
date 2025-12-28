from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProveedorViewSet,
    TipoProveedorViewSet,
    DocumentoProveedorViewSet
)

router = DefaultRouter()
router.register(r'proveedores', ProveedorViewSet, basename='proveedor')
router.register(r'tipos-proveedor', TipoProveedorViewSet, basename='tipo-proveedor')
router.register(r'documentos-proveedor', DocumentoProveedorViewSet, basename='documento-proveedor')

urlpatterns = [
    path('', include(router.urls)),
]
