let recipePage = document.getElementById('recipe');
recipePage.addEventListener('show', (ev) => {
    let nameRecipe =  recipePage.getAttribute('data-recipe');
    recipe = getRecipe(nameRecipe);
    initializeRecipe(recipe);
    let editBtns = document.getElementsByClassName('edit');
    if (!user || recipe.creator !== user.username) {
        for (let i = 0; i < editBtns.length; i++) {
            editBtns[i].style.display = 'none';
        }
    } else {
        for (let i = 0; i < editBtns.length; i++) {
            if (editBtns[i].classList.contains('delete')) {
                editBtns[i].addEventListener('click', removeRecipe);
            } else {
                editBtns[i].setAttribute('data-recipe', nameRecipe);
                editBtns[i].firstElementChild.setAttribute('data-recipe', nameRecipe);
            }
            editBtns[i].style.display = 'inline-block'
        }
    }
});

//initialize a recipe in the document
function initializeRecipe(recipe) {
    document.title = recipe.name;
    document.querySelector('#recipe h1').textContent = recipe.name;
    document.getElementById('image-recipe').src = recipe.image;
    let headerCols = document.querySelectorAll('.recipes__header-col span');
    headerCols[0].textContent = setTime(recipe.preptime);
    headerCols[1].textContent = setTime(recipe.cooktime);
    headerCols[2].textContent = recipe.doses;
    headerCols[3].textContent = recipe.kind.join('/');
    document.querySelector('#component p').innerHTML = recipe.component.join('<br>');
    document.querySelector('#preparation-recipe p').innerHTML = recipe.preparation.replaceAll('\n', '<br>');
    if (recipe.notes) {
        document.querySelector('#notes-recipe p').innerHTML = recipe.notes.replace('\n', '<br>');
        document.getElementById('notes-recipe').style.display = 'block';
    } else {
        document.getElementById('notes-recipe').style.display = 'none';
    }
}

function removeRecipe() {
    let ok = confirm('לאחר המחיקה, המתכון ימחק לצמיתות.\nהאם אתם בטוחים שאתם רוצים למחוק את המתכון?');
    if(ok) {
        let httpReq = new FXMLHttpRequest();
        httpReq.open('DELETE', '/api/recipes/' + indexRecipe, true, user.username, user.pwd);
        httpReq.send();
        httpReq.onreadystatechange = () => {
            if(httpReq.readyState === 4) {
                if (httpReq.status === 200) {
                    alert('המתכון נמחק בהצלחה');
                    location.href = 'spa.html';
                } else {
                    alert('המחיקה נכשלה');
                }
            }
        }
    }
}