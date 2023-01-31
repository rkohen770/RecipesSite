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
            //guest can get only
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
                    if (recipes.type === 'recipes') { //get all of the recipes
                        res = this.DB.getRecipes();
                    } else if(recipes.type === 'recipe') { //get one recipe
                        res = this.DB.getRecipe(recipes.data);
                    } else {//get index of recipe
                        res = this.DB.findRecipe(recipes.data);
                    }
                    break;
                case 'POST': //add a recipe
                    recipes = this._getRecipes();
                    if(!recipes) break;
                    if (recipes.type === 'recipes') {
                        res = this.DB.addRecipe(string);
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

            if (res) {//the request was success
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
            } else if (this.method === 'POST') { //the request failed
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
        if (url[0] === '' && url[1] === 'api'){
            if (url[2] === 'recipes') {
                if (url.length === 3) {
                    recipes = {type: 'recipes', data: ''};
                } else if(url.length === 4) {
                    if (!isNaN(url[3])) {
                        recipes = {type: 'recipe', data: Number(url[3])};
                    } else {
                        recipes = {type: 'find-recipe', data: url[3]};
                    }
                }
            }
        }
        return recipes;
    }
}