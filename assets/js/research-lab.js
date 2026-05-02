/**
 * The Research Lab - Interaction Logic
 * Handles the custom "Inspection Cursor" and the Scanner metadata.
 */

document.addEventListener('DOMContentLoaded', () => {
    const labSection = document.querySelector('.research-lab-section');
    const customCursor = document.querySelector('.lab-cursor');
    const cursorTag = document.getElementById('cursor-tag');
    const bentoItems = document.querySelectorAll('.bento-item');

    if (!labSection || !customCursor) return;

    // 1. Cursor Tracking
    const updateCursor = (e) => {
        // Use clientX/Y for fixed positioning
        const x = e.clientX;
        const y = e.clientY;

        // Smoothly follow the mouse
        // We use requestAnimationFrame via CSS transition on the element 
        // but manual updates are more reactive for a crosshair
        customCursor.style.left = `${x}px`;
        customCursor.style.top = `${y}px`;

        // 2. Metadata HUD Update
        // Check if we are hovering over a bento item
        const target = e.target.closest('.bento-item');
        if (target) {
            const refId = target.getAttribute('data-ref') || '#UNKNOWN';
            cursorTag.textContent = `INSPECTING_ID: ${refId}`;
            customCursor.style.width = '80px';
            customCursor.style.height = '80px';
        } else {
            cursorTag.textContent = 'SCANNING_ENVIRONMENT...';
            customCursor.style.width = '60px';
            customCursor.style.height = '60px';
        }
    };

    // 3. Section Entry/Exit Logic
    labSection.addEventListener('mouseenter', () => {
        customCursor.style.display = 'flex';
    });

    labSection.addEventListener('mouseleave', () => {
        customCursor.style.display = 'none';
    });

    labSection.addEventListener('mousemove', updateCursor);

    // 4. Click/Touch Interaction (Pulse & Haptic)
    const handlePress = () => {
        customCursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        if ("vibrate" in navigator) {
            navigator.vibrate(15);
        }
    };

    const handleRelease = () => {
        customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    labSection.addEventListener('mousedown', handlePress);
    labSection.addEventListener('mouseup', handleRelease);
    labSection.addEventListener('touchstart', handlePress);
    labSection.addEventListener('touchend', handleRelease);

    // 5. Proximity Reveal (Mobile Scanner Logic)
    const observerOptions = {
        root: null,
        // Focus on the center area of the viewport (scanner zone)
        rootMargin: '-30% 0% -30% 0%',
        threshold: 0.1
    };

    const proximityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
            } else {
                entry.target.classList.remove('is-active');
            }
        });
    }, observerOptions);

    bentoItems.forEach(item => proximityObserver.observe(item));

    // Ensure the cursor starts at the right position center-aligned
    customCursor.style.transform = 'translate(-50%, -50%)';
});
