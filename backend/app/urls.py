from rest_framework.routers import DefaultRouter
from .views import CapacitacionViewSet

router = DefaultRouter()
router.register(r'capacitaciones', CapacitacionViewSet)

urlpatterns = router.urls

