/**
 * Workflow Section Interaction Logic
 * Uses Intersection Observer to sync the sticky left column with scrolling right content.
 */

document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.workflow-step-content');
    const stickyItems = document.querySelectorAll('.workflow-sticky-item');

    if (!steps.length || !stickyItems.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when step is in the upper middle of the screen
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stepNumber = entry.target.dataset.step;
                
                // Remove active class from all
                stickyItems.forEach(item => item.classList.remove('is-active'));
                steps.forEach(s => s.classList.remove('is-active'));

                // Add to current
                const activeSticky = document.querySelector(`.workflow-sticky-item[data-step="${stepNumber}"]`);
                if (activeSticky) activeSticky.classList.add('is-active');
                entry.target.classList.add('is-active');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    steps.forEach(step => observer.observe(step));
});
