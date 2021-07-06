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
    this.collection.push(book);
    bookData.book_title.value = '';
    bookData.book_author.value = '';
  };

  setToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.collection));
  };

  removeBook(book) {
    const bookName = book.querySelector('.book__name').innerText;
    const bookAuthor = book.querySelector('.book__author').innerText;
  
    this.collection.forEach((book) => {
        console.log("bookName", bookName);
        console.log("bookAuthor", bookAuthor);
        console.log("---------------------------")
        console.log("book.title", book.title);
        console.log("book.author", book.author);
      if (book.title === bookName && book.author === bookAuthor) {
        console.log("bookName", bookName);
        console.log("bookAuthor", bookAuthor);
        this.collection = this.collection.filter((elem) => elem !== book);
      }
    });
    console.log(this.collection);
    this.setToLocalStorage();
    book.remove();
  };
  
  createNewBook(bookInfo) {
    const clone = bookTemplate.content.firstElementChild.cloneNode(true);
    clone.querySelector('.book__name').innerText = bookInfo.title;
    clone.querySelector('.book__author').innerText = bookInfo.author;
    clone.querySelector('.book__remove-btn').addEventListener('click', () => {
      this.removeBook(clone);
    });
    bookContainer.appendChild(clone);
  };

  getFromLocalStorage() {
    const booksContent = localStorage.getItem('books');
    if (booksContent != null) {
      return JSON.parse(booksContent);
    }
    return [];
  };

  insertBooks(books) {
    books.forEach((book) => {
      this.createNewBook(book);
    });
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

// const insertBooks = (books) => {
//   books.forEach((book) => {
//     library.createNewBook(book);
//   });
// };



// --------UPDATES THE SHELF
window.addEventListener('load', () => {
  const books = library.getFromLocalStorage();
  library.collection = books;
  library.insertBooks(books);
});
