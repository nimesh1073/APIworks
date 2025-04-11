from django.shortcuts import render

from app1.models import Book
from rest_framework.response import Response
from app1.serializers import BookSerializer
from rest_framework import status

# from rest_framework import viewsets
# class BookView(viewsets.ModelViewSet):
#     queryset=Book.objects.all()
#     serializer_class=BookSerializer

from rest_framework import generics
from rest_framework.views import APIView


class BookList(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q

class BookSearch(APIView):
    def get(self,request):
        query=self.request.query_params.get('search')
        if query:
            b=Book.objects.filter(Q(title__icontains=query)|Q(author__icontains=query))

            if not b.exists():
                return Response({'msg':'no results found'},status=status.HTTP_200_OK)

            books=BookSerializer(b,many=True)
            return Response(books.data,status=status.HTTP_200_OK)

        else:
            return Response({'msg':'no results found'},status=status.HTTP_200_OK)

