/* ============================================================
   GULLAKH DASHBOARD - SHARED JS
   ============================================================ */

// ── User name from localStorage ──────────────────────────────
const storedName = localStorage.getItem('gullak_user_name') || 'User';
const storedFirst = localStorage.getItem('gullak_user_first') || storedName.split(' ')[0];
const avatarLetter = storedFirst.charAt(0).toUpperCase();

// Inject name into all greeting / user elements on the page
document.querySelectorAll('.greeting-user-name').forEach(el => el.textContent = storedFirst);
document.querySelectorAll('.user-name-sm').forEach(el => el.textContent = storedName);
document.querySelectorAll('.user-avatar, .user-avatar-sm').forEach(el => {
  if (el.textContent.trim() === 'A' || el.textContent.trim().length === 1) el.textContent = avatarLetter;
});

// Greeting text with time-based message
const hour = new Date().getHours();
const timeGreeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
document.querySelectorAll('.greeting-text').forEach(el => {
  el.innerHTML = `${timeGreeting}, <strong>${storedFirst}</strong> 👋`;
});

// Sidebar toggle
const sidebar = document.getElementById('sidebar');
const hamburger = document.getElementById('hamburger');
const overlay = document.getElementById('sidebar-overlay');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
  });
}
if (overlay) {
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  });
}

// Animated counters
document.querySelectorAll('.counter').forEach(el => {
  const target = parseInt(el.dataset.target);
  const prefix = el.textContent.includes('₹') ? '₹' : '';
  let start = 0;
  const duration = 1400;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = prefix + Math.floor(start).toLocaleString('en-IN');
    if (start >= target) clearInterval(timer);
  }, 16);
});

// Dots grid for chart placeholder
const dotsGrid = document.getElementById('dots-grid');
if (dotsGrid) {
  for (let i = 0; i < 160; i++) {
    const dot = document.createElement('div');
    dot.className = 'chart-dot';
    dot.style.animationDelay = (Math.random() * 2) + 's';
    dot.style.opacity = Math.random() * 0.6 + 0.1;
    dotsGrid.appendChild(dot);
  }
}

// Toast utility
function showToast(title, msg, type = 'info') {
  let wrap = document.querySelector('.toast-wrap');
  if (!wrap) { wrap = document.createElement('div'); wrap.className = 'toast-wrap'; document.body.appendChild(wrap); }
  const icons = { success: '✅', error: '❌', info: '💡' };
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<span style="font-size:1.1rem">${icons[type]}</span><div class="toast-body"><span class="toast-title">${title}</span><span class="toast-msg">${msg}</span></div>`;
  wrap.appendChild(t);
  requestAnimationFrame(() => { requestAnimationFrame(() => t.classList.add('show')); });
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 400); }, 3500);
}

// Modal utility
function openModal(id) { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => btn.closest('.modal-overlay')?.classList.remove('open'));
});
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });
});

// Animate goal bars on load
document.querySelectorAll('.goal-fill').forEach(bar => {
  const w = bar.style.width;
  bar.style.width = '0';
  setTimeout(() => { bar.style.width = w; }, 300);
});
