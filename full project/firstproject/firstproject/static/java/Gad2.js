document.addEventListener("DOMContentLoaded", () => {
  function addBookToCart() {
    const title = localStorage.getItem("bookTitlecart");
    const image = localStorage.getItem("bookImagecart");

    if (title && image) {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');

      const img = document.createElement('img');
      img.src = image;
      img.alt = title;
      img.classList.add('cart-book-img');
      cartItem.appendChild(img);

      const titleElement = document.createElement('h3');
      titleElement.classList.add('book-title');
      titleElement.textContent = title;
      cartItem.appendChild(titleElement);

      const controls = document.createElement('div');
      controls.classList.add('controls');

      const button = document.createElement('button');
      button.classList.add('select-btn');
      button.textContent = "Select";
      controls.appendChild(button);

      cartItem.appendChild(controls);

      const cartItems = document.querySelectorAll('.cart-item');
      const existingCartItems = Array.from(document.querySelectorAll('.cart-item .book-title'));
      const isBookAlreadyInCart = existingCartItems.some(item => item.textContent.trim() === title);

      if (!isBookAlreadyInCart) {
        const cartItems = document.querySelectorAll('.cart-item');
        const lastCartItem = cartItems[cartItems.length - 1];

        if (lastCartItem) {
          lastCartItem.after(cartItem);  
        } else {
          document.body.appendChild(cartItem);
        }

        // Store the new book in localStorage without overwriting existing books
        const storedBooks = JSON.parse(localStorage.getItem('storedBooks')) || [];
        storedBooks.push({ title, image });
        localStorage.setItem('storedBooks', JSON.stringify(storedBooks));
      } else {
        console.log("Book is already in the cart.");
      }
    }
  }

  window.addEventListener('storage', (event) => {
    if (event.key === "bookTitlecart" || event.key === "bookImagecart" || event.key === "bookcatecart" || event.key === "bookdescriptioncart" || event.key === "bookavailability2cart") {
      addBookToCart();
    }
  });

  addBookToCart();
});


document.addEventListener('DOMContentLoaded', function() {
      let selectedCount = 0;
      const selectButtons = document.querySelectorAll('.select-btn');
      const cartCount = document.getElementById('cart-count');
      const selectAllBtn = document.getElementById('select-all');
      const deselectAllBtn = document.getElementById('deselect-all');
      const confirmBtn = document.querySelector('.confirm-btn');
  
      const unavailableBooks = ['img2.jpg', 'fan3.jpg']; // اسماء الصور الغير متاحة
  
      function updateCartCount() {
        if (selectedCount > 0) {
          cartCount.style.display = 'inline';
          cartCount.textContent = selectedCount;
        } else {
          cartCount.style.display = 'none';
        }
      }
  
      // Disable unavailable books
      document.querySelectorAll('.cart-item').forEach(item => {
        const img = item.querySelector('img');
        const button = item.querySelector('.select-btn');
        if (unavailableBooks.includes(img.getAttribute('src'))) {
          button.disabled = true;
          button.textContent = "Not Available";
          button.style.backgroundColor = "gray";
          button.style.cursor = "not-allowed";
        }
      });
  
      selectButtons.forEach(button => {
        button.addEventListener('click', function() {
          if (this.disabled) return; // skip if disabled
          if (!this.classList.contains('selected')) {
            this.classList.add('selected');
            this.style.backgroundColor = '#cdbba6';
            this.style.color = '#674636';
            selectedCount++;
          } else {
            this.classList.remove('selected');
            this.style.backgroundColor = '#674636';
            this.style.color = '#fff8e8';
            selectedCount--;
          }
          updateCartCount();
        });
      });
  
      selectAllBtn.addEventListener('click', function() {
        selectButtons.forEach(button => {
          if (!button.disabled && !button.classList.contains('selected')) {
            button.classList.add('selected');
            button.style.backgroundColor = '#cdbba6';
            button.style.color = '#674636';
            selectedCount++;
          }
        });
        updateCartCount();
      });
  
      deselectAllBtn.addEventListener('click', function() {
        selectButtons.forEach(button => {
          if (!button.disabled && button.classList.contains('selected')) {
            button.classList.remove('selected');
            button.style.backgroundColor = '#674636';
            button.style.color = '#fff8e8';
            selectedCount--;
          }
        });
        updateCartCount();
      });
  
      confirmBtn.addEventListener('click', function() {
        let selectedBooks = [];
        document.querySelectorAll('.cart-item').forEach(item => {
          const button = item.querySelector('.select-btn');
          const img = item.querySelector('img');
          if (button.classList.contains('selected')) {
            selectedBooks.push({
              img: img.getAttribute('src'),
              title: item.querySelector('.book-title').innerText.trim()
            });
          }
        });
  
        localStorage.setItem('selectedBooks', JSON.stringify(selectedBooks));

        window.location.href = '../Borrowed_Books/borrowpage.html';
      });
    });


document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('es_search');
  const cartItems = document.querySelectorAll('.cart-item');

  const noResultsMessage = document.createElement('div');
  noResultsMessage.textContent = 'No books found';
  noResultsMessage.style.color = '#674636';
  noResultsMessage.style.fontSize = '20px';
  noResultsMessage.style.textAlign = 'center';
  noResultsMessage.style.marginTop = '20px';
  noResultsMessage.style.display = 'none'; 
  document.querySelector('.cart-container').appendChild(noResultsMessage);

  searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    let foundAny = false; 

    cartItems.forEach(function(item) {
      const titleElement = item.querySelector('.book-title');
      const titleText = titleElement.innerText.toLowerCase();

      if (titleText.includes(searchTerm)) {
        item.style.display = 'flex';
        foundAny = true;
        titleElement.innerHTML = titleElement.innerText;

        if (searchTerm.length > 0) {
          const regex = new RegExp(`(${searchTerm})`, 'gi');
          titleElement.innerHTML = titleElement.innerText.replace(regex, '<mark>$1</mark>');
        }

      } else {
        item.style.display = 'none';
      }
    });

    
    if (!foundAny) {
      noResultsMessage.style.display = 'block';
    } else {
      noResultsMessage.style.display = 'none';
    }
  });
});




