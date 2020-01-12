from django.contrib.auth.decorators import permission_required
from django.http import HttpResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from .models import Book, Author, Publisher
from .serializers import PublisherOptionSerializer, BookListSerializer, BookFormSerializer, AuthorListSerializer, \
    AuthorFormSerializer, PublisherListSerializer, PublisherFormSerializer


def publisher_list(request):
    publisher = Publisher.objects.all()
    return HttpResponse(publisher)


"""
def author_list(request):
    author = Author.objects.all()
    return HttpResponse(author)
"""


@swagger_auto_schema(method='GET', responses={200: PublisherOptionSerializer(many=True)})
@api_view(['GET'])
def publisher_option_list(request):
    publishers = Publisher.objects.all()
    serializer = PublisherOptionSerializer(publishers, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: PublisherListSerializer(many=True)})
@api_view(['GET'])
def publisher_list(request):
    publisher = Publisher.objects.all()
    serializer = PublisherListSerializer(publisher, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=PublisherFormSerializer, responses={200: PublisherFormSerializer()})
@api_view(['POST'])
def publisher_form_create(request):
    data = JSONParser().parse(request)
    serializer = PublisherFormSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=PublisherFormSerializer, responses={200: PublisherFormSerializer()})
@api_view(['PUT'])
def publisher_form_update(request, pk):
    try:
        publisher = Publisher.objects.get(pk=pk)
    except Publisher.DoesNotExist:
        return Response({'error': 'Publisher does not exist.'}, status=404)

    data = JSONParser().parse(request)
    serializer = PublisherFormSerializer(publisher, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: PublisherFormSerializer()})
@api_view(['GET'])
def publisher_form_get(request, pk):
    try:
        book = Publisher.objects.get(pk=pk)
    except Publisher.DoesNotExist:
        return Response({'error': 'Publisher does not exist.'}, status=404)

    serializer = PublisherFormSerializer(book)
    return Response(serializer.data)


@api_view(['DELETE'])
def publisher_delete(request, pk):
    try:
        book = Publisher.objects.get(pk=pk)
    except Publisher.DoesNotExist:
        return Response({'error': 'Publisher does not exist.'}, status=404)
    book.delete()
    return Response(status=204)

'''Author'''


@swagger_auto_schema(method='GET', responses={200: AuthorListSerializer(many=True)})
@api_view(['GET'])
def author_list(request):
    authors = Author.objects.all()
    serializer = AuthorListSerializer(authors, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=AuthorFormSerializer, responses={200: AuthorFormSerializer()})
@api_view(['POST'])
def author_form_create(request):
    data = JSONParser().parse(request)
    serializer = AuthorFormSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=AuthorFormSerializer, responses={200: AuthorFormSerializer()})
@api_view(['PUT'])
def author_form_update(request, pk):
    try:
        author = Author.objects.get(pk=pk)
    except Author.DoesNotExist:
        return Response({'error': 'Author does not exist.'}, status=404)

    data = JSONParser().parse(request)
    serializer = AuthorFormSerializer(author, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: AuthorFormSerializer()})
@api_view(['GET'])
def author_form_get(request, pk):
    try:
        book = Author.objects.get(pk=pk)
    except Author.DoesNotExist:
        return Response({'error': 'Author does not exist.'}, status=404)

    serializer = AuthorFormSerializer(book)
    return Response(serializer.data)


@api_view(['DELETE'])
def author_delete(request, pk):
    try:
        book = Author.objects.get(pk=pk)
    except Publisher.DoesNotExist:
        return Response({'error': 'Author does not exist.'}, status=404)
    book.delete()
    return Response(status=204)


@swagger_auto_schema(method='GET', responses={200: BookListSerializer(many=True)})
@api_view(['GET'])
def books_list(request):
    publishers = Book.objects.all()
    serializer = BookListSerializer(publishers, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=BookFormSerializer, responses={200: BookFormSerializer()})
@api_view(['POST'])
def book_form_create(request):
    data = JSONParser().parse(request)
    serializer = BookFormSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=BookFormSerializer, responses={200: BookFormSerializer()})
@api_view(['PUT'])
def book_form_update(request, pk):
    try:
        book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
        return Response({'error': 'Book does not exist.'}, status=404)

    data = JSONParser().parse(request)
    serializer = BookFormSerializer(book, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: BookFormSerializer()})
@api_view(['GET'])
def book_form_get(request, pk):
    try:
        book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
        return Response({'error': 'Book does not exist.'}, status=404)

    serializer = BookFormSerializer(book)
    return Response(serializer.data)


@api_view(['DELETE'])
def book_delete(request, pk):
    try:
        book = Book.objects.get(pk=pk)
    except Publisher.DoesNotExist:
        return Response({'error': 'Book does not exist.'}, status=404)
    book.delete()
    return Response(status=204)
