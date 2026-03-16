// =============================================
// script.js — Jesse's Portfolio
// =============================================

// ---- HIGHLIGHT ACTIVE NAV LINK ----
// As you scroll, the matching nav link lights up in orange.

const sections = document.querySelectorAll('section[id]'); // grab all sections
const navLinks  = document.querySelectorAll('.nav-links a'); // grab all nav links

window.addEventListener('scroll', () => {
  let current = '';

  // Figure out which section is on screen right now
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 80) {
      current = sec.id;
    }
  });

  // Highlight the matching nav link
  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === `#${current}`;
    link.style.color       = isActive ? 'var(--accent)' : '';
    link.style.borderColor = isActive ? 'var(--accent)' : '';
  });
});