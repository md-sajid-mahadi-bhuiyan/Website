// =========================
// TYPING EFFECT
// =========================

const typingText = document.querySelector(".typing-text");

const words = [
    "AI Automation Developer",
    "n8n Workflow Expert",
    "AI Systems Builder",
    "Automation Specialist"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect(){

    const currentWord = words[wordIndex];

    if(!isDeleting){

        typingText.textContent =
        currentWord.substring(0,charIndex + 1);

        charIndex++;

        if(charIndex === currentWord.length){

            isDeleting = true;

            setTimeout(typeEffect,1500);

            return;

        }

    }else{

        typingText.textContent =
        currentWord.substring(0,charIndex - 1);

        charIndex--;

        if(charIndex === 0){

            isDeleting = false;

            wordIndex++;

            if(wordIndex === words.length){

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect,isDeleting ? 60 : 100);

}

typeEffect();



// =========================
// ACTIVE NAVIGATION
// =========================

const navLinks =
document.querySelectorAll(".nav-links a");

navLinks.forEach(link=>{

    link.addEventListener("click",function(){

        navLinks.forEach(nav=>
            nav.classList.remove("active")
        );

        this.classList.add("active");

    });

});


// =========================
// SCROLL REVEAL ANIMATION
// =========================

const revealElements = document.querySelectorAll(
    ".about-left, .skill-card, .stat-card"
);

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                "translateY(0px)";

            }

        });

    },
    {
        threshold:0.2
    }
);

revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform = "translateY(40px)";

    element.style.transition =
    "all 0.8s ease";

    revealObserver.observe(element);

});

// =========================
// SERVICES SCROLL ANIMATION
// =========================

const serviceCards =
document.querySelectorAll(".service-card");

const serviceObserver =
new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                "translateY(0px)";

            }

        });

    },
    {
        threshold:0.15
    }
);

serviceCards.forEach((card,index)=>{

    card.style.opacity = "0";

    card.style.transform =
    "translateY(40px)";

    card.style.transition =
    `all 0.7s ease ${index * 0.08}s`;

    serviceObserver.observe(card);

});

// =========================
// MOUSE GLOW EFFECT
// =========================

serviceCards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect =
        card.getBoundingClientRect();

        const x =
        e.clientX - rect.left;

        const y =
        e.clientY - rect.top;

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);

    });

});

// =========================
// SERVICES PARALLAX EFFECT
// =========================

window.addEventListener("scroll",()=>{

    const cards =
    document.querySelectorAll(".service-card");

    const scrollY = window.scrollY;

    cards.forEach((card,index)=>{

        const speed =
        (index % 3) * 0.02;

        card.style.transform =
        `translateY(${scrollY * speed * 0.08}px)`;

    });

});

// =========================
// CONTACT SCROLL ANIMATION
// =========================

const contactCards =
document.querySelectorAll(".contact-card");

const contactObserver =
new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";

            entry.target.style.transform =
            "translateY(0px)";

        }

    });

},{
    threshold:0.15
});

contactCards.forEach((card,index)=>{

    card.style.opacity = "0";

    card.style.transform =
    "translateY(40px)";

    card.style.transition =
    `all 0.7s ease ${index * 0.1}s`;

    contactObserver.observe(card);

});

// =========================
// PROJECT SHOWCASE ANIMATION
// =========================

const projectShowcase =
document.querySelector(".project-showcase");

const projectObserver =
new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";

            entry.target.style.transform =
            "translateY(0px)";

        }

    });

},{
    threshold:0.2
});

projectShowcase.style.opacity = "0";

projectShowcase.style.transform =
"translateY(50px)";

projectShowcase.style.transition =
"all 0.9s ease";

projectObserver.observe(projectShowcase);

function scrollToSection(sectionId) {

    const element =
    document.getElementById(sectionId);

    if(element){

        const navHeight = 100;

        const elementPosition =
        element.getBoundingClientRect().top;

        const offsetPosition =
        elementPosition +
        window.pageYOffset -
        navHeight;

        window.scrollTo({

            top: offsetPosition,

            behavior: "smooth"

        });

    }

}

/* ========================= */
/* CUSTOM CURSOR */
/* ========================= */

const cursor =
document.querySelector(".custom-cursor");

const cursorDot =
document.querySelector(".cursor-dot");

window.addEventListener("mousemove",(e)=>{

    cursor.style.left = e.clientX + "px";

    cursor.style.top = e.clientY + "px";

    cursorDot.style.left = e.clientX + "px";

    cursorDot.style.top = e.clientY + "px";

});

/* ========================= */
/* HOVER EFFECT */
/* ========================= */

const hoverElements =
document.querySelectorAll(
"a, button, .service-card, .project-card"
);

hoverElements.forEach((item)=>{

    item.addEventListener("mouseenter",()=>{

        cursor.classList.add("hover-active");

    });

    item.addEventListener("mouseleave",()=>{

        cursor.classList.remove("hover-active");

    });

});