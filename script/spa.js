const app = {
    pages: [],
    show: new Event('show'),
    init: function(){
        app.pages = document.querySelectorAll('.page');
        app.pages.forEach((pg)=>{
            pg.addEventListener('show', app.pageShown);
        })
        
        document.querySelectorAll('.link').forEach((link)=>{
            link.addEventListener('click', app.pageLink);
        })
        history.replaceState({}, 'home-page', '#home-page');
        window.addEventListener('popstate', app.poppin);
    },
    pageLink: function(ev){
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');
        let elementPage = document.getElementById(currentPage);
        if(currentPage === 'home-page') {
            let category = ev.target.getAttribute('data-category');
            elementPage.setAttribute('data-category', category);
            currentPage += '/' + category;
        } else if(currentPage !== 'sign-in-up') {
            let recipe = ev.target.getAttribute('data-recipe');
            elementPage.setAttribute('data-recipe', recipe);
            currentPage += '/' + recipe;
        }
        document.querySelector('.active').classList.remove('active');
        elementPage.classList.add('active');
        console.log(currentPage)
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(currentPage).dispatchEvent(app.show);
    },
    pageShown: function(ev){
        console.log('Page', ev.target.id, 'just shown');
    },
    poppin: function(ev){
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#' ,'').split('/');
        document.querySelector('.active').classList.remove('active');
        let page = document.getElementById(hash[0]);
        page.classList.add('active');
        if (hash[0] === 'home-page') {
            page.setAttribute('data-category', hash[1]);
        } else if (hash[0] !== 'sign-in-up') {
            page.setAttribute('data-recipe', hash[1]);
        }
        console.log(hash[0] + (hash[1]? '/'+hash[1]:''));
        //history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(hash).dispatchEvent(app.show);
    }
}

document.addEventListener('DOMContentLoaded', app.init);