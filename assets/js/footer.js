/**
 * Footer Logic - Real-time Local Clock & Glitch Interactions
 */

function updateClock() {
    const clockElement = document.getElementById('local-clock');
    if (!clockElement) return;

    const options = { 
        timeZone: 'America/Sao_Paulo', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
    };

    try {
        const now = new Intl.DateTimeFormat('pt-BR', options).format(new Date());
        clockElement.textContent = `LOCAL_TIME: ${now} GMT-3`;
    } catch (e) {
        console.error("Clock error:", e);
    }
}

// 1. Terminal Text Cycle & Glitch
const ctaBtn = document.querySelector('.main-cta-button');
const btnText = document.getElementById('btn-text');

if (ctaBtn && btnText) {
    const states = ["START_PROJECT", "INITIALIZING...", "EXECUTE_STRATEGY"];
    let stateIdx = 0;

    function triggerGlitch(element) {
        let count = 0;
        const interval = setInterval(() => {
            element.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
            element.style.filter = `hue-rotate(${Math.random() * 360}deg) brightness(${Math.random() * 2})`;
            count++;
            if (count > 8) {
                clearInterval(interval);
                element.style.transform = 'none';
                element.style.filter = 'none';
            }
        }, 40);
    }

    ctaBtn.addEventListener('mouseenter', () => {
        triggerGlitch(ctaBtn);
        
        // Cycle text
        let cycleInterval = setInterval(() => {
            stateIdx = (stateIdx + 1) % states.length;
            btnText.textContent = states[stateIdx];
            if (stateIdx === states.length - 1) clearInterval(cycleInterval);
        }, 100);
    });

    ctaBtn.addEventListener('mouseleave', () => {
        btnText.textContent = states[0];
        stateIdx = 0;
    });
}

// 2. Scroll Velocity Skew & Scanner Reveal
const ctaTitle = document.querySelector('.cta-title');
const ctaSection = document.querySelector('.cta-section');
const ctaSubtitle = document.querySelector('.cta-subtitle');

let lastScrollY = window.scrollY;
let velocity = 0;

function updateEffects() {
    if (!ctaTitle || !ctaSection) return;
    
    const rect = ctaSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Calculate Velocity for Skew
    const currentScrollY = window.scrollY;
    velocity = (currentScrollY - lastScrollY) * 0.1;
    lastScrollY = currentScrollY;

    // Apply Skew based on Velocity
    if (rect.top < viewportHeight && rect.bottom > 0) {
        // Clamp velocity for stability
        const skew = Math.max(-15, Math.min(15, velocity));
        ctaTitle.style.transform = `skewY(${skew}deg)`;
    }

    requestAnimationFrame(updateEffects);
}

// Typewriter Logic - Multi-text Loop
async function runTypewriterLoop(element) {
    const texts = JSON.parse(element.getAttribute('data-typewriter'));
    if (!texts || !texts.length) return;

    let textIdx = 0;

    while (true) {
        const currentText = texts[textIdx];
        
        // 1. Type forward
        for (let i = 0; i <= currentText.length; i++) {
            element.innerHTML = currentText.substring(0, i) + '<span class="typewriter-cursor"></span>';
            await new Promise(r => setTimeout(r, 40));
        }

        // 2. Wait at the end
        await new Promise(r => setTimeout(r, 3000));

        // 3. Erase backward
        for (let i = currentText.length; i >= 0; i--) {
            element.innerHTML = currentText.substring(0, i) + '<span class="typewriter-cursor"></span>';
            await new Promise(r => setTimeout(r, 20));
        }

        // 4. Move to next text
        textIdx = (textIdx + 1) % texts.length;
        await new Promise(r => setTimeout(r, 500));
    }
}

// Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            ctaTitle.classList.add('is-revealed');
            // Trigger typewriter loop after a short delay
            if (ctaSubtitle && !ctaSubtitle.classList.contains('active-loop')) {
                ctaSubtitle.classList.add('active-loop');
                setTimeout(() => runTypewriterLoop(ctaSubtitle), 1000);
            }
        }
    });
}, { threshold: 0.2 });

if (ctaSection) revealObserver.observe(ctaSection);

// Initializations
updateClock();
setInterval(updateClock, 1000);
requestAnimationFrame(updateEffects);
