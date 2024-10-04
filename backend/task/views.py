from rest_framework import viewsets, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied
from .models import Task
from .serializers import TaskSerializer


class StatusLabelView(generics.GenericAPIView):
    serializer_class = TaskSerializer
    permission_classes = [AllowAny]

    def get(self, _):
        choices = dict(Task.Status.choices)
        return Response(choices)


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        user = request.user
        if user.organization:
            queryset = self.get_queryset().filter(organization=user.organization)
        else:
            queryset = self.get_queryset().filter(created_by=user, organization=None)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        user = request.user
        if user.organization:
            # 組織に所属する場合、Organization情報を登録
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                # 組織情報を設定
                serializer.save(organization=user.organization)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            # 組織に所属しない場合はOrganization情報を登録しない
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                # 組織なしで保存
                serializer.save(created_by=user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        user = request.user
        task = self.get_object()

        if user.organization:
            # 組織に所属する場合、自分のOrganizationのみ更新可能
            if task.organization == user.organization:
                serializer = self.get_serializer(task, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                raise PermissionDenied("You do not have permission.")
        else:
            # 組織がない場合は、自分のもののみ更新可能
            if task.created_by == user:
                serializer = self.get_serializer(task, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                raise PermissionDenied("You do not have permissiona.")

    def destroy(self, request, *args, **kwargs):
        user = request.user
        task = self.get_object()

        if user.organization:
            # 組織に所属する場合、自分のOrganizationのみ削除可能
            if task.organization == user.organization:
                task.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                raise PermissionDenied("You do not have permission to delete this task.")
        else:
            # 組織がない場合は、自分のもののみ削除可能
            if task.created_by == user:
                task.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            else:
                raise PermissionDenied("You do not have permission to delete this task.")
