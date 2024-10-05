from rest_framework import serializers
from .models import CustomUser, Organization


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "organization",
            "email",
            "username",
            "first_name",
            "last_name",
            "is_active",
            "is_admin",
            "is_superuser",
        ]


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("username", "email", "password")

    def create(self, validated_data):
        # 同じメールアドレスを持つアクティブでないユーザーを検索
        exist_user = CustomUser.objects.filter(
            email=validated_data["email"], is_active=False
        ).first()

        if exist_user:
            # アクティブでないユーザーが存在する場合、情報を上書き
            exist_user.username = validated_data["username"]
            exist_user.password = validated_data["password"]
            exist_user.is_active = False
            exist_user.save()
            return exist_user

        # アクティブでないユーザーが存在しない場合は新規作成
        user = CustomUser.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            username=validated_data["username"],
            is_active=False,
        )
        return user

    def validate_email(self, value):
        exist_user = CustomUser.objects.filter(email=value, is_active=True).first()
        if exist_user:
            raise serializers.ValidationError("email_exist")

        return value


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = "__all__"
