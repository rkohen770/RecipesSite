let recipePage = document.getElementById('recipe');
recipePage.addEventListener('show', (ev) => {
    let nameRecipe =  recipePage.getAttribute('data-recipe');
    /*recipe = {creator: 'tchelet',
    date: new Date(),
        name: 'פסטה עם נקניקיות',
    image: 'https://www.10dakot.co.il/wp-content/uploads/2022/08/%E2%80%8F%E2%80%8FDSC_0010-%D7%A2%D7%95%D7%AA%D7%A7.jpg',
    category: ['chicken', 'extras'], preptime: 10, cooktime: 30, doses: '4-5', 
    kind: ['בשרי'], component: ['חבילת נקניקיות חתוכות (כל נקניקיה יש לחתוך ל-5 פרוסות)',
    'חבילת פסטה מסוג ‘ספגטי’ (500 גרם)', '5-6 שיני שום קצוצות', '6 כפות מלאות רסק עגבניות',
    '7 כוסות (1.7 ליטר) מים רותחים', 'כף רוטב פסטו מוכן או כפית אורגנו מיובש', 
    'כפית פפריקה מתוקה', 'כפית פפריקה חריפה (לא חובה)', 'כפית וחצי מלח', 'מעט פלפל שחור'],
    preparation: 'מחממים סיר סוטאז’ או סיר רחב (עם ציפוי שאינו נדבק) עם 2 כפות שמן ומטגנים את השום הקצוץ על אש בינונית-נמוכה במשך כדקה (שימו לב לא לשרוף אותו!).\n\nמוסיפים רסק עגבניות, 7 כוסות מים, כף פסטו ומתבלים בפפריקה, מלח ופלפל שחור. מערבבים על אש בינונית-גבוהה במשך כ-3 דקות.\n\nמצמידים חבילה של 6 מקלות ספגטי ומשחילים לתוכה פרוסת נקניקייה (אפשר לוותר על שלב זה ולהוסיף את הנקניקיות בנפרד).\n\nמוסיפים את הפסטה והנקניקיות לרוטב ומערבבים. מבשלים על אש בינונית-נמוכה במשך 25 דקות (חשוב: כל 5 דקות יש להרים את המכסה ולערבב. בהתחלה מערבבים עם כף עץ ואח”כ עם מזלג, כדי להפריד את הספגטי).\n\nלאחר 25 דקות, מכבים את האש ומשאירים את הסיר מכוסה 5 דקות.',
    notes: '*אם במהלך הבישול ראיתם שהפסטה יבשה וחסרים נוזלים יש להוסיף עוד מים לפי הצורך.'
    };*/
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