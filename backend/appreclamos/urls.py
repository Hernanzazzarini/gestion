from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReclamoViewSet

router = DefaultRouter()
router.register(r"reclamos", ReclamoViewSet)

urlpatterns = [
    path("", include(router.urls)),
]

