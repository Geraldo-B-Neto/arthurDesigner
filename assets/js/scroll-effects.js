export function initScrollEffects() {
  // Initial Word Reveal (Our Roots)
  window.addEventListener('load', () => {
    setTimeout(() => {
      const ourRootsSection = document.getElementById('our-roots-section');
      if(ourRootsSection) ourRootsSection.classList.add('is-loaded');
    }, 300);
  });

  // Scroll Storytelling & Scroll Top Visibility
  window.addEventListener('scroll', () => {
    const story = document.getElementById('scroll-story');
    if (story) {
      const rect = story.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        let progress = (windowHeight - rect.top) / (rect.height + windowHeight);
        const text1 = document.getElementById('parallax-text-1');
        const text2 = document.getElementById('parallax-text-2');
        if(text1 && text2) {
          text1.style.transform = `translateX(${(0.5 - progress) * -50}vw)`;
          text2.style.transform = `translateX(${(progress - 0.5) * 50}vw)`;
        }
      }
    }

    const scrollTop = document.getElementById('scrollTop');
    if (scrollTop) {
      if (window.scrollY > 300) {
        scrollTop.classList.add('visible');
      } else {
        scrollTop.classList.remove('visible');
      }
    }
  });
}
