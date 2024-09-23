from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Organization


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = (
        "organization",
        "email",
        "username",
        "first_name",
        "last_name",
        "is_active",
        "is_admin",
        "is_superuser",
    )
    ordering = (
        "organization",
        "email",
        "username",
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "username", "password1", "password2"),
            },
        ),
    )
    # 追加したフィールドをadminサイト編集画面に追加する
    fieldsets = UserAdmin.fieldsets + (
        ("Organization Group", {"fields": ("organization",)}),
        ("admin Permission", {"fields": ("is_admin",)}),
    )


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Organization)
