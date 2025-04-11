from rest_framework import serializers
from app1.models import Recipe, Review

class RecipeSerializer(serializers.ModelSerializer):
    image_url=serializers.SerializerMethodField('get_image_url')
    image=serializers.ImageField(required=False)

    class Meta:
        model=Recipe
        fields=['id','recipe_name','recipe_ingredients','instructions','recipe_cuisine','meal_type','image','image_url']

    def get_image_url(self, obj):
        request = self.context.get('request')
        photo_url = obj.image.url
        return request.build_absolute_uri(photo_url)



from django.contrib.auth.models import User
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','email','first_name','last_name','password']

    def create(self,validated_data):
        u=User.objects.create_user(username=validated_data['username'],
                                   password=validated_data['password'],
                                   email=validated_data['email'],
                                   first_name=validated_data['first_name'],
                                   last_name=validated_data['last_name']
                                   )
        return u

class ReviewSerializer(serializers.ModelSerializer):
    name=serializers.SerializerMethodField('get_user') #to send username with json data
    #recipe=serializers.SerializerMethodField('get_recipe') #to send recipe name with json data
    date=serializers.SerializerMethodField('get_date') #to send review date with json data

    class Meta:
        model = Review
        fields = '__all__'


    def get_user(self,obj):
        return obj.user.username
    #def get_recipe(self,obj):
    #   return obj.recipe_name.recipe_name
    def get_date(self,obj):
        return obj.created.date()
    



