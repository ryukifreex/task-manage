from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserInfoView, UserViewSet

router = DefaultRouter()
router.register(r"", UserViewSet)

urlpatterns = [
    path("self-info/", UserInfoView.as_view()),
    path("", include(router.urls)),
]
