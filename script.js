// ============================================
// Custom stylish cursor (desktop) + tap ripple (touch)
// ============================================
const cursorDot = document.getElementById('cursorDot');
const cursorGlow = document.getElementById('cursorGlow');
const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (isFinePointer && cursorDot && cursorGlow) {
  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Dot tracks the real pointer exactly — no lag, so clicking stays precise
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  // Glow ring trails slightly behind for a stylish effect
  function animateGlow() {
    glowX += (mouseX - glowX) * 0.18;
    glowY += (mouseY - glowY) * 0.18;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // Grow + color shift on hoverable elements
  document.querySelectorAll('a, button, .project-card, .contact-card, .exp-card, .tag').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.classList.add('active');
      cursorGlow.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
      cursorDot.classList.remove('active');
      cursorGlow.classList.remove('active');
    });
  });
}

// Tap ripple for touch devices
window.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  const ripple = document.createElement('div');
  ripple.className = 'tap-ripple';
  ripple.style.left = touch.clientX + 'px';
  ripple.style.top = touch.clientY + 'px';
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 650);
}, { passive: true });


const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ============================================
// Typing effect for hero tagline
// Edit the "phrases" array below to change what appears
// ============================================
const phrases = [
  'Software Engineer in the making',
  'Building CampusNova & beyond',
  'Systems · Web · Networking'
];

const typedEl = document.getElementById('typedTagline');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];

  if (!isDeleting) {
    charIndex++;
    typedEl.textContent = current.substring(0, charIndex);
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1700);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.substring(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  const speed = isDeleting ? 40 : 65;
  setTimeout(typeLoop, speed);
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  typedEl.textContent = phrases[0];
} else {
  typeLoop();
}

// ============================================
// Footer year
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================
// Scroll-triggered fade-in for sections
// ============================================
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});
