from django.core.serializers import serialize
from django.shortcuts import render

from rest_framework import viewsets
from app1.models import Recipe,Review
from app1.serializer import RecipeSerializer,UserSerializer,ReviewSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_404_NOT_FOUND
from django.http import Http404


class RecipeView(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

from django.contrib.auth.models import User
class UserRegistration(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        self.request.user.auth_token.delete()
        return Response({"msg":"Logout Successfully"},status=status.HTTP_200_OK)

from django.db.models import Q

class SearchRecipes(APIView):
    def get(self,request):
        query=self.request.query_params.get('search')
        if query:
            b=Recipe.objects.filter(Q(recipe_name__icontains=query)|Q(recipe_ingredients__icontains=query))
            if not b.exists():
                return Response({'msg':'no results found'}, status=status.HTTP_200_OK)


            recipe=RecipeSerializer(b,many=True,context={"request":request})
            return Response(recipe.data,status=status.HTTP_200_OK)
        else:
            return Response({'msg':'no results found'}, status=status.HTTP_200_OK)

class FilterbyCuisine(APIView):
    def get(self,request):
        query=self.request.query_params.get('search')
        if query:
            b = Recipe.objects.filter(Q(recipe_cuisine__icontains=query))
            if not b.exists():
                return Response({'msg': 'no results found'}, status=status.HTTP_200_OK)

            recipe = RecipeSerializer(b, many=True)
            return Response(recipe.data, status=status.HTTP_200_OK)
        else:
            return Response({'msg': 'no results found'}, status=status.HTTP_200_OK)

class FilterbyMealtype(APIView):
    def get(self,request):
        query=self.request.query_params.get('search')
        if query:
            b = Recipe.objects.filter(Q(meal_type__icontains=query))
            if not b.exists():
                return Response({'msg': 'no results found'}, status=status.HTTP_200_OK)

            recipe = RecipeSerializer(b, many=True)
            return Response(recipe.data, status=status.HTTP_200_OK)
        else:
            return Response({'msg': 'no results found'}, status=status.HTTP_200_OK)

class FilterbyIngredients(APIView):
    def get(self,request):
        query=self.request.query_params.get('search')
        if query:
            b = Recipe.objects.filter(Q(recipe_ingredients__icontains=query))
            if not b.exists():
                return Response({'msg': 'no results found'}, status=status.HTTP_200_OK)

            recipe = RecipeSerializer(b, many=True)
            return Response(recipe.data, status=status.HTTP_200_OK)
        else:
            return Response({'msg': 'no results found'}, status=status.HTTP_200_OK)


class CreateReview(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request):
        id = request.data['id']   #to fetch id from json object recieved from client side
        c = request.data['comment']     #to fetch comment from json object
        r = request.data['rating']      #to fetch rating from json object
        u = self.request.user           #current user

        recipe = Recipe.objects.get(id=id)      #to fetch recipe details of particular recipe
        rev = Review.objects.create(user=u,comments=c,rating=r,recipe=recipe)   #creating review record
        rev.save()
        review = ReviewSerializer(rev)      #convert it into json
        return Response(review.data,status=status.HTTP_201_CREATED)     #send created review object

class GetReview(APIView):
    def get_object(self,pk):
        try:
            return Recipe.objects.get(pk=pk)
        except:
            raise Http404

    def get(self,request,pk):
        r=self.get_object(pk)
        rev=Review.objects.filter(recipe=r)
        review=ReviewSerializer(rev,many=True)
        return Response(review.data,status=status.HTTP_200_OK)


# class Review_filter(APIView):
#     def get(self,request,pk):
#         r=Recipe.objects.get(id=pk)     #to fetch the recipe object matching





