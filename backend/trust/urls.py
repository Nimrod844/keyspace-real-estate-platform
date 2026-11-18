from django.urls import path
from .views import VerificationRequestCreateView
urlpatterns=[path("verification-requests/",VerificationRequestCreateView.as_view(),name="verification-request-create")]
