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


const addObjectToArray = (title, author) => {
    // title = bookData.book_title.value;
    // author = bookData.book_author.value;
    const book = {
        title: title,
        author: author
    }
    collection.unshift(book);
}

addBtn.addEventListener('click', () => {
    addObjectToArray('things', 'smart');
    console.log('hello');
})

//-----CREATE A FUNCTION TO REMOVE A BOOK FROM THE COLLECTION