let input = document.getElementById("image");
let imageName = document.getElementById("imageName")

input.addEventListener("change", ()=>{
    let inputImage = document.querySelector("input[type=file]").files[0];

    imageName.innerText = inputImage.name;
})

function addComponent() {
    let temp = document.getElementsByTagName("template")[0];
    let clon = temp.content.cloneNode(true);
    let parent = temp.parentElement;
    let button = document.getElementById('add-btn');
    parent.insertBefore(clon, button);
    button.previousElementSibling.firstElementChild.focus(); //new input focus
}