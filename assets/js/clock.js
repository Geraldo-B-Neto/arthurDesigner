export function initClock() {
  function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('pt-BR', { hour12: false });
    const clockEl = document.getElementById('clock');
    if(clockEl) clockEl.textContent = timeStr;
    requestAnimationFrame(updateClock);
  }
  requestAnimationFrame(updateClock);
}
