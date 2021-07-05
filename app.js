// -----CREATE COLLECTION ARRAY OF OBJECTS-----
const collection = [{
    title: "Lord of Elves",
    author: "Enid Blyton"
},
]

//-----CREATE A FUNCTION WHICH ADDS A NEW OBJECT TO THE ARRAY-----
// ARRAY SHOULD GET THE INFORMATION FROM THE FORM INPUT VALUE
const bookData = document.querySelector('form');
const addBtn = document.querySelector('.add__add-btn');

const bookTemplate = document.querySelector('.books__template');
const bookContainer = document.querySelector('.container');


//-----LOCAL STORAGE-----
// const saveBooks = () => {
//     const books = {
//         saveTitle: bookData
//     }
// }

//-----CLEAR INPUT FIELDS FOR BOOKS-----
const clearFields = () => {
    bookData.book_title.value = '';
    bookData.book_author.value = '';
}

//-----ADDS BOOKS TO AN ARRAY-----
const addObjectToArray = (title, author) => {
     title = bookData.book_title.value;
     author = bookData.book_author.value;

    const book = {
        title: title,
        author: author
    }
    collection.unshift(book);
    clearFields();
}

//-----ADD BOOKS TO DOM-----
const createNewBook = (bookInfo) => {
    const clone = bookTemplate.content.firstElementChild.cloneNode(true);
    clone.querySelector('.book__name').innerText = bookInfo.title;
    clone.querySelector('.book__author').innerText = bookInfo.author;
    bookContainer.appendChild(clone);
}

const bookSetup = () => {
    collection.forEach((book) => {
        createNewBook(book);
    })
}

addBtn.addEventListener('click', () => {
    addObjectToArray();
    bookSetup();
})



//-----CREATE A FUNCTION TO REMOVE A BOOK FROM THE COLLECTION