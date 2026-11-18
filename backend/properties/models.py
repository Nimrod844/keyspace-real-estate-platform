from django.db import models


class Property(models.Model):

    class ListingType(models.TextChoices):
        RENT = "rent", "Rent"
        SALE = "sale", "For sale"
        COMMERCIAL = "commercial", "Commercial"
        LAND = "land", "Land"

    class ReviewStatus(models.TextChoices):
        DRAFT = "draft", "Draft"
        PENDING = "pending", "Pending review"
        APPROVED = "approved", "Approved"
        REJECTED = "rejected", "Rejected"

    title = models.CharField(max_length=180)
    description = models.TextField(blank=True)

    listing_type = models.CharField(
        max_length=20,
        choices=ListingType.choices
    )

    property_type = models.CharField(max_length=60)
    location = models.CharField(max_length=180)
    price_kes = models.PositiveBigIntegerField()

    bedrooms = models.PositiveSmallIntegerField(default=0)
    bathrooms = models.PositiveSmallIntegerField(default=0)

    advertiser_name = models.CharField(max_length=160)

    review_status = models.CharField(
        max_length=20,
        choices=ReviewStatus.choices,
        default=ReviewStatus.DRAFT
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} — {self.location}"


class PropertyImage(models.Model):

    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="images"
    )

    image = models.ImageField(upload_to="properties/")

    alt_text = models.CharField(max_length=180, blank=True)

    is_cover = models.BooleanField(default=False)

    sort_order = models.PositiveSmallIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["sort_order", "id"]

    def __str__(self):
        return f"Image for {self.property.title}"