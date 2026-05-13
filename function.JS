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


// =============================================
// MOBILE HAMBURGER MENU
// Controlled entirely via JS style.display so
// the desktop CSS flex rule can't interfere.
// =============================================

const hamburger = document.getElementById('hamburger');
const navLinksEl = document.querySelector('.nav-links');

function isMobile() { return window.innerWidth <= 600; }

function setNavForScreenSize() {
  if (!navLinksEl) return;
  if (isMobile()) {
    // On mobile: hide by default (hamburger controls it)
    hamburger && (hamburger.style.display = 'flex');
    navLinksEl.style.display = 'none';
    navLinksEl.style.flexDirection = 'column';
    navLinksEl.style.width = '100%';
  } else {
    // On desktop: always show as a row, hide hamburger
    hamburger && (hamburger.style.display = 'none');
    navLinksEl.style.display = 'flex';
    navLinksEl.style.flexDirection = 'row';
    navLinksEl.style.width = '';
  }
}

// Run on load and whenever the window is resized
setNavForScreenSize();
window.addEventListener('resize', setNavForScreenSize);

if (hamburger && navLinksEl) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinksEl.style.display === 'flex';
    navLinksEl.style.display = isOpen ? 'none' : 'flex';
  });

  // Close when a link is tapped
  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (isMobile()) navLinksEl.style.display = 'none';
    });
  });

  // Close when tapping anywhere else
  document.addEventListener('click', (e) => {
    if (isMobile() &&
        !navLinksEl.contains(e.target) &&
        e.target !== hamburger &&
        !hamburger.contains(e.target)) {
      navLinksEl.style.display = 'none';
    }
  });
}


// =============================================
// LANGUAGE SWITCHER — EN / NL
// Syncs across tabs using localStorage + StorageEvent
// =============================================

