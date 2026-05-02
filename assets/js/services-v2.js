/**
 * Service Matrix V2 - Interaction Logic
 * Handles horizontal scrolling for the War Room and theme switching.
 */

document.addEventListener('DOMContentLoaded', () => {
    const warRoomSection = document.querySelector('.block-war-room');
    const horizontalSlider = document.querySelector('.horizontal-slider');
    const serviceBlocks = document.querySelectorAll('.service-block');

    // 1. Unified Horizontal Scroll Handler
    const handleHorizontalScroll = () => {
        const sections = [
            { 
                container: document.querySelector('.block-performance-lab'), 
                slider: document.querySelector('.performance-slider') 
            },
            { 
                container: document.querySelector('.block-war-room'), 
                slider: document.querySelector('.horizontal-slider') 
            }
        ];

        sections.forEach(section => {
            if (!section.container || !section.slider) return;

            const rect = section.container.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // If the section is currently active in the viewport
            if (rect.top <= 0 && rect.bottom >= viewportHeight) {
                const scrolled = Math.abs(rect.top);
                const totalToScroll = rect.height - viewportHeight;
                const scrollPercent = Math.min(Math.max(scrolled / totalToScroll, 0), 1);

                const sliderWidth = section.slider.scrollWidth;
                const maxMoveX = sliderWidth - window.innerWidth;

                // Apply the translation
                section.slider.style.transform = `translateX(-${scrollPercent * maxMoveX}px)`;
            }
        });
    };

    window.addEventListener('scroll', handleHorizontalScroll);

    // 2. Theme Switching Observer
    const themeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const theme = entry.target.getAttribute('data-theme');
                document.body.classList.remove('theme-visual', 'theme-performance', 'theme-war');
                if (theme) document.body.classList.add(`theme-${theme}`);
            }
        });
    }, { threshold: 0.5 });

    // 3. Magnetic Float (Scattered Canvas)
    const scatteredCanvas = document.querySelector('.scattered-canvas');
    const scatteredItems = document.querySelectorAll('.scattered-item, .feedback-bubble, .metric-card, .ui-fragment');

    if (scatteredCanvas && scatteredItems.length) {
        scatteredCanvas.addEventListener('mousemove', (e) => {
            const rect = scatteredCanvas.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
            const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

            scatteredItems.forEach(item => {
                const depth = parseFloat(item.getAttribute('data-depth')) || 1;
                const moveX = mouseX * (depth * 60);
                const mouseYMove = mouseY * (depth * 60);

                // Get original rotation from CSS
                const style = window.getComputedStyle(item);
                const matrix = new WebKitCSSMatrix(style.transform);
                const rotation = Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI));

                item.style.transform = `translate(${moveX}px, ${mouseYMove}px) rotate(${rotation}deg)`;
            });
        });

        scatteredCanvas.addEventListener('mouseleave', () => {
            scatteredItems.forEach(item => {
                const style = window.getComputedStyle(item);
                const matrix = new WebKitCSSMatrix(style.transform);
                const rotation = Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI));
                item.style.transform = `translate(0, 0) rotate(${rotation}deg)`;
            });
        });
    }
});
