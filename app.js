let collection = [];

//-----CREATE A FUNCTION WHICH ADDS A NEW OBJECT TO THE ARRAY-----
// ARRAY SHOULD GET THE INFORMATION FROM THE FORM INPUT VALUE
const bookData = document.querySelector('form');
const addBtn = document.querySelector('.add__add-btn');

const bookTemplate = document.querySelector('.books__template');
const bookContainer = document.querySelector('.container');


//-----CLEAR INPUT FIELDS FOR BOOKS-----
const clearFields = () => {
    bookData.book_title.value = '';
    bookData.book_author.value = '';
}

//-----ADDS BOOKS TO AN ARRAY-----
const addObjectToArray = () => {
    title = bookData.book_title.value;
    author = bookData.book_author.value;

    const book = {
        title: title,
        author: author
    }
    collection.unshift(book);
    clearFields();
}

const compareBookInfo = (bookName, bookAuthor) => {
    collection.forEach((book) => {
        if (book.title === bookName && book.author === bookAuthor) {
           filteredBooks = collection.filter((elem) => elem != book);
           insertBooks(filteredBooks);
        }
    });
}

//-----CREATE A FUNCTION TO REMOVE A BOOK FROM THE COLLECTION
const removeBooks = (book) => {
    bookName = book.querySelector('.book__name').innerText;
    bookAuthor = book.querySelector('.book__author').innerText;
    compareBookInfo(bookName, bookAuthor);
}

//-----ADD BOOKS TO DOM-----
const createNewBook = (bookInfo) => {
    const clone = bookTemplate.content.firstElementChild.cloneNode(true);
    clone.querySelector('.book__name').innerText = bookInfo.title;
    clone.querySelector('.book__author').innerText = bookInfo.author;
    clone.querySelector('.book__remove-btn').addEventListener('click', () => {
        removeBooks(clone);
    });
    bookContainer.appendChild(clone);
}

addBtn.addEventListener('click', () => {
    addObjectToArray();
    setToLocalStorage();
    createNewBook(collection[0]); 
})

const insertBooks = (books) => {
    books.forEach((book) => {
        createNewBook(book);
    });
}

const getFromLocalStorage = () => {
    let booksContent = localStorage.getItem('books');
    if (booksContent != null) {
        return JSON.parse(booksContent);
    }
    return [];
} 

const setToLocalStorage = () => {
    localStorage.setItem('books', JSON.stringify(collection));
} 

//--------UPDATES THE SHELF 
window.addEventListener('load', () => {
    let books = getFromLocalStorage();
    collection = books;
    insertBooks(books);
}); 
