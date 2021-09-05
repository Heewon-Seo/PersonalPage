FontAwesomeConfig = { searchPseudoElements: true };

const home = document.getElementById("home");
const photo = document.getElementById("photo");
const homeLocation = document.querySelector("#intro").offsetTop;
const photoLocation = document.querySelector('#memories').offsetTop;

home.addEventListener('click',function (e) {
    e.preventDefault();
    window.scrollTo({top:homeLocation,behavior:'smooth'});
})

photo.addEventListener('click',function (e) {
    e.preventDefault();
    window.scrollTo({top:photoLocation,behavior:'smooth'});
})

window.scrollY;
document.scrollingElement.scrollTop;

window.addEventListener('scroll',()=>{
    let scrollLocation = document.documentElement.scrollTop;
    let windowHeight = window.innerHeight;
    const section = document.querySelector("#memories").scrollHeight;

    if(scrollLocation-section>400) {
        home.style.color = "#607d8b";
        photo.style.color = "#607d8b";
    } else {
        home.style.color = "#C8C6C6";
        photo.style.color = "#C8C6C6";
    }

});
