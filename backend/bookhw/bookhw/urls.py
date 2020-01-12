from django.conf.urls import url
from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework_jwt.views import obtain_jwt_token
from django.contrib import admin

from . import views

schema_view = get_schema_view(
    openapi.Info(
        title='API',
        default_version='v1'
    ),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('publisher/options', views.publisher_option_list),
    path('publisher/list', views.publisher_list),
    path('publisher/create', views.publisher_form_create),
    path('publisher/<int:pk>/get', views.publisher_form_get),
    path('publisher/<int:pk>/update', views.publisher_form_update),
    path('publisher/<int:pk>/delete', views.publisher_delete),


    path('author/options', views.author_list),
    path('author/list', views.author_list),
    path('author/create', views.author_form_create),
    path('author/<int:pk>/get', views.author_form_get),
    path('author/<int:pk>/update', views.author_form_update),
    path('author/<int:pk>/delete', views.author_delete),


    path('book/list', views.books_list),
    path('book/create', views.book_form_create),
    path('book/<int:pk>/get', views.book_form_get),
    path('book/<int:pk>/update', views.book_form_update),
    path('book/<int:pk>/delete', views.book_delete),
    path('listall', views.publisher_list),

    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    url(r'^api-token-auth/', obtain_jwt_token)
]

