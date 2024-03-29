function initHeader() {
    if (!localStorage.currentUser) {
        document.getElementById("my-recipes").style.display = "none";
        document.getElementById("logout").style.display = "none";
        document.getElementById("add-recipe").style.display = "none";
    } else {
        document.getElementById("login").style.display = "none";
        document.getElementById("profile").textContent = JSON.parse(localStorage.currentUser).username;
    }
}
initHeader();
document.getElementById("logout-link").addEventListener('click', () => {
    // <-- remove user name from local storege -->
    localStorage.removeItem('currentUser');
    location.href = 'spa.html';
})




