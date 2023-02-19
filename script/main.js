if (!localStorage.currentUser) {
    document.getElementById("my-recipes").style.display = "none";
    document.getElementById("logout").style.display = "none";
    document.getElementById("logout-link").style.display = "none";
    document.getElementById("profile").style.display = "none";
} else {
    document.getElementById("login").style.display = "none";
    document.getElementById("logout-link").addEventListener('click', () => {
        // <-- remove user name from local storege -->
        localStorage.removeItem('currentUser');
        location.href = "../html/home_page.html";

        // <-- remove user name from the hedder -->
        document.getElementById("profile").innerText = "";

    })
}




