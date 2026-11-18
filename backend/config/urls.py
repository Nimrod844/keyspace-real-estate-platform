from django.contrib import admin
from django.urls import include, path
from rest_framework.decorators import api_view
from rest_framework.response import Response
@api_view(["GET"])
def health(request):
    return Response({"status":"ok","service":"KEYSPACE API"})
urlpatterns = [path("admin/",admin.site.urls),path("api/health/",health),path("api/",include("properties.urls")),path("api/trust/",include("trust.urls"))]
