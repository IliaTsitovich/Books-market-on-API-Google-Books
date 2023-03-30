let categories = [{
    name: 'Art & Fashion',
    value: 'subject:Art',
},{
    name: 'Architecture',
    value: 'subject:Architecture',
},{
    name: 'Biography',
    value: 'subject:Biography & Autobiography',
},{
    name:  'Business',
    value: 'subject:Business',
},{
    name:  'Crafts & Hobbies',
    value: 'subject:Crafts & Hobbies',
},{
    name: 'Drama',
    value: 'subject:Drama',
},{
    name:  'Fiction',
    value: 'subject:Fiction',
},{
    name:  'Food & Drink',
    value: 'subject:Cooking',
},{
    name: 'Health & Wellbeing',
    value: 'subject:Health & Fitness',
},{
    name: 'History & Politics',
    value: 'subject:History',
},{
    name: 'Humor',
    value: 'subject:Humor',
},{
    name:  'Poetry',
    value: 'subject:Poetry',
},{
    name:  'Psychology',
    value: 'subject:Psychology',
},{
    name: 'Science',
    value: 'subject:Science',
},{
    name:  'Technology',
    value: 'subject:Technology',
},{
    name:  'Travel & Maps',
    value: 'subject:Travel',
}];

let averages = [`<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="#F2C94C">
<path d="M31.547 12a.848.848 0 00-.677-.577l-9.427-1.376-4.224-8.532a.847.847 0 00-1.516 0l-4.218 8.534-9.427 1.355a.847.847 0 00-.467 1.467l6.823 6.664-1.612 9.375a.847.847 0 001.23.893l8.428-4.434 8.432 4.432a.847.847 0 001.229-.894l-1.615-9.373 6.822-6.665a.845.845 0 00.214-.869z" />
</svg>`]


const output = document.querySelector(".output-books");
const divCategoriesBooksList = document.querySelector(".categories-list");
const divCategoriesBooks = document.querySelector("categories-books");
const key = 'AIzaSyDca-QdQzla2Kdq3KbAtFLtKwUEmKC9BpQ';
const urlDefault = new URL(`https://www.googleapis.com/books/v1/volumes?q="subject:Art"&key=${key}&printType=books&startIndex=0&maxResults=6&langRestrict=en`);
const url = new URL(`https://www.googleapis.com/books/v1/volumes?q="subject:Health & Fitness"&key=${key}&printType=books&startIndex=0&maxResults=6&langRestrict=en`);
const placeHolderImageBooks = '';


function initCategory() {

    categories.forEach((items,index) => {
        let elCategories = `
        <li class="${index ===0? "active" : " " } n${index}" data-index="${index}"><button data-index="${index}" class='categories-list_item button-item ${index ===0? "activeButton" : " "} nb${index}' type="submit" value="${categories[index].value}">${categories[index].name}</a>
        `
        divCategoriesBooksList.innerHTML += elCategories;
    
    })
};

function moveActiveCategory(num) {
    divCategoriesBooksList.querySelector('.active').classList.remove('active');
    divCategoriesBooksList.querySelector('.activeButton').classList.remove('activeButton');
    divCategoriesBooksList.querySelector('.n' + num).classList.add('active');
    divCategoriesBooksList.querySelector('.nb' + num).classList.add('activeButton');
}

function initMoveActiveCategory () {
    let buttons = [...divCategoriesBooksList.querySelectorAll('button')].forEach(item => { 
        item.addEventListener('click', () => {
        moveActiveCategory(item.dataset.index);       
    })
});
};

function getBooks () {
    let buttons = [...divCategoriesBooksList.querySelectorAll('button')].forEach(item => { 
        item.addEventListener('click', async function() {
            output.innerHTML = " ";
            let count = 0;
            url.searchParams.set("q", item.value);
            url.searchParams.set("startIndex", count);
            let response = await fetch(url)
            .then(response => response.json())
            console.log(response.items);

            let books = response.items;
            books.forEach(item => {
                showBooksGallery(item)
            });

        })
    })
};

function showBooksGallery(item) {
    
    let stringAuthors = `${item.volumeInfo.authors !== undefined? item.volumeInfo.authors.join(", ") : ' '}`;
    let description = `${item.volumeInfo.description !== undefined? item.volumeInfo.description.slice(0,95) + "..." : " "}`; 
    let cardBookDiv = `
    <div class="cardBook">
        <div class="containerImageBook">
            <img class="image-books" src="${item.volumeInfo.imageLinks.thumbnail !== undefined? item.volumeInfo.imageLinks.thumbnail : placeHolderImageBooks}" alt="image-books">
        </div>
        <div class="infoBooks">
            <div class="div-author">
                <h2 class="author">${stringAuthors}</h2>
            </div>
            <div class="div-title">
                <p class="title-books">${item.volumeInfo.title}</p>
            </div>
            ${
                item.volumeInfo.averageRating === undefined || item.volumeInfo.ratingCount === undefined? 
                "" :
                `<div class="container-stars">
                <div class="stars">
                    ${averages.join('').repeat(item.volumeInfo.averageRating)}
                </div>
                <div class="raiting-count">
                    <p class="raiting">${item.volumeInfo.ratingCount} review</p>
                </div>
            </div>`
            }
            <div class="descriptions">
                <p class="text-descriptions">${description}</p>
            </div>
            <div class="price">
                <p class="money-value">${item.saleInfo.retailPrice !== undefined? item.saleInfo.retailPrice.currencyCode + " " + item.saleInfo.retailPrice.amount : ""}</p>
            </div>
            <div class="button">
                  <button class="buy-now">buy now</button>
            </div>
        </div>
        `;
    
    
        
       

        
        
        
    
   output.innerHTML += cardBookDiv;
};


document.addEventListener('DOMContentLoaded', function() {
    initCategory();
    initMoveActiveCategory();
    getBooks();
});


 