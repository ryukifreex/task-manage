from django.contrib.auth.hashers import make_password
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class Organization(models.Model):
    name = models.CharField(max_length=255)
    information = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    # 管理画面用の表示
    def __str__(self):
        return self.name

    class Meta:
        db_table = "organization"
        verbose_name = "組織"
        verbose_name_plural = verbose_name


class UserManager(BaseUserManager):

    # user作成
    def create_user(self, email, password=None, name=None, **extra_fields):
        # emailチェック
        if not email:
            raise ValueError("required email")
        email = self.normalize_email(email)

        user = self.model(email=email, name=name, password=password, **extra_fields)
        user.save(using=self._db)

        return user

    # admin作成
    def create_admin(self, email, password=None, name=None, **extra_fields):
        extra_fields.setdefault("is_admin", True)

        if extra_fields.get("is_admin") is not True:
            raise ValueError("required admin permission")

        return self.create_user(email, password, name, **extra_fields)

    # superuser作成
    def create_superuser(self, email, password=None, name=None, **extra_fields):
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_admin", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_admin") is not True:
            raise ValueError("required admin permission")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("required superuser permission")

        return self.create_user(email, password, name, **extra_fields)


class CustomUser(AbstractBaseUser):
    organization = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True, blank=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    # PWのハッシュ化
    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super().save(*args, **kwargs)

    # カスタム情報
    objects = UserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    # DBの可読性向上
    class Meta:
        db_table = "user"
        verbose_name = "ユーザー"
        verbose_name_plural = verbose_name

    # 管理画面用の表示
    def __str__(self):
        return self.email
