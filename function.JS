// =============================================
// script.js — Jesse's Portfolio
// =============================================



// ---- HIGHLIGHT ACTIVE NAV LINK ----
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) {
      current = sec.id;
    }
  });
  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === `#${current}`;
    link.style.color       = isActive ? 'var(--accent)' : '';
    link.style.borderColor = isActive ? 'var(--accent)' : '';
  });
});

// ---- INFO BUBBLE CLICK TOGGLE ----
document.querySelectorAll('.order-badge').forEach(badge => {
  badge.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('active');
  });
});

document.addEventListener('click', () => {
  document.querySelectorAll('.order-badge').forEach(badge => {
    badge.classList.remove('active');
  });
});

// ---- READ MORE / CLOSE BUTTONS ----
function openFullInfo(id) {
  const box = document.getElementById(id);
  box.classList.add('open');
}

function closeFullInfo(id) {
  const box = document.getElementById(id);
  box.classList.remove('open');
}