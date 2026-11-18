from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import VerificationRequest
from .serializers import VerificationRequestSerializer
class VerificationRequestCreateView(generics.CreateAPIView):
    queryset=VerificationRequest.objects.all()
    serializer_class=VerificationRequestSerializer
    permission_classes=[AllowAny]
