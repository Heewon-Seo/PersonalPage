SC.initialize({
    client_id: "b8f06bbb8e4e9e201f9e6e46001c3acb",
});

const playBtn = document.querySelector("#play");
const pauseBtn = document.querySelector("#pause");
let stream;
playBtn.addEventListener('click',playTrack);
pauseBtn.addEventListener('click',pauseTrack);
// /tracks/147178584

function playTrack(e) {
    e.preventDefault();
    if(!stream) {
        SC.stream("/tracks/147178584", function(sound){
            stream = sound;
            stream.setVolume(10);
            stream.play();
            playBtn.style.color = "grey";
            pauseBtn.style.color = "white";
        });
    }
    else {
        stream.setVolume(10);
        stream.play();
        playBtn.style.color = "grey";
        pauseBtn.style.color = "white";
    }
}


function pauseTrack(e) {
    e.preventDefault();
    if(stream) {
        stream.pause();
        playBtn.style.color = "white";
        pauseBtn.style.color = "grey";
    }
}
