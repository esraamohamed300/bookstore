from django.shortcuts import render, redirect
from .models import Uuser
from django.core.mail import send_mail
import random
from .models import PasswordResetOTP
from django.contrib.auth.hashers import make_password

def show_starting(request):
    return render(request,'authentication/starting.html')


def show_login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            user = Uuser.objects.get(email=email, password=password)
            print("User found:", user)

            # Save username and any other info you need
            request.session['username'] = user.username
            request.session['user_email'] = user.email
            request.session['is_admin'] = user.admin

            if user.admin:
                return redirect('mainadmin') 
            else:
                return redirect('books') 
        except Uuser.DoesNotExist:
            print("User not found")
            return render(request, 'authentication/login.html', {
                'error': 'Email or password is incorrect'
            })

    return render(request, 'authentication/login.html')
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            user = Uuser.objects.get(email=email, password=password)
            print("User found:", user)

            # Save user ID in session
            request.session['user_id'] = user.id
            request.session['user_name'] = user.username  # optional, for display

            if user.admin:
                return redirect('mainadmin') 
            else:
                return redirect('books') 
        except Uuser.DoesNotExist:
            print("User not found")
            return render(request, 'authentication/login.html', {
                'error': 'Email or password is incorrect'
            })

    return render(request, 'authentication/login.html')
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            user = Uuser.objects.get(email=email, password=password)
            print("User found:", user)


            if user.admin:
                return redirect('mainadmin') 
            else:
                return redirect('books') 
        except Uuser.DoesNotExist:
            print("User not found")
            return render(request, 'authentication/login.html', {
                'error': 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
            })
    else:
        print("Not POST")

    return render(request, 'authentication/login.html')

def show_signup(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        role = request.POST.get('choice')  

        is_admin = True if role == 'admin' else False

        # Create a new user instance
        new_user = Uuser(
            username=first_name + last_name,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            admin=is_admin
        )
        new_user.save()
    else:
        print("not post")
    return render(request, 'authentication/try.html')

def show_reset(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        otp = request.POST.get('otp')

        if otp:
            try:
                user = Uuser.objects.get(email=email)
                otp_entry = PasswordResetOTP.objects.filter(user=user).latest('created_at')
                if otp_entry.otp == otp and not otp_entry.is_expired():
                    request.session['reset_user_id'] = user.id
                    return redirect('reset_password')
                else:
                    return render(request, 'authentication/reset.html', {
                        'error': 'Invalid or expired OTP',
                        'show_otp': True,
                        'email': email
                    })
            except Exception as e:
                print('Error verifying OTP:', e)
                return render(request, 'authentication/reset.html', {
                    'error': 'Something went wrong. Try again.',
                    'show_otp': True,
                    'email': email
                })

        try:
            user = Uuser.objects.get(email=email)
            otp_code = str(random.randint(100000, 999999))
            PasswordResetOTP.objects.create(user=user, otp=otp_code)
            send_mail(
                'Your BOOKTY OTP Code',
                f'Your OTP code is: {otp_code}',
                'noreply@bookty.com',
                [email],
            )
            return render(request, 'authentication/reset.html', {
                'show_otp': True,
                'email': email
            })
        except Uuser.DoesNotExist:
            return render(request, 'authentication/reset.html', {
                'error': 'No user with this email exists.'
            })

    return render(request, 'authentication/reset.html')

def reset_password(request):
    user_id = request.session.get('reset_user_id')
    if not user_id:
        return redirect('reset')

    if request.method == 'POST':
        new_password = request.POST.get('password')
        user = Uuser.objects.get(id=user_id)
        user.password = new_password  # store plain text password
        user.save()
        del request.session['reset_user_id']
        return redirect('login')

    return render(request, 'authentication/reset_password.html')
