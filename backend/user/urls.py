from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserInfoView, UserViewSet, UserRegisterView, ActivateAccountView

router = DefaultRouter()
router.register(r"", UserViewSet)

urlpatterns = [
    path("self-info/", UserInfoView.as_view()),
    path("register/", UserRegisterView.as_view(), name="register"),
    path("activate/<uidb64>/<token>/", ActivateAccountView.as_view(), name="activate"),
    path("", include(router.urls)),
]
