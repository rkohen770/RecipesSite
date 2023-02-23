function initHeader() {
    if (!localStorage.currentUser) {
        //document.getElementById("login").style.display = "block";
        document.getElementById("my-recipes").style.display = "none";
        document.getElementById("logout").style.display = "none";
        document.getElementById("add-recipe").style.display = "none";
    } else {
        document.getElementById("login").style.display = "none";
        document.getElementById("profile").textContent = JSON.parse(localStorage.currentUser);
        //document.getElementById("logout").style.display = "block";
        //document.getElementById("my-recipes").style.display = "block";   
    }
}
initHeader();
document.getElementById("logout-link").addEventListener('click', () => {
    // <-- remove user name from local storege -->
    localStorage.removeItem('currentUser');
    //location.href = "../html/home_page.html";
    location.reload();
})