const translations = {
  en: {
    // Nav
    nav_about:    'About',
    nav_games:    'Games',
    nav_more:     'More projects',
    nav_school:   'School',
    nav_contact:  'Contact',
    // Hero
    hero_label:   'Game Developer · UE5 · 16 years old',
    hero_h1:      "Hi, I'm Jesse.<br/>I make games.",
    hero_sub:     "Been building games since I was 8. Got serious at 14.<br/>Currently working towards my first release.",
    hero_cta:     'See My Games ↓',
    // About
    about_title:  'About Me',
    about_p1:     "I'm a 16 year old game developer from Belgium. I started messing around with games when I was 8, and by the time I was 14 I decided to take it seriously. I build in <strong>Unreal Engine 5</strong> using the Blueprint system, and I also know basic <strong>Python</strong>.",
    about_p2:     "I've built 5 games so far, none released yet, but I'm aiming to ship my first one in the next year or two. Every project teaches me something new.",
    // Timeline
    timeline_title: 'My Journey',
    timeline_sub:   'From first click to current project — every build taught me something.',
    tl1_title:    'Zombie Shooter',
    tl1_desc:     'My very first game. Used tutorials to figure out UE5 basics — combat mechanics and enemy AI. Files sadly lost.',
    tl2_title:    'Racing Game',
    tl2_desc:     'Used the UE5 vehicle sample to explore level design and map layout. First time making something that felt alive. Also lost.',
    tl3_title:    'Job Runner',
    tl3_desc:     'This is where I got serious. Learned UI design, sound effects, game balance, and visual effects. Shifted focus to Escape the Box.',
    tl_milestone: 'Turning point',
    tl4_title:    'Endless Runner',
    tl4_desc:     'Built from scratch to push through a coding wall. Deep dive into Blueprints and game loops. Files got corrupted.',
    tl5_title:    'H2 RC Grand Prix',
    tl5_desc:     'Built and raced a hydrogen-powered RC car at school competition. Finished 7th, won most efficient driving — 30 laps on one hydrogen cell.',
    tl_now:       '15 → now',
    tl6_title:    'Escape the Box',
    tl_wip:       'In Progress',
    tl6_desc:     'My current project. Zero tutorials — only my own knowledge and written sources. Documenting the journey on YouTube with 3 devlogs posted.',
    tl6_cta:      '▶ Watch devlog',
    // Games
    games_title:  'My Games',
    games_sub:    "All built in UE5. None released yet — but they're coming.",
    click_hint:   'Click a card',
    flip_hint:    'click to learn more →',
    g1_title: 'Zombie Shooter',
    g1_short: 'Fight off waves of zombies. Built to practice combat mechanics and enemy AI in UE5.',
    g1_long1: 'One of my first projects, started at age 9 with the help of tutorials.',
    g1_long2: "It wasn't the greatest game, but it was a fun introduction to game development and got me hooked on building things in UE5.",
    g1_long3: 'Sadly, I can no longer find the files.',
    g2_title: 'Racing Game',
    g2_short: 'A basic racing game. My first time working with vehicle physics and track design.',
    g2_long1: 'A fun project where I really leaned into level design and tried to make something feel alive. (Age 10)',
    g2_long2: 'I used the basic car sample in UE5 and focused heavily on the layout of the map.',
    g2_long3: 'Sadly, these files are also lost.',
    g3_title: 'Job Runner',
    g3_short: 'A job simulator. Still unfinished — I moved my priorities to Escape The Box.',
    g3_long1: 'Started around age 14. This was a serious project and a really important one for me.',
    g3_long2: 'I learned UI design, sound effects, game balance, visual effects, and much more.',
    g3_long3: 'This was definitely the project that made me take game development seriously.',
    g4_title: 'Endless Runner',
    g4_short: 'Classic endless runner. Built to learn basic blueprints and game loops.',
    g4_long1: 'Started right after hitting a coding wall in my previous game. I needed to really learn how to code, so I built this from scratch. (Age 14–15)',
    g4_long2: 'It was a fun project, but sadly the files got corrupted and couldn\'t be recovered.',
    g5_title: 'Escape the Box',
    g5_title_short: 'Escape the Box',
    g5_short: 'A puzzle-parkour game where you escape a box. Mix of brain teasers and movement mechanics.',
    g5_long1: 'My current project, started at 15. I challenged myself to use zero tutorials — only my own knowledge and sources like Google, Reddit, and GitHub.',
    g5_long2: 'I also decided to document the journey, so I created a YouTube channel and have posted multiple devlogs so far.',
    g5_long3: 'Still actively working on this one.',
    // More projects
    more_title:   'More projects',
    more_sub:     "I didn't only make games — I also built <strong>multiple physical</strong> projects.",
    h2_title:     'H2 RC Grand Prix',
    h2_short:     'Built and raced a hydrogen-powered RC car. Finished 7th and won most efficient driving — 30 laps on one hydrogen cell.',
    h2_long1:     'We were provided with basic materials including HydroSticks and had to build a functional vehicle under strict constraints.',
    h2_long2:     'I took initiative across multiple areas due to limited team leadership — coordinating tasks, doing 3D and body design, and handling electronics.',
    h2_long3:     'One of our key innovations was a custom shock absorption system to protect the CPU during rear impacts.',
    h2_long4:     'I developed practical skills in mechanics, leadership, task planning, and team coordination.',
    race_pt1:     '▶ Race pt1',
    race_pt2:     '▶ Race pt2',
    // School
    school_title: 'School',
    ms_title:     'Middle school',
    ms_years:     '1st year: STEM · 2nd year: STEM sciences',
    ms_cta:       'See my middle school projects ↓',
    hs_title:     'High school',
    hs_years:     '1st and 2nd year: technological sciences',
    hs_cta:       'See my high school projects ↓',
    ms_proj_title: 'Middle school projects',
    hs_proj_title: 'High school projects',
    egg_title:    'Egg crash challenge',
    egg_short:    'Built a car that could make an egg survive a crash from a ramp.',
    egg_long1:    'We had to build a small wooden car entirely from our own imagination.',
    egg_long2:    'I surrounded the car with sponges to absorb impact, and designed a cushioned compartment for the egg connected only by rubber bands — so it could move forward and backward and wouldn\'t stop abruptly.',
    bridge_title: 'Bridge',
    bridge_short: 'Built a bridge out of small wooden sticks and tape. Target: hold 3–5 kg.',
    bridge_long1: 'Built in a group of 3 with only 4 hours of work time per week over 2 weeks.',
    bridge_long2: 'We researched different bridge designs, then went with an interlocked stick design reinforced with tape.',
    bridge_long3: 'On test day our bridge was dropped on the way to the test — it still held 3.5 kg and we scored around 60%.',
    spider_title: 'Spider robot',
    spider_short: 'Built a vibrating spider that steers away from obstacles using wire feelers.',
    spider_long1: 'Wire feelers acted as whiskers — when one bent on contact with an object, the spider turned in the opposite direction.',
    spider_long2: 'Components: a battery, a small vibration motor, wires, and button-style switches with long handles for the whiskers.',
    spider_long3: 'My first real hands-on experience with basic electronics.',
    hrc_short:    'Built and raced a hydrogen-powered RC car against other schools in 2nd year.',
    hrc_long1:    'In 2nd year of high school we had to build a hydrogen-powered RC car and race other schools.',
    hrc_long2:    'We finished 7th overall and won the award for most efficient driving — 30 laps on a single hydrogen cell.',
    hrc_long3:    'I handled 3D design, body design, electronics, and drove in the race.',
    full_story:   'See full story',
    // Contact
    contact_title: 'Get In Touch',
    contact_p:     'Want to follow my progress, collaborate, or just talk games? Reach out below.',
    // Devlog page
    back_link:        '← Back to Portfolio',
    live_badge:       'Active Development',
    header_desc:      'Following the development of my current game built with zero tutorials, using only my own knowledge and sources like Google, Reddit, and GitHub.',
    stat_started:     'Started',
    stat_started_val: 'Age 15',
    stat_engine:      'Engine',
    stat_devlogs:     'Devlogs Posted',
    stat_status:      'Status',
    stat_status_val:  'In Progress',
    stat_tutorials:   'Tutorials Used',
    filter_all:       'All',
    all_episodes:     'All Episodes',
    ep3_label:        'Episode 03',
    ep3_title:        'Devlog #3 — sound effects',
    ep3_p1:           'The third devlog for Escape the Box. This episode covers how I gave the player some sounds alongside some other objects like buttons, ...',
    ep_rule:          'One of the main rules I set for myself: no tutorials. Everything had to come from my own thinking, or from written sources like Google, Reddit, and GitHub.',
    ep2_label:        'Episode 02',
    ep2_title:        'Devlog #2 — Password system',
    ep2_p1:           'The second devlog for Escape the Box. This episode covers how I made the password system for level 3.',
    ep1_label:        'Episode 01',
    ep1_title:        'Devlog #1 — The Beginning',
    ep1_p1:           'The first devlog for Escape the Box. This episode covers how I made level 3 complete by adding the password system.',
    tag_sounds:       'sound effects',
    tag_sysprod:      'system production',
    tag_notut:        'No Tutorials',
    tag_lvl3:         'Level 3',
    tag_lvldesign:    'Level Design',
    upcoming_title:   'Coming Next',
    upcoming_ep:      'Episode 04 — In Progress',
    upcoming_li1:     'Upgrading temporary levels.',
    upcoming_li2:     'Adding more fun to the environment.',
  },

  nl: {
    // Nav
    nav_about:    'Over mij',
    nav_games:    'Games',
    nav_more:     'Meer projecten',
    nav_school:   'School',
    nav_contact:  'Contact',
    // Hero
    hero_label:   'Game Developer · UE5 · 16 jaar oud',
    hero_h1:      "Hoi, ik ben Jesse.<br/>Ik maak games.",
    hero_sub:     "Al bezig met games bouwen sinds ik 8 was. Serieus geworden op mijn 14e.<br/>Momenteel werk ik toe naar mijn eerste release.",
    hero_cta:     'Bekijk mijn games ↓',
    // About
    about_title:  'Over mij',
    about_p1:     "Ik ben een 16-jarige game developer uit België. Ik begon met games maken toen ik 8 was, en op mijn 14e besloot ik het serieus aan te pakken. Ik bouw in <strong>Unreal Engine 5</strong> met het Blueprint-systeem, en ik ken ook basis-<strong>Python</strong>.",
    about_p2:     "Ik heb tot nu toe 5 games gebouwd, nog geen enkele uitgebracht, maar ik wil er over een paar jaar één releasen. Elk project leert me iets nieuws.",
    // Timeline
    timeline_title: 'Mijn reis',
    timeline_sub:   'Van eerste klik tot huidig project — elk project leerde me iets.',
    tl1_title:    'Zombie Shooter',
    tl1_desc:     'Mijn allereerste game. Gebruikt tutorials om UE5-basics te leren — gevechts- en vijand-AI. Bestanden helaas kwijt.',
    tl2_title:    'Racegame',
    tl2_desc:     'Gebruikt het UE5 voertuig-voorbeeld om level design en mapindeling te verkennen. Eerste keer dat iets echt levend aanvoelde. Ook kwijt.',
    tl3_title:    'Job Runner',
    tl3_desc:     'Hier werd het serieus. Geleerd: UI-design, geluidseffecten, spelbalans en visuele effecten. Focus daarna verlegd naar Escape the Box.',
    tl_milestone: 'Keerpunt',
    tl4_title:    'Endless Runner',
    tl4_desc:     'Van scratch gebouwd om een code-blokkade te doorbreken. Diep gedoken in Blueprints en gameloops. Bestanden beschadigd geraakt.',
    tl5_title:    'H2 RC Grand Prix',
    tl5_desc:     'Waterstof RC-auto gebouwd en geraced op schoolcompetitie. 7e geworden, gewonnen als meest efficiënte rijder — 30 rondjes op één waterstofcel.',
    tl_now:       '15 → nu',
    tl6_title:    'Escape the Box',
    tl_wip:       'In ontwikkeling',
    tl6_desc:     'Mijn huidige project. Nul tutorials — alleen mijn eigen kennis en geschreven bronnen. Documenteer de reis op YouTube met 3 devlogs gepost.',
    tl6_cta:      '▶ Bekijk devlog',
    // Games
    games_title:  'Mijn games',
    games_sub:    'Allemaal gebouwd in UE5. Nog geen enkele uitgebracht — maar ze komen eraan.',
    click_hint:   'Klik een kaart',
    flip_hint:    'klik voor meer info →',
    g1_title: 'Zombie Shooter',
    g1_short: 'Golven zombies verslaan. Gebouwd om gevechts- en vijand-AI in UE5 te oefenen.',
    g1_long1: 'Een van mijn eerste projecten, begonnen op 9 jaar met tutorials.',
    g1_long2: 'Niet de beste game, maar een leuke introductie tot game development die me enthousiast maakte voor UE5.',
    g1_long3: 'Helaas zijn de bestanden kwijt.',
    g2_title: 'Racegame',
    g2_short: 'Een eenvoudige racegame. Mijn eerste keer werken met rijfysica en baanontwerp.',
    g2_long1: 'Een leuk project waarbij ik vol inzette op level design en iets levends wilde maken. (10 jaar)',
    g2_long2: 'Gebruikt het basis-auto-sample van UE5, met veel aandacht voor de mapindeling.',
    g2_long3: 'Deze bestanden zijn ook helaas kwijt.',
    g3_title: 'Job Runner',
    g3_short: 'Een baan-simulator. Nog niet af — prioriteit verlegd naar Escape The Box.',
    g3_long1: 'Begonnen rond mijn 14e. Een serieus en belangrijk project voor mij.',
    g3_long2: 'Geleerd: UI-design, geluidseffecten, spelbalans, visuele effecten en veel meer.',
    g3_long3: 'Dit was het project dat me echt serieus over game development liet nadenken.',
    g4_title: 'Endless Runner',
    g4_short: 'Klassieke endless runner. Gebouwd om blueprints en gameloops te leren.',
    g4_long1: 'Begonnen na een code-blokkade in mijn vorige game. Van scratch gebouwd. (14–15 jaar)',
    g4_long2: 'Een leuk project, maar de bestanden raakten helaas beschadigd en konden niet worden hersteld.',
    g5_title: 'Escape the Box',
    g5_title_short: 'Escape the Box',
    g5_short: 'Een puzzel-parkour game waarbij je ontsnapt uit een doos. Mix van hersenkrakers en bewegingsmechanismen.',
    g5_long1: 'Mijn huidige project, begonnen op 15. Ik daagde mezelf uit: nul tutorials — alleen mijn eigen kennis en bronnen zoals Google, Reddit en GitHub.',
    g5_long2: 'Ik besloot ook de reis te documenteren, dus maakte ik een YouTube-kanaal en heb inmiddels meerdere devlogs gepost.',
    g5_long3: 'Nog volop mee bezig.',
    // More projects
    more_title:   'Meer projecten',
    more_sub:     'Ik maakte niet alleen games — ik bouwde ook <strong>meerdere fysieke</strong> projecten.',
    h2_title:     'H2 RC Grand Prix',
    h2_short:     'Waterstof RC-auto gebouwd en geraced. 7e geworden en gewonnen als meest efficiënte rijder — 30 rondjes op één waterstofcel.',
    h2_long1:     'We kregen basismateriaal inclusief HydroSticks en moesten onder strikte voorwaarden een rijdend voertuig bouwen.',
    h2_long2:     'Ik nam initiatief op meerdere vlakken — coördinatie, 3D-design, carrosserie en elektronica.',
    h2_long3:     'Een van onze innovaties was een stootdempend systeem om de CPU te beschermen bij achterkant-botsingen.',
    h2_long4:     'Ik ontwikkelde praktische vaardigheden in mechanica, leiderschap, taakverdeling en teamwork.',
    race_pt1:     '▶ Race deel 1',
    race_pt2:     '▶ Race deel 2',
    // School
    school_title: 'School',
    ms_title:     'Middelbare school (onder)',
    ms_years:     '1e jaar: STEM · 2e jaar: STEM wetenschappen',
    ms_cta:       'Bekijk mijn middelbare schoolprojecten ↓',
    hs_title:     'Middelbare school (boven)',
    hs_years:     '1e en 2e jaar: technologische wetenschappen',
    hs_cta:       'Bekijk mijn projecten ↓',
    ms_proj_title: 'Projecten middelbare school (onder)',
    hs_proj_title: 'Projecten middelbare school (boven)',
    egg_title:    'Ei-crashuitdaging',
    egg_short:    'Een autootje gebouwd waarmee een ei een crash van een helling overleeft.',
    egg_long1:    'We moesten een klein houten autootje bouwen volledig uit eigen fantasie.',
    egg_long2:    'Ik omringde de auto met sponzen en maakte een gecushineerd compartiment voor het ei dat alleen via elastieken verbonden was — zodat het voor- en achterwaarts kon bewegen bij de klap.',
    bridge_title: 'Brug',
    bridge_short: 'Brug gebouwd van kleine houten stokjes en tape. Doel: 3–5 kg dragen.',
    bridge_long1: 'Gebouwd in een groep van 3, met slechts 4 uur werktijd per week over 2 weken.',
    bridge_long2: 'We onderzochten verschillende brugontwerpen en kozen voor een vergrendeld stokjesontwerp versterkt met tape.',
    bridge_long3: 'Op testdag werd onze brug onderweg naar de test laten vallen — hij hield nog steeds 3,5 kg en we scoorden zo\'n 60%.',
    spider_title: 'Spinnenrobot',
    spider_short: 'Een trillende spin gebouwd die obstakels ontwijkt via draadvoelers.',
    spider_long1: 'De draadvoelers werkten als snorharen — als er één boog bij contact met een object, draaide de spin de andere kant op.',
    spider_long2: 'Onderdelen: een batterij, een kleine trilmotor, draden en knoopschakelaars met lange hendels als snorharen.',
    spider_long3: 'Mijn eerste echte praktijkervaring met basiselektronica.',
    hrc_short:    'Waterstof RC-auto gebouwd en geraced tegen andere scholen in het 2e jaar.',
    hrc_long1:    'In het 2e jaar van de middelbare school moesten we een waterstof RC-auto bouwen en racen tegen andere scholen.',
    hrc_long2:    'We eindigden 7e en wonnen de prijs voor meest efficiënt rijden — 30 rondjes op één waterstofcel.',
    hrc_long3:    'Ik deed 3D-design, carrosserieontwerp, elektronica en reed zelf in de race.',
    full_story:   'Volledig verhaal',
    // Contact
    contact_title: 'Contact',
    contact_p:     'Wil je mijn voortgang volgen, samenwerken of gewoon over games praten? Neem contact op.',
    // Devlog page
    back_link:        '← Terug naar portfolio',
    live_badge:       'In actieve ontwikkeling',
    header_desc:      'De ontwikkeling van mijn huidige game — gebouwd zonder tutorials, alleen met mijn eigen kennis en bronnen zoals Google, Reddit en GitHub.',
    stat_started:     'Gestart',
    stat_started_val: 'Op 15-jarige leeftijd',
    stat_engine:      'Engine',
    stat_devlogs:     'Devlogs gepost',
    stat_status:      'Status',
    stat_status_val:  'In ontwikkeling',
    stat_tutorials:   'Tutorials gebruikt',
    filter_all:       'Alles',
    all_episodes:     'Alle afleveringen',
    ep3_label:        'Aflevering 03',
    ep3_title:        'Devlog #3 — geluidseffecten',
    ep3_p1:           'De derde devlog voor Escape the Box. Deze aflevering behandelt hoe ik de speler geluiden heb gegeven, samen met andere objecten zoals knoppen, ...',
    ep_rule:          'Een van de hoofdregels die ik mezelf heb gesteld: geen tutorials. Alles moest komen uit mijn eigen denken, of uit geschreven bronnen zoals Google, Reddit en GitHub.',
    ep2_label:        'Aflevering 02',
    ep2_title:        'Devlog #2 — Wachtwoordsysteem',
    ep2_p1:           'De tweede devlog voor Escape the Box. Deze aflevering behandelt hoe ik het wachtwoordsysteem voor level 3 heb gemaakt.',
    ep1_label:        'Aflevering 01',
    ep1_title:        'Devlog #1 — Het begin',
    ep1_p1:           'De eerste devlog voor Escape the Box. Deze aflevering behandelt hoe ik level 3 heb afgerond door het wachtwoordsysteem toe te voegen.',
    tag_sounds:       'geluidseffecten',
    tag_sysprod:      'systeemproductie',
    tag_notut:        'Geen tutorials',
    tag_lvl3:         'Level 3',
    tag_lvldesign:    'Level design',
    upcoming_title:   'Volgende aflevering',
    upcoming_ep:      'Aflevering 04 — In ontwikkeling',
    upcoming_li1:     'Tijdelijke levels upgraden.',
    upcoming_li2:     'Meer fun toevoegen aan de omgeving.',
  }
};

// ---- Apply translations to all [data-i18n] elements ----
function applyLanguage(lang) {
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  // Update the toggle button label (shows the OTHER language you can switch to)
  const btn = document.getElementById('lang-toggle');
  if (btn) {
    btn.querySelector('.lang-label').textContent = lang === 'en' ? 'EN' : 'NL';
    btn.setAttribute('aria-label', lang === 'en' ? 'Schakel naar Nederlands' : 'Switch to English');
  }

  // Update the <html> lang attribute
  document.documentElement.setAttribute('lang', lang);
}

// ---- Read saved language (or default to 'en') ----
let currentLang = localStorage.getItem('jesse_lang') || 'en';
applyLanguage(currentLang);

// ---- Toggle button click ----
const langToggle = document.getElementById('lang-toggle');
if (langToggle) {
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'nl' : 'en';
    localStorage.setItem('jesse_lang', currentLang);
    applyLanguage(currentLang);
  });
}

// ---- Sync across tabs ----
// When localStorage changes in another tab, update this tab too
window.addEventListener('storage', (e) => {
  if (e.key === 'jesse_lang' && e.newValue) {
    currentLang = e.newValue;
    applyLanguage(currentLang);
  }
});
