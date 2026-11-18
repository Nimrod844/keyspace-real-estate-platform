from rest_framework import serializers
from .models import VerificationRequest
class VerificationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model=VerificationRequest
        fields=("id","applicant_name","contact_email","contact_phone","role","property_location","property_description","status","created_at")
        read_only_fields=("id","status","created_at")
