//let user = JSON.parse(localStorage.users).
//    find(user => user.username === localStorage.currentUser);

let input = document.getElementById("image");
let imageName = document.getElementById("imageName");

input.addEventListener("change", ()=>{
    let inputImage = document.querySelector("input[type=file]").files[0];

    imageName.innerText = inputImage.name;
});

let indexRecipe = 1;
let recipe = {name: 'פסטה עם נקניקיות',
image: 'https://www.10dakot.co.il/wp-content/uploads/2022/08/%E2%80%8F%E2%80%8FDSC_0010-%D7%A2%D7%95%D7%AA%D7%A7.jpg',
category: ['chicken', 'extras'], preptime: 10, cooktime: 30, doses: '4-5', 
kind: ['בשרי'], component: ['חבילת נקניקיות חתוכות (כל נקניקיה יש לחתוך ל-5 פרוסות)',
'חבילת פסטה מסוג ‘ספגטי’ (500 גרם)', '5-6 שיני שום קצוצות', '6 כפות מלאות רסק עגבניות',
'7 כוסות (1.7 ליטר) מים רותחים', 'כף רוטב פסטו מוכן או כפית אורגנו מיובש', 
'כפית פפריקה מתוקה', 'כפית פפריקה חריפה (לא חובה)', 'כפית וחצי מלח', 'מעט פלפל שחור'],
preparation: 'מחממים סיר סוטאז’ או סיר רחב (עם ציפוי שאינו נדבק) עם 2 כפות שמן ומטגנים את השום הקצוץ על אש בינונית-נמוכה במשך כדקה (שימו לב לא לשרוף אותו!).\n\nמוסיפים רסק עגבניות, 7 כוסות מים, כף פסטו ומתבלים בפפריקה, מלח ופלפל שחור. מערבבים על אש בינונית-גבוהה במשך כ-3 דקות.\n\nמצמידים חבילה של 6 מקלות ספגטי ומשחילים לתוכה פרוסת נקניקייה (אפשר לוותר על שלב זה ולהוסיף את הנקניקיות בנפרד).\n\nמוסיפים את הפסטה והנקניקיות לרוטב ומערבבים. מבשלים על אש בינונית-נמוכה במשך 25 דקות (חשוב: כל 5 דקות יש להרים את המכסה ולערבב. בהתחלה מערבבים עם כף עץ ואח”כ עם מזלג, כדי להפריד את הספגטי).\n\nלאחר 25 דקות, מכבים את האש ומשאירים את הסיר מכוסה 5 דקות.',
notes: '*אם במהלך הבישול ראיתם שהפסטה יבשה וחסרים נוזלים יש להוסיף עוד מים לפי הצורך.'
};

setRecipe(recipe);

//add input element for additional component
function addComponent() {
    let temp = document.getElementsByTagName("template")[0];
    let clon = temp.content.cloneNode(true);
    let parent = temp.parentElement;
    let button = document.getElementById('add-btn');
    parent.insertBefore(clon, button);
    button.previousElementSibling.firstElementChild.focus(); //new input focus
}

//set exist recipe in the document to update the recipe
function setRecipe(recipe) {
    console.log(JSON.stringify(recipe));
    document.title = "עדכון " + recipe.name;
    document.querySelector('h1').textContent = "עדכון מתכון";
    for (let prop in recipe) {
        if (prop === "date" || prop === "creator") {
            continue;
        }
        if (prop === "image") {
            imageName.textContent = recipe.image.split('/').slice(-1);
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
                let temp = document.getElementsByTagName("template")[0];
                let clon = temp.content.cloneNode(true);
                let button = document.getElementById('add-btn');
                temp.parentElement.insertBefore(clon, button);
                button.previousElementSibling.firstElementChild.value = c;
            }
        } else {
            document.getElementById(prop).value = recipe[prop];
        }
    }
    document.querySelector('form button[type=submit]').textContent = "עדכון המתכון";
}

/**
 * add or update the recipe in the data base
 * @returns whether to submit
 */
function addUpdateRecipe() {
    let name = document.getElementById('name').value;
    let image = input.files?.[0];
    if (!image) {
        if (!recipe) {
            alert('יש לבחור תמונה');
            return false;
        } else {
            image = recipe.image;
        }
    } else {
        image = URL.createObjectURL(image);
    }
    let category = [];
    let categories = document.getElementsByName('category');
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].checked) {
            category[i].push(categories[i].value);
        }
    }
    let preptime = document.getElementById('preptime').value;
    let cooktime = document.getElementById('cooktime').value;
    let doses = document.getElementById('doses').value;
    let kind = [];
    let kinds = document.getElementById('kind').getElementsByTagName('option');
    for (let i = 0; i < kinds.length; i++) { 
        if (kinds[i].selected === 'selected') {
            kind[i].push(kinds[i].value);
        }
    }
    let component = [];
    let c = document.getElementsByName('component');
    for (let i = 0; i < c.length; i++) {
        component[i].push(c[i].value);
    }
    let preparation = document.getElementById('preparation').value;
    let notes = document.getElementById('notes').value;

    let newRecipe = {
        creator: user.username,
        date: new Date().getTime(),
        name, image, category, preptime, cooktime, doses, kind,
        component, preparation, notes
    }
    const request = new FXMLHttpRequest();
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status === 422) {
                alert('שם המתכון כבר קיים במאגר, שנו אותו');
            } else if (request.status === 200 || request.status === 201) {
                alert('המתכון ' + request.status === 200? 'עודכן': 'התווסף' + ' בהצלחה');
                location.href = 'index.html';
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