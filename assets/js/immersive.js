document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.immersive-section');
    const lensImage = document.querySelector('.lens-image');
    const triggers = document.querySelectorAll('.scroll-trigger');

    if (!section) return;

    let sectionTop = 0;
    let sectionHeight = 0;
    let scrollHeight = 0;

    const updateGeometry = () => {
        sectionTop = section.offsetTop;
        sectionHeight = section.offsetHeight;
        scrollHeight = sectionHeight - window.innerHeight;
    };

    updateGeometry();
    window.addEventListener('resize', updateGeometry);

    /**
     * PASSIVE SCROLL HANDLER
     * Updates a CSS variable for smooth, continuous motion (GPU-driven)
     */
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Global section progress (0 to 1)
        let progress = (scrolled - sectionTop) / scrollHeight;
        progress = Math.max(0, Math.min(1, progress));

        // Inject progress into CSS for ultra-smooth GPU interpolation
        section.style.setProperty('--scroll-progress', progress);
        
        // Update states based on progress if triggers are not being used
        // But we'll keep the Observer for discrete step changes as it's cleaner
    }, { passive: true });

    /**
     * INTERSECTION OBSERVER
     * Handles discrete state changes (Step 1, Step 2, etc.)
     */
    const observerOptions = {
        root: null,
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const step = entry.target.getAttribute('data-trigger');
                section.setAttribute('data-active-step', step);
                updateHUDStatus(step);
            }
        });
    }, observerOptions);

    triggers.forEach(trigger => observer.observe(trigger));

    /**
     * KEYBOARD NAVIGATION
     * Allows skipping through stages using Arrow keys
     */
    window.addEventListener('keydown', (e) => {
        if (!['ArrowUp', 'ArrowDown'].includes(e.key)) return;
        
        const rect = section.getBoundingClientRect();
        const isInView = rect.top <= 10 && rect.bottom >= window.innerHeight - 10;
        
        // If not actively "locked" into the section, let browser handle scroll normally
        if (!isInView) return;

        const currentStep = parseInt(section.getAttribute('data-active-step')) || 0;
        
        // Boundary check: If we are at the end/beginning, allow escaping the section
        if (e.key === 'ArrowDown' && currentStep === 5) return;
        if (e.key === 'ArrowUp' && currentStep === 0) return;

        // If we reach here, we are navigating BETWEEN cards
        e.preventDefault(); 

        let nextStep = e.key === 'ArrowDown' ? currentStep + 1 : currentStep - 1;
        nextStep = Math.max(0, Math.min(5, nextStep));

        const nextTrigger = document.querySelector(`.scroll-trigger[data-trigger="${nextStep}"]`);
        if (nextTrigger) {
            nextTrigger.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

function updateHUDStatus(step) {
    const statusEl = document.getElementById('hud-status');
    if (!statusEl) return;
    
    const statuses = [
        'STATUS: INITIALIZING',
        'STATUS: LENS_PENETRATION',
        'STATUS: STRATEGY_ACTIVE',
        'STATUS: DESIGN_ACTIVE',
        'STATUS: AI_ENGINE_READY',
        'STATUS: DISCONNECTING...'
    ];
    statusEl.textContent = statuses[step] || 'STATUS: ACTIVE';
}
