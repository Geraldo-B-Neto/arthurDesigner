/**
 * The Kinetic Gallery - Interaction Logic
 * Handles internal parallax, dynamic typography, and the sticky project counter.
 */

document.addEventListener('DOMContentLoaded', () => {
    const projectItems = document.querySelectorAll('.project-item');
    const currentCounter = document.getElementById('current-project');
    const totalCounter = document.getElementById('total-projects');

    if (!projectItems.length) return;

    // 1. Initialize Counter
    if (totalCounter) {
        totalCounter.textContent = projectItems.length.toString().padStart(2, '0');
    }

    // 2. Internal Parallax & Title Pan
    projectItems.forEach(item => {
        const image = item.querySelector('.project-image');
        const title = item.querySelector('.project-title-bg');

        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Calculate percentage across the item
            const xPercent = (mouseX / rect.width) - 0.5;
            const yPercent = (mouseY / rect.height) - 0.5;

            // Pan image (Subtle move)
            if (image) {
                const moveX = xPercent * 20; // 20px range
                const moveY = yPercent * 20;
                image.style.transform = `translate(calc(-5% + ${moveX}px), calc(-5% + ${moveY}px)) scale(1.1)`;
            }

            // Move title in opposite direction for depth
            if (title) {
                const titleX = xPercent * -50; // Opposite 50px
                const titleY = yPercent * -50;
                title.style.transform = `translate(calc(-50% + ${titleX}px), calc(-50% + ${titleY}px))`;
            }
        });

        item.addEventListener('mouseleave', () => {
            if (image) image.style.transform = 'translate(-5%, -5%)';
            if (title) title.style.transform = 'translate(-50%, -50%)';
        });
    });

    // 3. Project Counter Tracking (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0% -50% 0%', // Track when item passes middle of screen
        threshold: 0
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const projectNum = entry.target.getAttribute('data-project');
                if (currentCounter) {
                    currentCounter.textContent = projectNum.padStart(2, '0');
                }
            }
        });
    }, observerOptions);

    projectItems.forEach(item => counterObserver.observe(item));
});
