from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StatusLabelView, TaskViewSet

router = DefaultRouter()
router.register("", TaskViewSet)


urlpatterns = [
    path("status-label/", StatusLabelView().as_view()),
    path("", include(router.urls)),
]
