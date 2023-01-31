class DataBase {
    constructor() {
        this.recipes = localStorage.users? JSON.parse(localStorage.users) : [];
    }

    //return all the recipes
    getRecipes() {
        return this.recipes;
    }

    //return the recipe in the index
    getRecipe(index) {
        return this.recipes[index];
    }

    //add the recipe (string json)
    //return whether the addition was successful
    addRecipe(recipe) {
        recipe = JSON.parse(recipe);
        //make sure the name doesn't exist
        if (this.recipes.some(r => r.name === recipe.name)) return false;
        this.recipes.push(recipe);
        localStorage.users = JSON.stringify(this.recipes);
        return true;
    }

    //update the recipe (string json) in the index
    //return whether the update was successful
    updateRecipe(index, recipe) {
        recipe = JSON.parse(recipe);
        //make sure there is a recipe in the index
        if (!this.recipes[index]) return false;
        this.recipes[index] = recipe;
        localStorage.users = JSON.stringify(this.recipes);
        return true;
    }

    //return the index of the recipe with the recieved name
    //if not exist, return -1
    findRecipe(recipe) {
        return this.recipes.findIndex(r => r.name === recipe);
    }

    //remove the recipe in the index
    //return whether the removing was successful
    removeRecipe(index) {
        //make sure there is a recipe in the index
        if (!this.recipes[index]) return false;
        this.recipes.splice(index, 1);
        localStorage.users = JSON.stringify(this.recipes);
        return true;
    }
}