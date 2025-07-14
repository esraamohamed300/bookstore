from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST
from .models import Book
from authentication.models import Uuser  # adjust path as needed
from django.http import JsonResponse
from django.http import HttpResponseForbidden

def show_books(request):
    return render(request,'books/gad.html')

####
##def show_details(request):
 ##   book = Book.objects.get(title='Caraval')
  ##  return render(request, 'books/bookpage.html', {'book': book})
###
def show_details(request,bookid):
    book = Book.objects.get(id=bookid)
    username = request.session.get('username')
    user_email = request.session.get('user_email')

    user = None
    if user_email:
        try:
            user = Uuser.objects.get(email=user_email)
        except Uuser.DoesNotExist:
            pass

    return render(request, 'books/bookpage.html', {
        'book': book,
        'username': username,
        'user': user,
    })



def some_view(request):
    username = request.session.get('username')
    if username:
        print("Logged-in user:", username)
    else:
        print("No user logged in")


def show_html(request):
    books = Book.objects.all()
    
    # هات الفئات الفريدة
    categories = books.values_list('category', flat=True).distinct()

    # جهز كل فئة مع الكتب الخاصة بيها
    books_by_category = []
    for cat in categories:
        books_in_cat = books.filter(category=cat)
        books_by_category.append({
            'category': cat,
            'books': books_in_cat
        })

   
    return render(request, 'books/html.html', {'books_by_category': books_by_category})


@require_POST
def borrow_book(request, book_id):
    user_email = request.session.get('user_email')
    if not user_email:
        return HttpResponseForbidden("User not logged in")

    try:
        user = Uuser.objects.get(email=user_email)
    except Uuser.DoesNotExist:
        return HttpResponseForbidden("User not found")

    book = get_object_or_404(Book, id=book_id)

    if not user.borrowed_books.filter(id=book.id).exists():
        user.borrowed_books.add(book)
        book.save()

    # Redirect back to the book detail page or another page
    return redirect('book_detail', bookid=book_id)


def show_bookslist(request):
    return render(request,'books/borrowpage.html')


def books_page(request):

    user_email = request.session.get('user_email')
    
    # استعلام كل الكتب لعرضها دائمًا
    books = Book.objects.all()
    
    borrowed_books = None
    username = None

    if user_email:
        try:
            user = Uuser.objects.get(email=user_email)
            borrowed_books = user.borrowed_books.all()
            username = user.username
        except Uuser.DoesNotExist:
            return HttpResponseForbidden("User not found")

    return render(request, 'books/Gad2.html', {
        'books': books,
        'borrowed_books': borrowed_books,
        'username': username
    })
@require_POST
def borrow_book2(request):
    user_email = request.session.get('user_email')
    if not user_email:
        return HttpResponseForbidden("User not logged in")

    try:
        user = Uuser.objects.get(email=user_email)
    except Uuser.DoesNotExist:
        return HttpResponseForbidden("User not found")

    book_id = request.POST.get('selected_book')
    if not book_id:
        return HttpResponseForbidden("No book selected")

    book = get_object_or_404(Book, id=book_id)

    if not user.reserved_books.filter(id=book.id).exists():
        user.reserved_books.add(book)
        book.save()

    return redirect('borrowlist')

def show_bookslist(request):
    user_email = request.session.get('user_email')
    if not user_email:
        return HttpResponseForbidden("User not logged in")

    try:
        user = Uuser.objects.get(email=user_email)
        reserved_books = user.reserved_books.all()
    except Uuser.DoesNotExist:
        return HttpResponseForbidden("User not found")

    return render(request, 'books/borrowpage.html', {
        'reserved_books': reserved_books
    })