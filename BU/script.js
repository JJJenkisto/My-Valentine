const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.querySelector(".buttons");
const finalText = document.querySelector(".final-text");

envelope.addEventListener("click", (e) => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout(() => {
       document.querySelector(".letter-window").classList.add("open"); 
    }, 50);
});



let yesScale = 1;

let isRunning = false;

yesBtn.style.position = "relative";
yesBtn.style.transformOrigin = "center center";
yesBtn.style.transition = "transform 0.3s ease";

noBtn.addEventListener ("click", (e) => {
    yesScale += 2;
    
    title.textContent = "WHAT!?";

    yesBtn.style.position = "fixed";
    yesBtn.style.top = "50%";
    yesBtn.style.left = "50%"
    yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;

    if (yesScale >= 6 && !isRunning) {
        isRunning = true;        
        startRunning();
        noBtn.addEventListener("mouseover", startRunning);
    }
});

yesBtn.addEventListener("click", (e) => {
    title.textContent = "Yay!!!";
    catImg.src = "cat_dance.gif";
    document.querySelector(".letter-window").classList.add("final");
    buttons.style.display = "none";
    finalText.style.display = "block"; 
});

function startRunning() {
    noBtn.style.zIndex = "99";
    noBtn.style.position = "relative";
    const distance = Math.random() * 200 + 100;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;        
}