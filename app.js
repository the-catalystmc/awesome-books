// ----- LIBRARY CLASS -----

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
  }

  setToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.collection));
  }

  removeBook(book) {
    const bookName = book.querySelector('.book__name').innerText;
    const bookAuthor = book.querySelector('.book__author').innerText;

    this.collection.forEach((book) => {
      if (book.title === bookName && book.author === bookAuthor) {
        this.collection = this.collection.filter((elem) => elem !== book);
      }
    });
    // console.log(this.collection);
    this.setToLocalStorage();
    book.remove();
  }

  createNewBook(bookInfo) {
    const bookTemplate = document.querySelector('.books__template');
    const bookContainer = document.querySelector('.container');

    const clone = bookTemplate.content.firstElementChild.cloneNode(true);
    clone.querySelector('.book__name').innerText = bookInfo.title;
    clone.querySelector('.book__author').innerText = bookInfo.author;
    clone.querySelector('.book__remove-btn').addEventListener('click', () => {
      this.removeBook(clone);
    });
    bookContainer.appendChild(clone);
  }

  getFromLocalStorage() {
    const booksContent = localStorage.getItem('books');
    if (booksContent != null) {
      return JSON.parse(booksContent);
    }
    return this.collection;
  }

  insertBooks(books) {
    books.forEach((book) => {
      this.createNewBook(book);
    });
  }
}

const library = new Library([]);

const addBtn = document.querySelector('.add__add-btn');

const DateTime = luxon.DateTime;

const displayDate = () => {
  const dateNowFormat = DateTime.now().toFormat('ff');
  document.querySelector(".date-now").innerText = dateNowFormat;
}

const listOption = document.querySelector('.container__list');
const listAdd = document.querySelector('.container__add');
const listContact = document.querySelector('.container__contact');

addBtn.addEventListener('click', () => {
  library.addObjectToArray();
  library.setToLocalStorage();
  library.createNewBook(library.collection[library.collection.length - 1]);
});

// --------UPDATES THE SHELF
window.addEventListener('load', () => {
  const books = library.getFromLocalStorage();
  library.collection = books;
  library.insertBooks(books);
  displayDate();
});
