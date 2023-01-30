class DataBase {
    constructor() {
        this.recipes = localStorage.users? JSON.parse(localStorage.users) : [];
    }

    getRecipes(filter = recipe => true) {
        return [];
    }

    getRecipe(index) {
        return {};
    }

    addRecipe(index, recipe) {
        return true;
    }

    updateRecipe(index, recipe) {
        return true;
    }

    removeRecipe(index) {
        return true;
    }
}