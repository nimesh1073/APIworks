from django.db import models

class Book(models.Model):
    name=models.CharField(max_length=30)
    author=models.CharField(max_length=30)
    price = models.IntegerField()
    language = models.CharField(max_length=20)
    pages = models.IntegerField()
    image = models.ImageField(upload_to="images")
    pdf = models.FileField(upload_to="images")

    def __str__(self):
        return self.name


