from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import CustomUser
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        user = request.user
        if user.organization:
            queryset = self.get_queryset().filter(organization=user.organization)
            # 親の list メソッドを呼び出して、シリアライズとレスポンスを処理
            serializer = self.get_serializer(queryset, many=True)
        else:
            queryset = self.get_queryset().filter(user=user)
            serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class UserInfoView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # 認証が必要

    def get(self, request, *args, **kwargs):
        # 現在のユーザー情報を取得
        user = request.user
        serializer = self.get_serializer(user)
        return Response(serializer.data)
