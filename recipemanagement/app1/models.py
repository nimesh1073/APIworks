from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from django.contrib.auth.models import User

class Recipe(models.Model):
    recipe_name = models.CharField(max_length=50)
    recipe_ingredients = models.CharField(max_length=150)
    instructions = models.TextField()
    recipe_cuisine = models.CharField(max_length=50)
    meal_type = models.CharField(max_length=50)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to="images",null=True,blank=True)

    def __str__(self):
        return self.recipe_name



class Review(models.Model):
    recipe = models.ForeignKey(Recipe,on_delete=models.CASCADE)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    comments = models.TextField()
    rating = models.IntegerField(default=1,validators=[MinValueValidator(1),MaxValueValidator(5)])
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.recipe




