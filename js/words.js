const balls = [];
const colors = [
    "-webkit-gradient(radial, 50% 50%, 36, 50% 50%, 40,from(rgba(150, 111, 195, 0.2)), color-stop(0.3, rgba(150, 111, 195, 0.3)),  to(transparent))",
    "-webkit-gradient(radial, 50% 50%, 16, 50% 50%, 20, from(rgba(224, 124, 203, 0.1)), color-stop(0.2, rgba(224, 124, 203, 0.2)), to(transparent))",
    "-webkit-gradient(radial, 50% 50%, 16, 50% 50%, 20, from(rgba(224, 124, 203, 0.1)), color-stop(0.2, rgba(224, 124, 203, 0.2)), to(transparent))",
    "-webkit-gradient(radial, 50% 50%, 38, 50% 50%, 46, from(rgba(145, 75, 113, 0.3)), color-stop(0.3, rgba(145, 75, 113, 0.4)),  to(transparent))",
    "-webkit-gradient(radial, 50% 50%, 20, 50% 50%, 80, from(rgba(145, 75, 113, 0)), color-stop(0.3, rgba(145, 75, 113, 0.2)),  to(transparent))",
    "-webkit-gradient(radial, 50% 50%, 30, 50% 50%, 90, from(rgba(145, 75, 113, 0)), color-stop(0.5, rgba(145, 75, 113, 0.2)), to(transparent))",
    "-webkit-gradient(radial, 50% 50%, 30, 50% 50%, 50, from(rgba(37, 85, 79, 0.2)), color-stop(0.2, rgba(37,85,79, 0.3)), to(transparent))",
    "-webkit-gradient(radial, 50% 50%, 16, 50% 50%, 20, from(rgba(37, 85, 79, 0.2)), color-stop(0.2, rgba(37,85,79, 0.3)), to(transparent))",
    "-webkit-radial-gradient(circle contain, rgba(150, 111, 195, 0.2) 36px, rgba(150, 111, 195, 0.3) 38px, transparent 40px)",
    "-webkit-radial-gradient(circle contain, rgba(224, 124, 203, 0.2) 16px, rgba(224, 124, 203, 0.3) 17px, transparent 20px)",
    "-webkit-radial-gradient(circle contain, rgba(224, 124, 203, 0.2) 16px, rgba(224, 124, 203, 0.3) 17px, transparent 20px)",
    "radial-gradient(circle contain, rgba(114, 209, 244, 0.2) 36px, rgba(114, 209, 244, 0.3) 37px, transparent 40px)",
    "radial-gradient(circle contain, rgba(224, 124, 203, 0.2) 16px, rgba(224, 124, 203, 0.3) 17px, transparent 20px)"
];
const ballBox = document.querySelector(".balls");
const word = document.querySelector("#input-text");
const basicWords = ["so what?","긍정적인","SMILE:D","열심히하는","Carpe Diem","INTP", "여행", "음악", "페스티벌", "덕질", "동물","언어","Besançon","東京"];
let words = [];
const savedWords = localStorage.getItem("words");
const button = document.querySelector(".submit");
const removeBtn = document.querySelector(".initialize");
const captureBtn = document.querySelector(".capture");

initWords();
moveBalls();

captureBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    document.querySelectorAll(".ball").forEach(value => {
        value.style.transform = "none";
    })
    html2canvas(document.querySelector('#capture')).then(function (canvas) {
        saveAs(canvas.toDataURL(), 'your-words.png');
    });
    document.querySelectorAll(".ball").forEach(value => {
        value.style.transform = `scale(${Math.random()})`;
    })
});

function saveAs(uri, filename) {
    let link = document.createElement('a');
    if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}



button.addEventListener("click",function (e) {
    e.preventDefault();
    console.log(word.value);
    if(word.value==="") {
        toastr.warning('내용을 입력해주세요');
        toastr.options.showEasing = 'easeOutBounce';
        toastr.options.preventDuplicates = true;
    } else {
        addBall();
        saveWords();
        moveBalls();
        word.value="";
        document.getElementById("output").innerText="";
    }
});

