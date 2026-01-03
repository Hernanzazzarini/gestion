from rest_framework.routers import DefaultRouter
from .views import AreaViewSet, ResponsableViewSet, TareaViewSet

router = DefaultRouter()
router.register('areas', AreaViewSet)
router.register('responsables', ResponsableViewSet)
router.register('tareas', TareaViewSet)

urlpatterns = router.urls
