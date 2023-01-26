if (localStorage.currentUser === undefined) {
    document.getElementById("my-recipes").style.display = "none";
    document.getElementById("logout").style.display = "none";
} else {
    document.getElementById("login").style.display = "none";
    document.getElementById("logout-link").addEventListener('click', () => {
        localStorage.removeItem('currentUser');
    })
}