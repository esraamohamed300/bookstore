function handleClick(element) {
    // Get the book title and image source
    let newTitle = element.getAttribute("data-title");
    let newImage = element.getAttribute("src");
    let newcate = element.getAttribute("data-cate");
    let newdecription = element.getAttribute("data-desc");
    let newavaliability2 = element.getAttribute("data-av");
    // Save them in localStorage
    localStorage.setItem("bookTitle", newTitle);
    localStorage.setItem("bookImage", newImage);
    localStorage.setItem("bookcate", newcate);
    localStorage.setItem("bookdecription", newdecription);
    localStorage.setItem("bookavaliability2", newavaliability2);
    // Go to the book page
    window.location.href = '../book_page/bookpage.html';
}


//--------------Search code esraa--------------------------
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("dado_search");
    const searchType = document.getElementById("searchType");
    const books = document.querySelectorAll(".dado_book");
    const searchResults = document.getElementById("searchResults");
    const allSections = document.querySelectorAll(".dado_toptrend, h5, hr");


    const originalBooks = [];
    books.forEach(book => {
        const figure = book.closest("figure");
        if (figure) {
            originalBooks.push(figure.cloneNode(true));
        }
    });

    searchInput.addEventListener("input", function () {
        const searchValue = searchInput.value.trim().toLowerCase();
        const selectedType = searchType.value;
        searchResults.innerHTML = "";
        let found = false;

        if (searchValue === "") {

            searchResults.style.display = "none";

            allSections.forEach(section => {
                section.style.display = 'flex';
                const figures = section.querySelectorAll('figure');
                figures.forEach(book => {
                    book.style.display = 'block';
                });
            });


            return;
        }

        let matchedBooks = [];

        books.forEach(function (book) {
            const title = book.getAttribute("data-title")?.toLowerCase() || "";
            const author = book.getAttribute("data-author")?.toLowerCase() || "";
            const cate = book.getAttribute("data-cate")?.toLowerCase() || "";

            let match = false;

            if (selectedType === "all") {
                match = title.includes(searchValue) || author.includes(searchValue) || cate.includes(searchValue);
            } else if (selectedType === "title") {
                match = title.includes(searchValue);
            } else if (selectedType === "author") {
                match = author.includes(searchValue);
            } else if (selectedType === "category") {
                match = cate.includes(searchValue);
            }

            if (match) {
                matchedBooks.push(book.closest("figure").cloneNode(true));
                found = true;
            }
        });

        allSections.forEach(section => section.style.display = "none");
        searchResults.style.display = "flex";

        if (found) {
            matchedBooks.forEach(book => {
                book.style.opacity = 0;
                searchResults.appendChild(book);


                setTimeout(() => {
                    book.style.transition = "opacity 0.5s";
                    book.style.opacity = 1;
                }, 50);
            });
        } else {
            const noResult = document.createElement("p");
            noResult.textContent = "No results found";
            noResult.style.color = "#674636";
            noResult.style.fontWeight = "bold";
            noResult.style.textAlign = "center";
            noResult.style.fontSize = "25px";
            searchResults.appendChild(noResult);
        }
    });
});

//----------------------dado delete code-------------------
window.onload = function () {
    let deletedBooks = JSON.parse(localStorage.getItem("deletedBooks") || "[]");

    deletedBooks.forEach(id => {
        // const book = document.getElementById(id);
        const book = document.querySelector(`[date-id="${id}"]`);
        if (book) {
            book.classList.add("not-available");
            book.getElementsByTagName("figcaption")[0].textContent = "Not available";
        }
    });

};

//------------------- eyad ubdate data --------------------


updateFigure();

window.addEventListener('storage', function(event) {
    if (event.key && event.key.startsWith("book_")) {
        console.log("LocalStorage changed, updating figure...");
        updateFigure();
    }
});

function updateFigure() {
    var selectedId = localStorage.getItem('selectedRowId');

    if (!selectedId) {
        console.log("No selected ID found to update.");
        return;
    }

    var bookFigure = document.querySelector('figure[date-id="' + selectedId + '"] img');

    if (!bookFigure) {
        console.log("Figure not found with selected ID.");
        return;
    }

    // جلب البيانات من localStorage باستخدام selectedId
    let bookDataJSON = localStorage.getItem('book_' + selectedId);
    if (!bookDataJSON) {
        console.log("No book data found for selected ID.");
        return;
    }

    let bookData = JSON.parse(bookDataJSON);

    if (bookData.title) bookFigure.setAttribute('data-title', bookData.title);
    if (bookData.author) bookFigure.setAttribute('data-author', bookData.author);
    if (bookData.category) bookFigure.setAttribute('data-cate', bookData.category);
    if (bookData.description) bookFigure.setAttribute('data-desc', bookData.description);
    if (bookData.cover) bookFigure.setAttribute('src', bookData.cover);

    console.log("Figure updated with new data!");
}



//************************************add code AE****************************************//

function loadUserBooks() {
    // 1. خلي عندك مصفوفة الكتب
    let books = JSON.parse(localStorage.getItem('books')) || [];
  
    // 2. تأكد إن فيه placeholder في الـ HTML لآخر قسم (مثلاً)
    //    نضع هوماركر في HTML: <div id="booksWrapper"></div>
    const newbooks = document.getElementById('newbooks');
  
    // 3. أنشئ h5 + div جديدين
    let sectionTitle = document.createElement('h5');
    sectionTitle.textContent = 'New Books';
    let newBooksSection = document.createElement('div');
    newBooksSection.classList.add('dado_toptrend');
    newBooksSection.id = 'new-books';
  
    // 4. لكل كتاب أضف figure
    books.forEach(book => {

      let figure = document.createElement('figure');
      figure.classList.add('fig_hover');
      figure.setAttribute('date-id', book.id);
      
  
      figure.innerHTML = `
        <img src="${book.cover}" class="dado_book">
        <figcaption>Available</figcaption>
      `;
      const img = figure.querySelector('img');
      img.setAttribute('data-title', book.title);
      img.setAttribute('data-av', 'true');
      img.setAttribute('data-author', book.author);
      img.setAttribute('data-desc', book.description);
      img.setAttribute('data-cate', book.category);
      img.setAttribute('src', book.cover);
  
      img.setAttribute('onclick', 'handleClick(this)');
  
      newBooksSection.appendChild(figure);
    });
  
    // 5. ضيف الـ h5 والـ section مع بعض في wrapper
    newbooks.appendChild(sectionTitle);
    newbooks.appendChild(newBooksSection);
  }
  
 
  loadUserBooks();