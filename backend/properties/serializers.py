from rest_framework import serializers
from .models import Property, PropertyImage


class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = [
            "id",
            "image",
            "alt_text",
            "is_cover",
            "sort_order",
        ]


class PropertySerializer(serializers.ModelSerializer):

    images = PropertyImageSerializer(many=True, read_only=True)

    class Meta:
        model = Property
        fields = [
            "id",
            "title",
            "description",
            "listing_type",
            "property_type",
            "location",
            "price_kes",
            "bedrooms",
            "bathrooms",
            "advertiser_name",
            "review_status",
            "created_at",
            "images",
        ]
        read_only_fields = [
            "review_status",
            "created_at",
        ]