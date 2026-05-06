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

// ---- Come back when switching tab ----

const originalTitle = document.title;
document.addEventListener("visibilitychange", () => {
  document.title = document.hidden ?
    "Come Back, I miss you :("  :
    originalTitle;
});

// ---- CURTAIN WIPE TRANSITION ----

// Create the curtain div and add it to the page
const curtain = document.createElement('div');
curtain.id = 'curtain';
document.body.appendChild(curtain);

// When the page loads, sweep the curtain off to the right
window.addEventListener('DOMContentLoaded', () => {
  curtain.classList.add('sweep-out'); // reveals the new page

  // clean up classes after animation finishes
  curtain.addEventListener('animationend', () => {
    curtain.classList.remove('sweep-out');
  }, { once: true }); // { once: true } = only runs this one time
});


// ---- SEASON FILTER ----
// Shows only episodes from the selected season
function filterSeason(season, clickedBtn) {

  // update which button looks active
  document.querySelectorAll('.season-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  clickedBtn.classList.add('active');

  // show or hide each entry based on its data-season
  document.querySelectorAll('.devlog-entry').forEach(entry => {
    if (season === 'all' || entry.dataset.season === season) {
      entry.style.display = 'block'; // show it
    } else {
      entry.style.display = 'none';  // hide it
    }
  });
}


// Intercept clicks on .html links
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');

  if (href && href.endsWith('.html')) {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      // Sweep curtain IN from the left (covers the page)
      curtain.classList.add('sweep-in');

      // Once covered, navigate to the new page
      curtain.addEventListener('animationend', () => {
        window.location.href = href;
      }, { once: true });
    });
  }
});



// ---- CARD FLIP ----
// clicking a card toggles the flipped class
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', function() {
    this.classList.toggle('flipped');
  });
});