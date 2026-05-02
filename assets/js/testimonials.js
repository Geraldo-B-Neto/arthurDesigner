/**
 * Kinetic Testimonials Gallery
 * Infinite horizontal marquee with scroll-velocity binding.
 */

document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.testimonials-gallery');
    const wrappers = document.querySelectorAll('.marquee-wrapper');

    if (!gallery || !wrappers.length) return;

    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let isHovering = false;

    // 1. Setup Clones for Infinite Loop
    wrappers.forEach(wrapper => {
        const content = wrapper.querySelector('.marquee-content');
        const originalHTML = content.innerHTML;
        content.innerHTML = originalHTML + originalHTML + originalHTML;
    });

    // 2. Scroll Velocity Tracking
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        // Calculate velocity based on scroll delta
        const delta = Math.abs(currentScrollY - lastScrollY);
        scrollVelocity = Math.min(20, delta * 0.2); // Cap velocity
        lastScrollY = currentScrollY;
    }, { passive: true });

    // 3. Animation State Object
    const states = Array.from(wrappers).map((wrapper, i) => {
        const content = wrapper.querySelector('.marquee-content');
        const direction = wrapper.getAttribute('data-direction') === 'left' ? -1 : 1;
        const contentWidth = content.scrollWidth / 3;
        
        return {
            el: content,
            pos: direction === 1 ? -contentWidth : 0,
            direction: direction,
            baseSpeed: 1.5 + (i * 0.3), // Varied base speeds for visual rhythm
            contentWidth: contentWidth
        };
    });

    // 4. Kinetic Animation Loop (RAF)
    const render = () => {
        // Smoothly decay scroll velocity
        scrollVelocity *= 0.95;
        if (scrollVelocity < 0.01) scrollVelocity = 0;

        states.forEach(state => {
            // Calculate effective speed (Base + Scroll Momentum)
            const currentSpeed = state.baseSpeed + scrollVelocity;
            
            state.pos += currentSpeed * state.direction;

            // Seamless Loop Logic
            if (state.direction === -1 && state.pos <= -state.contentWidth) {
                state.pos = 0;
            } else if (state.direction === 1 && state.pos >= 0) {
                state.pos = -state.contentWidth;
            }

            // Apply transform (GPU Accelerated)
            state.el.style.transform = `translate3d(${state.pos}px, 0, 0)`;
        });

        requestAnimationFrame(render);
    };

    // Initialize Loop
    requestAnimationFrame(render);
});
