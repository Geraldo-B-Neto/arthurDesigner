/* Global Entry Animations Handler */

document.addEventListener('DOMContentLoaded', () => {
    const targetElements = document.querySelectorAll('.reveal-up, .reveal-right, .reveal-left, .scale-in, .scan-in, .stagger-item, .hero-container');
    
    // 1. Intersection Observer for Sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Only trigger animations if the body has the 'loaded' class
            if (!document.body.classList.contains('loaded')) {
                return;
            }

            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                // Remove class to allow re-triggering when scrolling back
                entry.target.classList.remove('in-view');
            }
        });
    }, {
        threshold: 0.1
    });

    // 2. Observe all targets
    targetElements.forEach(el => sectionObserver.observe(el));

    // 3. Watch for 'loaded' class to trigger initial elements that are already in view
    const triggerInitialIntersections = () => {
        targetElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isInViewport = (
                rect.top < window.innerHeight &&
                rect.bottom > 0
            );
            
            if (isInViewport) {
                el.classList.add('in-view');
            }
        });
    };

    if (document.body.classList.contains('loaded')) {
        triggerInitialIntersections();
    } else {
        const bodyObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class' && document.body.classList.contains('loaded')) {
                    triggerInitialIntersections();
                    bodyObserver.disconnect();
                }
            });
        });
        bodyObserver.observe(document.body, { attributes: true });
    }
});



