
document.getElementById('add-update-recipe').addEventListener('show', (ev) => {
    if (!user) {
        alert('נא היכנסו לחשבונכם תחילה.');
        //location.href = 'sign_in_up.html';
        app.goToPage(document.getElementById('login'));
    }
    recipe = null;
    let nameRecipe = ev.target.getAttribute('data-recipe');
    if(nameRecipe) {        
        recipe = getRecipe(nameRecipe);
        clear();
        if(recipe) {
            setRecipe(recipe);
        }
    } else {
        clear();
    }
});


//add input element for additional component
function addComponent() {
    let temp = document.querySelector("#add-update-recipe template");
    let clon = temp.content.cloneNode(true);  
    let button = document.getElementById('add-btn');
    let parent = button.parentElement;
    parent.insertBefore(clon, button);
    button.previousElementSibling.firstElementChild.focus(); //new input focus
}

//clear the form for adding new recipe
function clear() {
    document.title = "הוספת מתכון";
    document.querySelector('#add-update-recipe h1').textContent = "הוספת מתכון";
    //reset all the inputs
    let inputs = document.querySelectorAll('#add-update-recipe input');
    for (let i of inputs) {
        if (i.type === "checkbox") {
            i.checked = false;
        } else if (i.type === "file") {
            i.files = null;
            imageName.textContent = "לא נבחרה תמונה"
        } else  {
            i.value = "";
        } 
    }

    //cencel all the selection of the kind
    let kind = document.getElementById('kind').getElementsByTagName('option');
    for (let i = 0; i < kind.length; i++) { 
        kind[i].selected = false;
    }

    //remove all the component
    let component = document.getElementsByName('component');
    let len = component.length;
    for (let i = 0; i < len; i++) { 
        component[0].parentElement.remove();
    }

    //reset all the text area
    let textArea = document.getElementsByTagName('textarea');
    for (let i = 0; i < textArea.length; i++) { 
        textArea[i].value = "";
    }
    document.querySelector('#add-update-recipe form button[type=submit]').textContent = "הוספת המתכון";
}

//set exist recipe in the document to update the recipe
function setRecipe(recipe) {
    console.log(JSON.stringify(recipe));
    document.title = "עדכון " + recipe.name;
    document.querySelector('#add-update-recipe h1').textContent = "עדכון מתכון";
    for (let prop in recipe) {
        if (prop === "date" || prop === "creator") {
            continue;
        } else if (prop === "category") {
            for (let category of recipe.category) {
                document.getElementById(category).checked = true;
            }
        } else if (prop === "kind") {
            let kind = document.getElementById('kind').getElementsByTagName('option');
            for (let i = 0; i < kind.length; i++) { 
                if (recipe.kind.includes(kind[i].value)) {
                    kind[i].selected = 'selected';
                }
            }
        } else if (prop === "component") {
            for (let c of recipe.component) {
                let temp = document.querySelector("#add-update-recipe template");
                let clon = temp.content.cloneNode(true);
                let button = document.getElementById('add-btn');
                button.parentElement.insertBefore(clon, button);
                button.previousElementSibling.firstElementChild.value = c;
            }
        } else {
            document.getElementById(prop).value = recipe[prop];
        }
    }
    document.querySelector('#add-update-recipe form button[type=submit]').textContent = "עדכון המתכון";
}

/**
 * add or update the recipe in the data base
 * @returns whether to submit
 */
function addUpdateRecipe() {
    let name = document.getElementById('name').value;
    let image = document.getElementById('image').value;
    //make sure there is component
    let c = document.getElementsByName('component');
    if(c.length === 0) {
        alert('יש להוסיף רכיבים');
        return false;
    }
    let category = [];
    let categories = document.getElementsByName('category');
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].checked) {
            category.push(categories[i].value);
        }
    }
    let preptime = Number(document.getElementById('preptime').value);
    let cooktime = Number(document.getElementById('cooktime').value);
    let doses = document.getElementById('doses').value;
    let kind = [];
    let kinds = document.getElementById('kind').getElementsByTagName('option');
    for (let i = 0; i < kinds.length; i++) { 
        if (kinds[i].selected) {
            kind.push(kinds[i].value);
        }
    }
    let component = [];
    for (let i = 0; i < c.length; i++) {
        component.push(c[i].value);
    }
    let preparation = document.getElementById('preparation').value;
    let notes = document.getElementById('notes').value;

    let newRecipe = {
        creator: user.username,
        name, image, category, preptime, cooktime, doses, kind,
        component, preparation, notes
    }
    if(recipe) {
        newRecipe.date = recipe.date;
    } else {
        newRecipe.date = new Date().getTime();
    }
    const request = new FXMLHttpRequest();
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status === 422) {
                alert('שם המתכון כבר קיים במאגר, שנו אותו');
            } else if (request.status === 200 || request.status === 201) {
                alert('המתכון ' + (request.status === 200? 'עודכן' : 'התווסף') + ' בהצלחה');
                //location.href = 'recipe.html';
                let submitBtn = document.querySelector('#add-update-recipe form button[type=submit]')
                submitBtn.setAttribute('data-recipe', name);
                app.goToPage(submitBtn);
            }
        }
    }
    if(recipe) {
        request.open('PUT', '/api/recipes/' + indexRecipe, true, user.username, user.pwd); 
    } else {
        request.open('POST', '/api/recipes',  true, user.username, user.pwd);
    }
    request.send(JSON.stringify(newRecipe));
    return false;
}