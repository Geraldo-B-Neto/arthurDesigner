/* Preloader & Entry Sequence Logic */

document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('.preloader');
    const counter = document.querySelector('.preloader-counter');
    const bar = document.querySelector('.preloader-bar-fill');
    const body = document.body;

    let progress = 0;
    body.classList.add('loading');

    const updateProgress = () => {
        // Simulated loading for cinematic effect
        const increment = Math.random() * 15;
        progress = Math.min(progress + increment, 100);

        counter.textContent = `${Math.floor(progress)}%`;
        bar.style.width = `${progress}%`;

        if (progress < 100) {
            const delay = Math.random() * 200 + 50;
            setTimeout(updateProgress, delay);
        } else {
            finishLoading();
        }
    };

    const finishLoading = () => {
        setTimeout(() => {
            preloader.classList.add('finished');
            body.classList.remove('loading');
            body.classList.add('loaded');

            // Trigger Hero Assembly ONLY after preloader is gone
            setTimeout(() => {
                const hero = document.querySelector('.hero-container');
                if (hero) hero.classList.add('in-view');
            }, 800);
        }, 500);
    };

    // Start loading sequence
    updateProgress();
});
