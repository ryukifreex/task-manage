from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from task.views import TaskViewSet

router = DefaultRouter()
router.register(r'task', TaskViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
