const dataCardTemplate = document.querySelector("[data-recipe-template]")
const cardContainer = document.querySelector("[data-card-container]")
let list_of_recipes = [];

//  <================= Create Cards =================>
init();

function init() {

    var recipeData = JSON.parse(getRecipeData());
    console.log(recipeData);
    // Create a new recipe card element and set its innerHTML
    for (let i = 0; i < recipeData.length; i++) {
        createRecipeCard(recipeData[i]);
    }
}

// Create a new recipe card element and set its innerHTML
function createRecipeCard(recipe) {
    const recipeCard = dataCardTemplate.content.cloneNode(true).children[0];
    recipeCard.querySelector("[data-image]").src = recipe.image;
    recipeCard.querySelector("[data-dish]").textContent = recipe.kind;
    recipeCard.querySelector("[data-time]").textContent = setTime(recipe.cooktime + recipe.preptime);
    recipeCard.querySelector("[data-name]").textContent = recipe.name;
    cardContainer.appendChild(recipeCard);
    list_of_recipes.push({ name: recipe.name, kind: recipe.kind, element: recipeCard });

    //add event listener to the card    
    recipeCard.addEventListener("click", function () {
        window.location.href = "recipe.html";
    });
}

//get the recipe data from the server


function getRecipeData() {
    var Data = null;
    var fxhr = new FXMLHttpRequest();
    fxhr.open("GET", "/api/recipes", false);
    fxhr.send();
    if (fxhr.status == 200) {
        Data = fxhr.responseText;
    }
    return Data;
}

//   <=============== End Create Cards ===============>



//   <================= Search Bar =================>
const searchInput = document.querySelector("[data-search]")
const searchBtn = document.getElementById("searchBtn");

//add event listener to the search input
searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value;
    list_of_recipes.forEach((recipe) => {
        const isVisible = recipe.name.includes(searchValue) ||
            recipe.kind[0].includes(searchValue);
        recipe.element.classList.toggle("hidden", !isVisible);
    });
});

//   <=============== End Search Bar ===============>