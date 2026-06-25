/* =========================================================
   MD Sajid Mahadi Bhuiyan — Portfolio Interactions
   Vanilla JS, no dependencies. Production-ready.
   ========================================================= */

/* -------- LOADER -------- */
(function loader(){
    const loader = document.getElementById('loader');
    const percentEl = loader && loader.querySelector('.loader-percent');
    if(!loader) return;
    document.body.classList.add('no-scroll');
    let p = 0;
    const tick = setInterval(()=>{
        p += Math.max(2, Math.round((100-p)*0.08));
        if(p>=100){p=100;clearInterval(tick)}
        if(percentEl) percentEl.textContent = p+'%';
    },60);
    window.addEventListener('load',()=>{
        setTimeout(()=>{
            loader.classList.add('done');
            document.body.classList.remove('no-scroll');
            setTimeout(()=>loader.remove(),1400);
        },1900);
    });
})();

/* -------- TYPING EFFECT -------- */
(function typing(){
    const el = document.querySelector('.typing-text');
    if(!el) return;
    const words = ["AI Automation Developer","n8n Workflow Expert","Zapier Workflow Expert","AI Systems Builder","Automation Specialist"];
    let w=0,c=0,del=false;
    function run(){
        const cur = words[w];
        el.textContent = cur.substring(0,c + (del?-1:1));
        c += del?-1:1;
        if(!del && c===cur.length){del=true;return setTimeout(run,1500)}
        if(del && c===0){del=false;w=(w+1)%words.length}
        setTimeout(run, del?50:95);
    }
    run();
})();

/* -------- SCROLL PROGRESS + NAV -------- */
(function scrollUI(){
    const bar = document.querySelector('.scroll-progress-bar');
    const nav = document.querySelector('.navbar');
    let lastY = 0;
    window.addEventListener('scroll',()=>{
        const y = window.scrollY;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        if(bar) bar.style.width = ((y/h)*100)+'%';
        if(nav){
            nav.classList.toggle('scrolled', y>40);
            nav.classList.toggle('hidden', y>lastY && y>200);
        }
        lastY = y;
    },{passive:true});
})();

/* -------- ACTIVE NAV + MOBILE MENU -------- */
(function nav(){
    const links = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = [...document.querySelectorAll('section[id]')];
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-links');

    links.forEach(a=>a.addEventListener('click',()=>{
        if(menu && menu.classList.contains('open')){menu.classList.remove('open');toggle.classList.remove('open')}
    }));
    toggle && toggle.addEventListener('click',()=>{
        menu.classList.toggle('open');toggle.classList.toggle('open');
    });

    window.addEventListener('scroll',()=>{
        const y = window.scrollY + 140;
        let current = sections[0]?.id;
        sections.forEach(s=>{if(s.offsetTop<=y) current=s.id});
        links.forEach(a=>a.classList.toggle('active', a.getAttribute('href')==='#'+current));
    },{passive:true});
})();

/* -------- SMOOTH SCROLL HELPER -------- */
function scrollToSection(id){
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
}

/* -------- SCROLL REVEAL (staggered) -------- */
(function reveal(){
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries)=>{
        entries.forEach((e,i)=>{
            if(e.isIntersecting){
                setTimeout(()=>e.target.classList.add('in'), i*60);
                io.unobserve(e.target);
            }
        });
    },{threshold:0.12,rootMargin:'0px 0px -60px 0px'});
    els.forEach(el=>io.observe(el));
})();

/* -------- COUNT-UP STATS -------- */
(function countUp(){
    const nums = document.querySelectorAll('[data-count]');
    const io = new IntersectionObserver(entries=>{
        entries.forEach(en=>{
            if(!en.isIntersecting) return;
            const el = en.target;
            const target = parseInt(el.dataset.count,10);
            let cur = 0;
            const step = Math.max(1, Math.ceil(target/40));
            const t = setInterval(()=>{
                cur += step;
                if(cur>=target){cur=target;clearInterval(t);el.textContent = target+'+';return}
                el.textContent = cur;
            },35);
            io.unobserve(el);
        });
    },{threshold:0.4});
    nums.forEach(n=>io.observe(n));
})();

/* -------- CUSTOM CURSOR + MAGNETIC -------- */
(function cursor(){
    if(window.matchMedia('(pointer:coarse)').matches) return;
    const c = document.querySelector('.custom-cursor');
    const d = document.querySelector('.cursor-dot');
    if(!c||!d) return;
    let mx=0,my=0,cx=0,cy=0;
    window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;d.style.left=mx+'px';d.style.top=my+'px'});
    (function loop(){
        cx += (mx-cx)*0.18; cy += (my-cy)*0.18;
        c.style.left=cx+'px'; c.style.top=cy+'px';
        requestAnimationFrame(loop);
    })();
    document.querySelectorAll('[data-cursor="hover"], a, button').forEach(el=>{
        el.addEventListener('mouseenter',()=>c.classList.add('hover'));
        el.addEventListener('mouseleave',()=>c.classList.remove('hover'));
    });
    /* Magnetic buttons */
    document.querySelectorAll('.magnetic').forEach(btn=>{
        btn.addEventListener('mousemove',e=>{
            const r = btn.getBoundingClientRect();
            const x = e.clientX - r.left - r.width/2;
            const y = e.clientY - r.top - r.height/2;
            btn.style.transform = `translate(${x*0.25}px, ${y*0.25}px)`;
        });
        btn.addEventListener('mouseleave',()=>btn.style.transform='');
    });
})();

/* -------- HERO TILT -------- */
(function tilt(){
    const el = document.querySelector('[data-tilt]');
    if(!el || window.matchMedia('(pointer:coarse)').matches) return;
    el.addEventListener('mousemove',e=>{
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left)/r.width - 0.5;
        const y = (e.clientY - r.top)/r.height - 0.5;
        el.style.transform = `perspective(1000px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-4px)`;
    });
    el.addEventListener('mouseleave',()=>el.style.transform='');
})();

/* -------- HERO PARALLAX GLOW -------- */
(function parallax(){
    const glows = document.querySelectorAll('.hero-glow');
    window.addEventListener('scroll',()=>{
        const y = window.scrollY;
        glows.forEach((g,i)=>{g.style.transform = `translateY(${y*(i?0.18:0.28)}px)`});
    },{passive:true});
})();
