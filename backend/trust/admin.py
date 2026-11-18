from django.contrib import admin
from .models import VerificationRequest
@admin.register(VerificationRequest)
class VerificationRequestAdmin(admin.ModelAdmin):
    list_display=("applicant_name","role","property_location","status","created_at")
    list_filter=("role","status")
    search_fields=("applicant_name","property_location","contact_email")
