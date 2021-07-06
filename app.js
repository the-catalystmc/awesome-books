// -----CREATE A FUNCTION WHICH ADDS A NEW OBJECT TO THE ARRAY-----
// ARRAY SHOULD GET THE INFORMATION FROM THE FORM INPUT VALUE
const addBtn = document.querySelector('.add__add-btn');

const bookTemplate = document.querySelector('.books__template');
const bookContainer = document.querySelector('.container');

//----- LIBRARY CLASS -----

class Library {
  constructor(collection) {
    this.collection = collection;
  }

  addObjectToArray() {
    const bookData = document.querySelector('form');
    const title1 = bookData.book_title.value;
    const author1 = bookData.book_author.value;
  
    const book = {
      title: title1,
      author: author1,
    };
    library.collection.push(book);
    bookData.book_title.value = '';
    bookData.book_author.value = '';
  };

  setToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(library.collection));
  };

removeBook(book) {
    const bookName = book.querySelector('.book__name').innerText;
    const bookAuthor = book.querySelector('.book__author').innerText;
  
    library.collection.forEach((book) => {
      if (book.title === bookName && book.author === bookAuthor) {
        library.collection = library.collection.filter((elem) => elem !== book);
      }
    });
    library.setToLocalStorage();
    book.remove();
  };
  
  createNewBook(bookInfo) {
    const clone = bookTemplate.content.firstElementChild.cloneNode(true);
    clone.querySelector('.book__name').innerText = bookInfo.title;
    clone.querySelector('.book__author').innerText = bookInfo.author;
    clone.querySelector('.book__remove-btn').addEventListener('click', () => {
      library.removeBook(clone);
    });
    bookContainer.appendChild(clone);
  };

}

const library = new Library([]);



// -----CLEAR INPUT FIELDS FOR BOOKS-----

// -----ADDS BOOKS TO AN ARRAY-----


// -----ADD BOOKS TO DOM-----


addBtn.addEventListener('click', () => {
  library.addObjectToArray();
  library.setToLocalStorage();
  library.createNewBook(library.collection[library.collection.length - 1]);
});

const insertBooks = (books) => {
  books.forEach((book) => {
    library.createNewBook(book);
  });
};

const getFromLocalStorage = () => {
  const booksContent = localStorage.getItem('books');
  if (booksContent != null) {
    return JSON.parse(booksContent);
  }
  return [];
};

// --------UPDATES THE SHELF
window.addEventListener('load', () => {
  const books = getFromLocalStorage();
  library.collection = books;
  insertBooks(books);
});
