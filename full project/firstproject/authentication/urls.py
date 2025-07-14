from django.urls import path
from . import views

urlpatterns = [
    path('', views.show_starting,name='starting'),
    path('login/', views.show_login,name='login'),
    path('signup/', views.show_signup,name='signup'),
    path('reset/', views.show_reset,name='reset'),
    path('reset-password/', views.reset_password, name='reset_password'),

]
