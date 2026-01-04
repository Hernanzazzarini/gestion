from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import AreaViewSet, OperarioViewSet, TareaViewSet, ArchivoAdjuntoViewSet

router = DefaultRouter()
router.register(r'areas', AreaViewSet)
router.register(r'operarios', OperarioViewSet)
router.register(r'tareas', TareaViewSet)
router.register(r'archivos', ArchivoAdjuntoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
