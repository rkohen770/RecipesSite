class FXMLHttpRequest {
    constructor() {
        this.onload = () => {};
        this.onreadystatechange = () => {};
        this.readyState = 0;
        this.DB = new DataBase();
    }

    open(method, url, async = true, user = "", psw = "") {
        this.readyState = 1;
        this.onreadystatechange();
        this._method = method;
        this._url = url;
        this._async = async;
        this._user = user;
        this._psw = psw;
    }

    send(string = null) {
        if (string === null && (method === 'POST' || method === 'PUT')) {
            console.assert('יש לשלוח מחרוזת לשליחה');
        }
        //the function to do on send
        let toDo = () => {
            this.readyState = 2;
            this.onreadystatechange();
            let user;
            this.readyState = 3;
            this.onreadystatechange();
            //find user
            if (this._user) {
                let users = JSON.parse(localStorage.users);
                user = users.find(u => u.username === user);
                if (user?.pwd !== this._psw) {
                    this.status = 401;
                    this.statusText = "Unauthorized";
                    this.readyState = 4;
                    this.onreadystatechange();
                    return;
                }
            }
            if (!user && this._method !== 'GET') {
                this.status = 403;
                this.statusText = "Forbidden";
                this.readyState = 4;
                this.onreadystatechange();
                return;
            }

            let res;
            switch(this._method) {
                case 'GET': //get the recipe/s
                    let recipes = this._getRecipes();
                    if(!recipes) break;
                    if (recipes.type === 'all') { //get all of the recipes
                        res = this.DB.getRecipes();
                    } else if (recipes.type === 'category') { //get recipes in category
                        res = this.DB.getRecipes(recipe => recipe.category === recipes.data);
                    } else { //get one recipe
                        res = this.DB.getRecipe(recipes.data);
                    }
                    break;
                case 'POST': //add a recipe
                    recipes = this._getRecipes();
                    if(!recipes) break;
                    if (recipes.type === 'all') {
                        res = this.DB.addRecipe(recipes.data, string);
                    } else {
                        this.status = 409;
                        this.statusText = "Conflict";
                    }
                    break;
                case 'PUT': //update a recipe
                    recipes = this._getRecipes();
                    if(!recipes) break;
                    if (recipes.type === 'recipe') {
                        res = this.DB.updateRecipe(recipes.data, string);
                    } else {
                        this.status = 409;
                        this.statusText = "Conflict";
                    }
                    break;
                case 'DELETE': // remove a recipe
                    recipes = this._getRecipes();
                    if(!recipes) break;
                    if (recipes.type === 'recipe') {
                        res = this.DB.removeRecipe(recipes.data);
                    } else {
                        this.status = 422;
                        this.statusText = "Unprocessable Entity";
                    }
                    break;
                default:
                    this.status = 405;
                    this.statusText = "Method Not Allowed";
            }

            if (res) {
                if (res !== true) {
                    this.responseText = JSON.stringify(res);
                }
                if (this.method === 'POST') {
                    this.status = 201;
                    this.statusText = 'Created';
                } else {
                    this.status = 200;
                    this.statusText = 'OK';
                }
            } else if (this.method === 'POST') {
                this.status = 422;
                this.statusText = "Unprocessable Entity";
            } else {
                this.status = 404;
                this.statusText = "Not Found";
            }
            this.readyState = 4;
            this.onreadystatechange();
            if (res) this.onload();
        }

        if(this._async) {
            setTimeout(toDo, 0);
        } else {
            toDo();
        }
    }

    _getRecipe() {
        let recipes = null;
        let url = this._url.split('/');
        if (url[0] === '' && url[1] === 'recipes') {
            if (url.length === 2) {
                recipes = {type: 'all', data: ''};
            } else if (url[2] === 'category') {
                if (url.length === 4) {
                    recipes = {type: 'category', data: url[3]}
                }
            } else if(!isNaN(url[2]) && url.length === 3) {
                recipes = {type: 'recipe', data: url[2]};
            }
        }
        return recipes;
    }
}