import os
from rest_framework import viewsets, status, generics, views
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import CustomUser
from .serializers import UserSerializer, UserRegisterSerializer
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator as account_activation_token
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_str, force_bytes
from .tokens import account_activation_token


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
            queryset = self.get_queryset().filter(id=user.id)
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


# ユーザー登録
class UserRegisterView(views.APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            frontend_url = os.getenv("FRONTEND_BASE_URL")
            # メール認証リンクを作成
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = account_activation_token.make_token(user)
            activation_link = f"{frontend_url}/register/activate?uidb64={uid}&token={token}"

            # メール送信
            send_mail(
                "Activate Your Account",
                f"Click the link to activate your account: {activation_link}",
                "from@task_manage.com",
                [user.email],
                fail_silently=False,
            )

            return Response(
                {"message": "success"},
                status=status.HTTP_201_CREATED,
            )
        else:
            errors = serializer.errors
            if "email" in errors and errors["email"][0] == "email_exist":
                return Response(
                    {"email": "email_exist"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ユーザー認証
class ActivateAccountView(views.APIView):
    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = CustomUser.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            user = None

        if user is not None and account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
            # 認証完了後、Next.jsの認証完了画面にリダイレクトする
            return Response({"message": "activate_success."}, status=status.HTTP_200_OK)
        return Response({"message": "activate_failed."}, status=status.HTTP_400_BAD_REQUEST)
