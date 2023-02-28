const dataCardTemplate = document.querySelector("[data-recipe-template]")
const cardContainer = document.querySelector("[data-card-container]")
let list_of_recipes = [];
let categories = {chicken: 'עוף ובשר', extras: 'תוספות', soups: 'מרקים',
 fish: 'דגים', pies: 'פשטידות', salads: 'סלטים', pastries: 'לחמים ומאפים'};

//  <================= Create Cards =================>
document.getElementById('home-page').addEventListener('show', init);
init();

function init() {
    list_of_recipes = [];
    document.title = "מתכונים";
    cardContainer.innerHTML = "";
    category = document.getElementById('home-page').getAttribute('data-category');
    let h1 = document.querySelector('#home-page h1');
    if (category === 'my') {
        h1.textContent = 'המתכונים שלי';
    } else if (category === 'new') {
        h1.textContent = 'מתכונים חדשים';
    } else {
        h1.textContent = categories[category];
    }
    var recipeData = getRecipeData(category);
    console.log(recipeData);
    // Create a new recipe card element and set its innerHTML
    for (let i = 0; i < recipeData.length; i++) {
        createRecipeCard(recipeData[i]);
    }
}

// Create a new recipe card element and set its innerHTML
function createRecipeCard(recipe) {
    const recipeCard = dataCardTemplate.content.cloneNode(true);
    recipeCard.querySelector("[data-image]").src = recipe.image;
    recipeCard.querySelector("[data-dish]").textContent = recipe.kind.join('/');
    recipeCard.querySelector("[data-time]").textContent = setTime(recipe.cooktime + recipe.preptime);
    recipeCard.querySelector("[data-name]").textContent = recipe.name;
    cardContainer.appendChild(recipeCard);
    cardContainer.lastElementChild.setAttribute('data-recipe', recipe.name);
    let recipeCardElement = cardContainer.lastElementChild;
    list_of_recipes.push({ name: recipe.name, kind: recipe.kind, element: recipeCardElement });
    //add event listener to the card    
    recipeCardElement.addEventListener("click", function (ev) {
        //window.location.href = "recipe.html";
        app.pageLink(recipeCardElement, ev);
    });
}

//get the recipe data from the server


function getRecipeData(category = 'all') {
    var Data = null;
    var fxhr = new FXMLHttpRequest();
    fxhr.open("GET", "/api/recipes", false);
    fxhr.send();
    if (fxhr.status == 200) {
        Data = JSON.parse(fxhr.responseText);
    }
    if(category === 'new') { //return the most new 12 recipes
        return Data.sort((r1, r2) => r2.date - r1.date).slice(0, 12);
    } else if (category === 'my') {
        return Data.filter(r => r.creator === user.username);
    } else if(category === 'all') {
        return Data;
    }
    return Data.filter(r => r.category.includes(category));
}

//   <=============== End Create Cards ===============>



//   <================= Search Bar =================>
const searchInput = document.querySelector("[data-search]")
const searchBtn = document.getElementById("searchBtn");

//add event listener to the search input
searchInput.addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
        search();
    }
});
searchBtn.addEventListener('click', search);

function search() {
    const searchValue = searchInput.value.toLowerCase();
    document.querySelector('#home-page h1').textContent = searchValue;
    cardContainer.innerHTML = "";
    getRecipeData('all').forEach((recipe) => {
        if( recipe.name.toLowerCase().includes(searchValue) || recipe.kind.every(k => k.toLowerCase().includes(searchValue))) {
            createRecipeCard(recipe);
        }
    });
}


//   <=============== End Search Bar ===============>