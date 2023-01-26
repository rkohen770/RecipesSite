
/*let recipe = {creator: 'tchelet',
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
};

initializeRecipe(recipe);
if (recipe.creator !== localStorage.currentUser) {
    document.querySelector('.edit').style.display = 'none';
}*/

//initialize a recipe in the document
function initializeRecipe(recipe) {
    document.title = recipe.name;
    document.querySelector('h1').textContent = recipe.name;
    document.getElementById('image').src = recipe.image;
    let headerCols = document.querySelectorAll('.recipes__header-col span');
    headerCols[0].textContent = setTime(recipe.preptime);
    headerCols[1].textContent = setTime(recipe.cooktime);
    headerCols[2].textContent = recipe.doses;
    headerCols[3].textContent = recipe.kind.join('/');
    document.querySelector('#component p').innerHTML = recipe.component.join('<br>');
    document.querySelector('#preparation p').innerHTML = recipe.preparation.replaceAll('\n', '<br>');
    if (recipe.notes) {
        document.querySelector('#notes p').innerHTML = recipe.notes.replace('\n', '<br>');
    } else {
        document.getElementById('notes').style.display = 'none';
    }
}

//convert number of minutes to apropriate time string
function setTime(minutes) {
    if (minutes >= 60) {
        let m = minutes % 60;
        let h = (minutes - m) / 60;
        if (h === 1) {
            h = "שעה";
        } else if (h === 2) {
            h = "שעתיים";
        } else {
            h = h + " שעות";
        }
        if (m === 0) {
            m = ""
        } else if (m === 15) {
            m = " ורבע";
        } else if (m === 30) {
            m = " וחצי";
        } else {
            m = ` ו-${m} דקות`;
        }
        return h + m;
    } else {
        if (minutes === 15) {
            return "רבע שעה";
        } 
        if (minutes === 30) {
            return "חצי שעה";
        }
        return minutes + " דקות";
    }
}