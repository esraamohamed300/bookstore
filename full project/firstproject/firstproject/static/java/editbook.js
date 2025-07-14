document.getElementById("updateButton").addEventListener("click", function() {
    let newTitle = document.getElementById("title").value;
    let newAuthor = document.getElementById("author").value;
    let newCategory = document.getElementById("category").value;
    let newDescription = document.getElementById("description").value;
    let newCover = document.getElementById("cover").value;

    let selectedId = localStorage.getItem('selectedRowId'); // ناخد id اللي ضغطنا عليه Edit
    if (!selectedId) {
        alert("No selected book to update!");
        return;
    }

    // نجهز بيانات الكتاب كـ Object
    let bookData = {
        title: newTitle,
        author: newAuthor,
        category: newCategory,
        description: newDescription,
        cover: newCover
    };

    // نحفظ البيانات في localStorage بمفتاح خاص بالكتاب
    localStorage.setItem('book_' + selectedId, JSON.stringify(bookData));

    alert("Book information has been updated and saved!");
    console.log("Saved book data:", bookData);
    window.location.href = "/dadofinal/main-admin.html"; 
}); 