removeBtn.addEventListener('click',function (e) {
    e.preventDefault();
    removeWords();
    initWords();
})

function saveWords() {
    words.push(word.value);
    localStorage.setItem("words",JSON.stringify(words));
    word.value="";
}

function removeWords() {
    localStorage.removeItem("words");
    words = null;
    while (ballBox.hasChildNodes()) {
        ballBox.removeChild(ballBox.firstChild);
    }
}

function initWords() {
    if(savedWords!==null) {
        const saved = JSON.parse(savedWords);
        words = saved;
    } else {
        words = basicWords;
    }
}

function addBall () {
    let ball = document.createElement("div");
    ballBox.appendChild(ball);
    ball.classList.add("ball");
    ball.style.background = `${colors[Math.floor(Math.random()*colors.length)]}`;
    ball.style.left = `${Math.floor(Math.random() * 90)}%`;
    ball.style.top = `${Math.floor(Math.random() * 90)}%`;
    ball.style.transform = `scale(${Math.random()})`;
    ball.style.width = `${word.value.length*30}px`;
    ball.style.fontSize = `150%`
    ball.style.height = ball.style.width;
    ball.textContent = word.value;
    balls.push(ball);
}

if(words!==null) {
    for (let i = 0; i < words.length; i++) {
        let ball = document.createElement("div");
        ballBox.appendChild(ball);
        ball.classList.add("ball");
        ball.style.background = `${colors[Math.floor(Math.random()*colors.length)]}`;
        ball.style.left = `${Math.floor(Math.random() * 90)}%`;
        ball.style.top = `${Math.floor(Math.random() * 90)}%`;
        ball.style.transform = `scale(${Math.random()})`;
        ball.style.width = `${words[i].length*30}px`;
        ball.style.fontSize = `150%`
        ball.style.height = ball.style.width;
        ball.textContent = words[i];
        balls.push(ball);
    }
    moveBalls();
}



// Keyframes
function moveBalls () {
    balls.forEach((el, i, ra) => {
        let to = {
            x: Math.random() * (i % 2 === 0 ? -11 : 11),
            y: Math.random() * 12
        };

        let anim = el.animate(
            [
                { transform: "translate(0, 0)" },
                { transform: `translate(${to.x}rem, ${to.y}rem)` }
            ],
            {
                duration: (Math.random() + 1) * 2000, // random duration
                direction: "alternate",
                fill: "both",
                iterations: Infinity,
                easing: "ease-in-out"
            }
        );
    });

}


let input = document.getElementById('input-text');
let output = document.getElementById('output');
let label = document.querySelector('.input-wrapper label');

function lastWord(e){
    e = e || window.event;
    if (e.keyCode !== '8') {
        output.innerHTML = input.value.replace(/(.$)+$/, '<span class="zoom-letter">$1</span><span class="text-caret"></span>');
    } else {
        output.innerHTML = input.value + '<span class="text-caret"></span>';
    }
}

function validInput(){
    if (output.textContent.length >= 1){
        label.classList.add('input-text-valid');
        label.classList.remove('get-cozy');
    } else {
        label.classList.remove('input-text-valid');
        label.classList.add('get-cozy');
    }
}

function mouseAtEnd(){
    let strLength = input.value.length;
    input.setSelectionRange(strLength, strLength);
}

input.addEventListener('click', function(){
    mouseAtEnd();
    validInput();
});

input.addEventListener('keyup', function(e){
    lastWord();
    e = e || window.event;
    if (e.keyCode == '37' || e.keyCode == '38' || e.keyCode == '39' || e.keyCode == '40') {
        mouseAtEnd();
    }
    validInput();
});

output.addEventListener('click', function(){
    input.focus();
});

input.addEventListener('blur', validInput, false);
