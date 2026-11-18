from django.contrib import admin
from .models import Property, PropertyImage


class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1

    fields = (
        "image",
        "alt_text",
        "is_cover",
        "sort_order",
    )


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "location",
        "listing_type",
        "price_kes",
        "review_status",
        "created_at",
    )

    list_filter = (
        "listing_type",
        "review_status",
        "property_type",
    )

    search_fields = (
        "title",
        "location",
        "advertiser_name",
    )

    inlines = [PropertyImageInline]


@admin.register(PropertyImage)
class PropertyImageAdmin(admin.ModelAdmin):

    list_display = (
        "property",
        "is_cover",
        "sort_order",
        "created_at",
    )

    list_filter = ("is_cover",)

    search_fields = (
        "property__title",
        "property__location",
        "alt_text",
    )