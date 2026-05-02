export function initCursor() {
  const cursorWrap = document.getElementById('custom-cursor');
  document.addEventListener('mousemove', (e) => {
    if (cursorWrap) {
      cursorWrap.style.left = e.clientX + 'px';
      cursorWrap.style.top = e.clientY + 'px';
    }
  });
}
