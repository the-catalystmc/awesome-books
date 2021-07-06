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

}

const library = new Library([]);



// -----CLEAR INPUT FIELDS FOR BOOKS-----


const setToLocalStorage = () => {
  localStorage.setItem('books', JSON.stringify(library.collection));
};

// -----ADDS BOOKS TO AN ARRAY-----


const removeBook = (book) => {
  const bookName = book.querySelector('.book__name').innerText;
  const bookAuthor = book.querySelector('.book__author').innerText;

  library.collection.forEach((book) => {
    if (book.title === bookName && book.author === bookAuthor) {
      library.collection = library.collection.filter((elem) => elem !== book);
    }
  });
  setToLocalStorage();
  book.remove();
};

// -----ADD BOOKS TO DOM-----
const createNewBook = (bookInfo) => {
  const clone = bookTemplate.content.firstElementChild.cloneNode(true);
  clone.querySelector('.book__name').innerText = bookInfo.title;
  clone.querySelector('.book__author').innerText = bookInfo.author;
  clone.querySelector('.book__remove-btn').addEventListener('click', () => {
    removeBook(clone);
  });
  bookContainer.appendChild(clone);
};

addBtn.addEventListener('click', () => {
  library.addObjectToArray();
  setToLocalStorage();
  createNewBook(library.collection[library.collection.length - 1]);
});

const insertBooks = (books) => {
  books.forEach((book) => {
    createNewBook(book);
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
