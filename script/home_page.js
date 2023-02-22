// Description: This file contains the code for the home page

const dataCardTemplate = document.querySelector("[data-recipe-template]")
const cardContainer = document.querySelector("[data-card-container]")
//main code of creating the cards
// Define the recipe data
const recipeData = {
    image: "https://assets.codepen.io/17119/anna-tukhfatullina-food-photographer-stylist-Mzy-OjtCI70-unsplash.jpg",
    kind: "עיקרי",
    cookTime: "2.5hrs",
    name: "עוגת שכבות, פירות - יער  וקצפת"
};


//  <================= Create Cards =================>
init();

function init(){
    for (let i = 0; i < 10; i++) {
        createRecipeCard(recipeData, i);
    }
}
// Create a new recipe card element and set its innerHTML
function createRecipeCard(recipe, i) {
    const recipeCard = dataCardTemplate.content.cloneNode(true);
    recipeCard.querySelector("[data-image]").src = recipe.image;
    recipeCard.querySelector("[data-dish]").textContent = recipe.kind+" "+i;
    recipeCard.querySelector("[data-time]").textContent = recipe.cookTime;
    recipeCard.querySelector("[data-name]").textContent = recipe.name;
    cardContainer.appendChild(recipeCard);

    //add event listener to the card    
    recipeCard.addEventListener("click", function () {
        window.location.href = "recipe.html";
    });
}

//   <=============== End Create Cards ===============>

//get the recipe data from the server
//var recipeData = getRecipeData();

function getRecipeData() {
    var recipeData = null;
    var fxhr = new FXMLHttpRequest();
    fxhr.open("GET", "");
    fxhr.send();
    if (fxhr.status == 200) {
        recipeData = JSON.parse(fxhr.responseText);
    }
    return recipeData;
}




//   <================= Search Bar =================>
const searchInput = document.querySelector("[data-search]")
const searchBtn = document.getElementById("searchBtn");

//add event listener to the search input
let list_of_recipes = [];
searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    list_of_recipes.filter((recipe) => {
        const isVisible= recipe.name.toLowerCase().includes(searchValue)||
        recipe.kind.toLowerCase().includes(searchValue);
        recipe.element.classList.toggle("hide", !isVisible);
    });
});

// // search for the text in the search box
// function search() {
//     var searchBox = document.getElementById("searchBox");
//     var searchText = searchBox.value;
//     var url = "http://www.google.com/search?q=" + searchText;
//     window.open(url);
// }

//make the search button clickable
//searchBtn.addEventListener("click", search);

//   <=============== End Search Bar ===============>




// // Get the container element for the recipe cards
// const recipeCardContainer = document.getElementById("cardContainer");
// // Create a new recipe card element and set its innerHTML
// function createRecipeCard(recipe) {
//     const recipeCard = document.createElement("div");
//     recipeCard.classList.add("recipe-card");
//     recipeCard.innerHTML = `
//     <figure>
//       <img src="${recipe.imageUrl}" alt="Cover image" data-image/>
//     </figure>
  
//     <div class="card-meta">
//       <p class="dish-type">${recipe.dishType}</p>
  
//       <ul class="dish-stats">
//         <li>
//           <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M8 2C4.6875 2 2 4.6875 2 8C2 11.3125 4.6875 14 8 14C11.3125 14 14 11.3125 14 8C14 4.6875 11.3125 2 8 2Z" stroke-miterlimit="10"/>
//             <path d="M8 4V8.5H11" stroke-linecap="round" stroke-linejoin="round"/>
//           </svg>
//           ${recipe.cookTime}
//         </li>
//       </ul>
//     </div>
  
//     <h2 class="recipe-name">${recipe.name}</h2>
//   `;

//     // Add the recipe card to the container
//     recipeCardContainer.appendChild(recipeCard);
// }