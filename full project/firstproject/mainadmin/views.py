from django.shortcuts import render,redirect
from books.models import Book
from django.shortcuts import get_object_or_404




def show_mainadmin(request):
    books = Book.objects.all()
    return render(request,'mainadmin/main-admin.html',{'books': books})

def show_add(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        author = request.POST.get('author')
        # cover_image = request.FILES.get('cover') 
        description = request.POST.get('description')
        category = request.POST.get('category')
        
        if 'cover' in request.FILES:
            cover_image = request.FILES['cover']
        else:
            cover_image = 'covers/default.jpg'
            
        Book.objects.create(
            title=title,
            author=author,
            photos=cover_image,
            description=description,
            category=category,
            avaliable=True  
        )

        return redirect('mainadmin')
    
    
    return render(request, 'mainadmin/admin_add.html')


def show_edit(request, bookid):
    book = get_object_or_404(Book, id=bookid)

    if request.method == 'POST':
        title = request.POST.get('title')
        author = request.POST.get('author')
        description = request.POST.get('description')
        category = request.POST.get('category')

       

        if 'cover' in request.FILES:
            cover_image = request.FILES['cover']
            book.photos = cover_image  # assuming "photos" is your ImageField


        book.title = title
        book.author = author
        book.description = description
        book.category = category
        book.avaliable = True

        book.save()

        return redirect('mainadmin')  # or redirect to list page or book detail

    return render(request, 'mainadmin/editbook.html', {'book': book})


def delete_book(request, book_id):
    book = get_object_or_404(Book,id=book_id)
    book.delete()
    return redirect('mainadmin')  
