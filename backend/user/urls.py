from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    OrganizationInfoView,
    UserInfoView,
    UserViewSet,
    UserRegisterView,
    ActivateAccountView,
)

router = DefaultRouter()
router.register(r"", UserViewSet)

urlpatterns = [
    path("self-info/", UserInfoView.as_view(), name="self-info"),
    path("register/", UserRegisterView.as_view(), name="register"),
    path("activate/<uidb64>/<token>/", ActivateAccountView.as_view(), name="activate"),
    path("organization/", OrganizationInfoView.as_view(), name="organization"),
    path("", include(router.urls)),
]
