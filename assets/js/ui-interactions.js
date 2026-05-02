export function initUIInteractions() {
  // Swup Overlay Demo
  const btnSwup = document.getElementById('btn-swup-demo');
  const overlay = document.getElementById('swup-overlay');
  if(btnSwup && overlay) {
    btnSwup.addEventListener('click', () => {
      overlay.classList.add('is-active');
      setTimeout(() => {
        overlay.classList.remove('is-active');
      }, 1500);
    });
  }

  // Scroll Top Action
  const scrollTop = document.getElementById('scrollTop');
  if(scrollTop) {
    scrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

export function toggleCookieBanner() {
  const banner = document.getElementById('ckyBanner');
  if(banner) banner.classList.toggle('is-active');
}

// Expose toggleCookieBanner to global scope for onclick attributes in HTML
window.toggleCookieBanner = toggleCookieBanner;
