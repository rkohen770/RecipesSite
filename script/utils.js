let indexRecipe = 0;
let recipe = null;
let user = localStorage.currentUser? JSON.parse(localStorage.currentUser): null;

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
            m = "";
        } else if (m === 1) {
            m = " ודקה";
        } else if (m === 15) {
            m = " ורבע";
        } else if (m === 30) {
            m = " וחצי";
        } else {
            m = ` ו-${m} דקות`;
        }
        return h + m;
    } else {
        if (minutes === 1) {
            return "דקה";
        }
        if (minutes === 15) {
            return "רבע שעה";
        }
        if (minutes === 30) {
            return "חצי שעה";
        }
        return minutes + " דקות";
    }
}

//return the recipe with the recived name
function getRecipe(nameRecipe) {
    let req = new FXMLHttpRequest();
    req.open('GET', '/api/recipes/' + nameRecipe, false);
    req.send();
    if (req.status === 404) {
        alert("המתכון לא נמצא");
        location.href = 'spa.html';
    } else if (req.status === 200) {
        indexRecipe = req.responseText;
        req.open('GET', '/api/recipes/' + indexRecipe, false);
        req.send();
        return JSON.parse(req.responseText);
    }
}