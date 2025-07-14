function updateBookInfo({ title, category, description, photoUrl }) {
  // Update book cover image src
  const coverImg = document.querySelector('.book-cover');
  if (coverImg && photoUrl) {
    coverImg.src = photoUrl;
  }

  // Update book title text
  const bookTitle = document.querySelector('.book-title');
  if (bookTitle && title) {
    bookTitle.textContent = title;
  }

  // Update category text
  const categoryEl = document.querySelector('.type-book');
  if (categoryEl && category) {
    categoryEl.textContent = category.toUpperCase();
  }

  // Update description content
  const descriptionEl = document.querySelector('#info-box .content');
  if (descriptionEl && description) {
    descriptionEl.textContent = description;
  }
}
function handleClick(element) {
  const title = element.getAttribute('data-title');
  const category = element.getAttribute('data-cate');
  const description = element.getAttribute('data-desc');
  const photoUrl = element.src;

  updateBookInfo({ title, category, description, photoUrl });
}


///////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll('.book-tab');
    tabs[0].classList.add('active');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove 'active' from all buttons
            tabs.forEach(btn => btn.classList.remove('active'));
            // Add 'active' only to the clicked one
            tab.classList.add('active');
        });
    });
}); 


function showTab(tabName) {
    const infoTab = document.getElementById('info-box');
    const similarTab = document.getElementById('similar-box');
  
    if (tabName === 'info') {
      infoTab.style.display = 'block';
      similarTab.style.display = 'none';
    } else if (tabName === 'similar') {
      infoTab.style.display = 'none';
      similarTab.style.display = 'block';
    }
  }


  document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.sliderc');
    const nxtBtns = document.querySelectorAll('.nxt-btn');
    const preBtns = document.querySelectorAll('.pre-btn');
  
    sliders.forEach((slider, i) => {
      let containerWidth = slider.offsetWidth;
      let scrollAmount = 1000; // Adjust this value as needed
  
      nxtBtns[i].addEventListener('click', () => {
        slider.scrollBy({
          left: scrollAmount,
          behavior: 'smooth'
        });
      });
  
      preBtns[i].addEventListener('click', () => {
        slider.scrollBy({
          left: -scrollAmount,
          behavior: 'smooth'
        });
      });
    });
  });

  function handleClick2(element) {
    

    document.getElementById('message-container').style.display = 'block';
    document.getElementById('button-container').style.display = 'none';


}



