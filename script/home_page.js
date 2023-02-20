// Description: This file contains the code for the home page

//get the recipe data from the server
//var recipeData = getRecipeData();

function getRecipeData() {
    var recipeData = null;
    var fxhr = new FXMLHttpRequest();
    fxhr.open("GET", "http://localhost:3000/recipes", false);
    fxhr.send();
    if (fxhr.status == 200) {
        recipeData = JSON.parse(fxhr.responseText);
    }
    return recipeData;
}



searchBtn = document.getElementById("searchBtn");
// search for the text in the search box
function search() {
    var searchBox = document.getElementById("searchBox");
    var searchText = searchBox.value;
    var url = "http://www.google.com/search?q=" + searchText;
    window.open(url);
}


//make the search button clickable
searchBtn.addEventListener("click", search);

//main code of creating the cards
// Define the recipe data
const recipeData = {
    imageUrl: "https://assets.codepen.io/17119/anna-tukhfatullina-food-photographer-stylist-Mzy-OjtCI70-unsplash.jpg",
    dishType: "עיקרי",
    cookTime: "2.5hrs",
    title: "Delicious Cake with Pistachio and Raspberries"
};

// Get the container element for the recipe cards
const recipeCardContainer = document.getElementById("cardContainer");

init();

function init(){
    for (let i = 0; i < 10; i++) {
        createRecipeCard(recipeData);
    }
}


// Create a new recipe card element and set its innerHTML
function createRecipeCard(recipe) {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
    <figure>
      <img src="${recipe.imageUrl}" alt="Cover image" />
    </figure>
  
    <div class="card-meta">
      <p class="dish-type">${recipe.dishType}</p>
  
      <ul class="dish-stats">
        <li>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2C4.6875 2 2 4.6875 2 8C2 11.3125 4.6875 14 8 14C11.3125 14 14 11.3125 14 8C14 4.6875 11.3125 2 8 2Z" stroke-miterlimit="10"/>
            <path d="M8 4V8.5H11" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          ${recipe.cookTime}
        </li>
      </ul>
    </div>
  
    <h2>${recipe.title}</h2>
  `;

    // Add the recipe card to the container
    recipeCardContainer.appendChild(recipeCard);
}