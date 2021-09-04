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