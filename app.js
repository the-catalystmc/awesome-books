let collection = [];

// -----CREATE A FUNCTION WHICH ADDS A NEW OBJECT TO THE ARRAY-----
// ARRAY SHOULD GET THE INFORMATION FROM THE FORM INPUT VALUE
const bookData = document.querySelector('form');
const addBtn = document.querySelector('.add__add-btn');

const bookTemplate = document.querySelector('.books__template');
const bookContainer = document.querySelector('.container');

// -----CLEAR INPUT FIELDS FOR BOOKS-----
const clearFields = () => {
  bookData.book_title.value = '';
  bookData.book_author.value = '';
};

const setToLocalStorage = () => {
  localStorage.setItem('books', JSON.stringify(collection));
};

// -----ADDS BOOKS TO AN ARRAY-----
const addObjectToArray = () => {
  const title1 = bookData.book_title.value;
  const author1 = bookData.book_author.value;

  const book = {
    title: title1,
    author: author1,
  };
  collection.push(book);
  clearFields();
};

const removeBook = (book) => {
  const bookName = book.querySelector('.book__name').innerText;
  const bookAuthor = book.querySelector('.book__author').innerText;

  collection.forEach((book) => {
    if (book.title === bookName && book.author === bookAuthor) {
      collection = collection.filter((elem) => elem !== book);
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
  addObjectToArray();
  setToLocalStorage();
  createNewBook(collection[collection.length - 1]);
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
  collection = books;
  insertBooks(books);
});
