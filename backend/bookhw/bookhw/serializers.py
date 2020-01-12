from rest_framework import serializers
from .models import Author, Book, Publisher


class PublisherOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ['id', 'name', 'responsible', 'responsible_vorname', 'scientific', 'gruendungsdatum']


class PublisherListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ['id', 'name', 'responsible', 'responsible_vorname', 'scientific', 'gruendungsdatum']


class PublisherFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = '__all__'


class AuthorListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name', 'vorname', 'geburtsdatum', 'eyecolour', 'renowned']


# def get_book_name(self, obj):
#    return obj.book.name if obj.book else ''


class AuthorFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'


class BookListSerializer(serializers.ModelSerializer):
    publisher_name = serializers.SerializerMethodField()
    author = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ['id', 'title', 'genre', 'erscheinungsdatum', 'handlung', 'author', 'publisher_name']

    def get_publisher_name(self, obj):
        return obj.publisher.name if obj.publisher else ''

    def get_author(self, obj):
        if obj:
            return {' ' + x.name for x in obj.author.all()}


class BookFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
