from django.db import models

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    description = models.TextField()
    category = models.CharField(max_length=100)
    avaliable = models.BooleanField(default=True)
    photos = models.ImageField(upload_to='covers/', default='covers/default.jpg')


    def __str__(self):
        return self.title
