from django.urls import path
from . import views

urlpatterns = [
    path('', views.show_mainadmin, name='mainadmin'),
    path('add/' , views.show_add, name='add'),
    path('edit/ <int:bookid>', views.show_edit, name='edit'),
    path('delete/ <int:book_id>', views.delete_book, name='delete'),

    
]
