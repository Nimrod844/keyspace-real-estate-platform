from django.db import models
class VerificationRequest(models.Model):
    class ApplicantRole(models.TextChoices):
        OWNER="owner","Property owner"
        AGENT="agent","Authorised agent"
        DEVELOPER="developer","Developer"
    class Status(models.TextChoices):
        SUBMITTED="submitted","Submitted"
        IN_REVIEW="in_review","In review"
        MORE_INFO="more_info","More information required"
        APPROVED="approved","Approved"
        REJECTED="rejected","Rejected"
    applicant_name=models.CharField(max_length=160)
    contact_email=models.EmailField()
    contact_phone=models.CharField(max_length=40)
    role=models.CharField(max_length=20,choices=ApplicantRole.choices)
    property_location=models.CharField(max_length=180)
    property_description=models.CharField(max_length=300,blank=True)
    status=models.CharField(max_length=20,choices=Status.choices,default=Status.SUBMITTED)
    created_at=models.DateTimeField(auto_now_add=True)
    def __str__(self): return f"{self.applicant_name} — {self.get_role_display()}"
