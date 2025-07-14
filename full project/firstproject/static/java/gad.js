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