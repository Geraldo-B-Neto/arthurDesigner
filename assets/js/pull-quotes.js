/**
 * Luxury Pull Quotes Traversal Logic
 * Handles horizontal movement of massive keywords during sticky scroll.
 */

document.addEventListener('DOMContentLoaded', () => {
    const quoteItems = document.querySelectorAll('.pull-quote-item');

    if (!quoteItems.length) return;

    /**
     * Animation Loop (RAF)
     * Calculates the scroll progress of each item relative to the viewport.
     */
    const render = () => {
        quoteItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const keyword = item.querySelector('.keyword-massive');
            
            if (!keyword) return;

            // Check if the item is in/near the viewport
            if (rect.top > window.innerHeight || rect.bottom < 0) return;

            // Calculate how far we've scrolled within the item's total height (180vh)
            // Progress 0: Item top at viewport top
            // Progress 1: Item bottom at viewport bottom
            const totalScrollableHeight = item.offsetHeight - window.innerHeight;
            const currentScrollPos = -rect.top;
            
            let progress = currentScrollPos / totalScrollableHeight;
            progress = Math.max(0, Math.min(1, progress));

            // Horizontal Translation Logic
            // The keyword moves from a right-offset to a left-offset (or vice versa)
            const speed = parseFloat(keyword.getAttribute('data-speed')) || 0.5;
            
            // Map 0 -> 1 progress to a movement range
            // We use 'vw' to ensure the movement is relative to screen width
            const movementRange = 100 * speed;
            const xOffset = (0.5 - progress) * movementRange;
            
            // Apply GPU-accelerated transform
            keyword.style.transform = `translate3d(${xOffset}vw, 0, 0)`;
        });

        requestAnimationFrame(render);
    };

    // Start the loop
    requestAnimationFrame(render);
});
