from django.db import models
from books.models import Book 
from django.utils import timezone
from datetime import timedelta
class Uuser(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    date_joined = models.DateTimeField(auto_now_add=True)
    admin = models.BooleanField(default=False)

    # ✅ Many-to-Many relationship
    borrowed_books = models.ManyToManyField(Book, related_name='Borrowed', blank=True)
    reserved_books = models.ManyToManyField(Book, related_name='Reserved', blank=True)

    def __str__(self):
        return self.username

class PasswordResetOTP(models.Model):
    user = models.ForeignKey(Uuser, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return timezone.now() > self.created_at + timedelta(minutes=5)

    def __str__(self):
        return f"{self.user.email} - OTP: {self.otp}"
# Create your models here.

#eyad@test.com
#eyad    