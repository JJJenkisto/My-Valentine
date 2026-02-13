const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.querySelector(".buttons");
const finalText = document.querySelector(".final-text");
const bounce = document.querySelector(".bouncy-img");

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

    const myImgs = ["GFnMe1.jpg", "GFnMe2.jpg", "GFnMe3.jpg", "GFnMe4.jpg", "GFnMe5.jpg"];

    setTimeout(()=> {
        myImgs.forEach((filename) => {
            setTimeout(()=> {
                let newImg = document.createElement("img");
                newImg.src = filename;
                newImg.classList.add("bouncer");
                document.body.appendChild(newImg);
                DVDanim(newImg);                     
                }, 300);   
        });
    }, 2000);
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

function DVDanim(el) {
    // 1. Give them random starting positions inside the window
    let x = Math.random() * (window.innerWidth - 150);
    let y = Math.random() * (window.innerHeight - 150);
    
    // 2. Randomize initial direction so they don't all fly the same way
    let vx = (Math.random() > 0.5 ? 4 : -4);
    let vy = (Math.random() > 0.5 ? 4 : -4);

    function animate() {
        x += vx;
        y += vy;

        const imgW = el.clientWidth;
        const imgH = el.clientHeight;
        const winW = window.innerWidth;
        const winH = window.innerHeight;

        // --- Horizontal Bounce (X-axis) ---
        if (x + imgW >= winW) {
            vx *= -1;
            x = winW - imgW; // Nudge back inside right wall
        } else if (x <= 0) {
            vx *= -1;
            x = 0; // Nudge back inside left wall
        }

        // --- Vertical Bounce (Y-axis) ---
        if (y + imgH >= winH) {
            vy *= -1;
            y = winH - imgH; // Nudge back inside bottom wall
        } else if (y <= 0) {
            vy *= -1;
            y = 0; // Nudge back inside top wall
        }

        // Apply movement using fixed positioning
        el.style.left = "0px";
        el.style.top = "0px";
        el.style.transform = `translate(${x}px, ${y}px)`;

        requestAnimationFrame(animate);
    }
    animate();
}