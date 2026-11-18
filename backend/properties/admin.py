from django.contrib import admin
from .models import Property
@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display=("title","location","listing_type","price_kes","review_status","created_at")
    list_filter=("listing_type","review_status","property_type")
    search_fields=("title","location","advertiser_name")
