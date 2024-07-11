from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PersonalViewSet, CapacitacionViewSet, CapacitacionPersonalViewSet, RecordatorioDeTareaViewSet, TareaViewSet
from appgestion import views

router = DefaultRouter()
router.register(r'personal', PersonalViewSet)
router.register(r'capacitaciones', CapacitacionViewSet)
router.register(r'capacitacion-personal', CapacitacionPersonalViewSet)
router.register(r'recordatorios', RecordatorioDeTareaViewSet)
router.register(r'tareas', TareaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]