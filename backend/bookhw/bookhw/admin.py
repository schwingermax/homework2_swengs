from django.contrib import admin
from .models import *


class BookAdmin(admin.ModelAdmin):
    list_filter = ( 'author__name', )


class AuthorAdmin(admin.ModelAdmin): pass


class PublisherAdmin(admin.ModelAdmin): pass


admin.site.register(Book, BookAdmin)
admin.site.register(Author, AuthorAdmin)
admin.site.register(Publisher, PublisherAdmin)
