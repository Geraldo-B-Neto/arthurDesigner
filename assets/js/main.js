import { initClock } from './clock.js';
import { initScrollEffects } from './scroll-effects.js';
import { initCursor } from './cursor.js';
import { initUIInteractions } from './ui-interactions.js';

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initScrollEffects();
  initCursor();
  initUIInteractions();
});
