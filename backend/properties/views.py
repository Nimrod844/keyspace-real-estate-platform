from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Property
from .serializers import PropertySerializer
class PropertyViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class=PropertySerializer
    permission_classes=[AllowAny]
    def get_queryset(self):
        return Property.objects.filter(review_status=Property.ReviewStatus.APPROVED).order_by("-created_at")
