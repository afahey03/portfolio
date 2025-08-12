// Global variables
let particles = [];
let mouseX = 0;
let mouseY = 0;
let canvas, ctx;

// Loading screen
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loadingScreen').classList.add('hidden');
  }, 1000);
});

// Custom cursor
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let trailX = 0;
let trailY = 0;
const smoothing = 0.2; // Adjust for more or less smoothing

// Update mouseX and mouseY on mousemove
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Move the outer ring instantly
  requestAnimationFrame(() => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
});

// Animate the solid dot with smoothing
function animateTrail() {
  // Calculate the distance to the target position
  const dx = mouseX - trailX;
  const dy = mouseY - trailY;

  // Move a fraction of the distance
  trailX += dx * smoothing;
  trailY += dy * smoothing;

  // Apply the new position
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top = trailY + 'px';

  // Continue the animation
  requestAnimationFrame(animateTrail);
}

// Start the animation loop
animateTrail();

// Cursor interactions
document.querySelectorAll('a, button, .project-card, .skill-tag').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    cursor.style.borderColor = '#FF0080';
  });

  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.borderColor = '#00F5FF';
  });
});

// Scroll progress indicator
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.offsetHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('scrollProgress').style.width = scrollPercent + '%';
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNav = document.getElementById('mobileNav');

mobileMenuToggle.addEventListener('click', () => {
  mobileMenuToggle.classList.toggle('active');
  mobileNav.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuToggle.classList.remove('active');
    mobileNav.classList.remove('active');
  });
});

// Typing animation
const typingTexts = [
  'Software Developer',
  'Full-Stack Engineer',
  'Problem Solver',
  'Tech Enthusiast',
  'Code Architect',
  'Led Zeppelin Fan'
];

let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeWriter() {
  const currentText = typingTexts[currentTextIndex];

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
    currentCharIndex--;
  } else {
    typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
    currentCharIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && currentCharIndex === currentText.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
    typeSpeed = 500;
  }

  setTimeout(typeWriter, typeSpeed);
}

// Start typing animation
setTimeout(typeWriter, 1000);

// 3D Particle System with interactive repulsion and scroll parallax
function initParticleSystem() {
  canvas = document.getElementById('particleCanvas');
  ctx = canvas.getContext('2d');
  const particleCount = 120; // Increased particle count for better coverage when scrolling
  const repulsionRadius = 150; // The distance at which particles start reacting to the mouse
  const restoreForce = 0.002; // How quickly particles return to their origin
  const damping = 0.95; // Slows down particle movement for a smoother effect
  let scrollY = 0;
  const scrollSpeed = 0.5; // How fast particles move relative to scroll

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Create particles distributed across a larger vertical area
  const totalHeight = document.documentElement.scrollHeight;
  for (let i = 0; i < particleCount; i++) {
    const x = Math.random() * canvas.width;
    // Distribute particles across the entire scrollable height
    const y = Math.random() * totalHeight * 0.7; // 0.7 to have some particles visible at start
    particles.push({
      x: x,
      y: y,
      originX: x, // The "home" position for the particle
      originY: y, // Original Y position (before scroll adjustment)
      vx: 0,
      vy: 0,
      size: Math.random() * 2 + 1,
      color: `hsl(${180 + Math.random() * 60}, 70%, 60%)`,
      alpha: Math.random() * 0.5 + 0.3
    });
  }

  // Update scroll position
  window.addEventListener('scroll', () => {
    scrollY = window.pageYOffset;
  });

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      // Calculate particle position with scroll offset
      const scrollAdjustedY = p.y - (scrollY * scrollSpeed);

      // Only process particles that are visible on screen (with some buffer)
      if (scrollAdjustedY > -100 && scrollAdjustedY < canvas.height + 100) {
        // Mouse repulsion force
        const dx = p.x - mouseX;
        const dy = scrollAdjustedY - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < repulsionRadius) {
          const force = (repulsionRadius - distance) / repulsionRadius;
          p.vx += (dx / distance) * force * 0.5; // Push away from mouse
          p.vy += (dy / distance) * force * 0.5;
        }

        // Restoring force to pull particles back to their origin
        p.vx += (p.originX - p.x) * restoreForce;
        p.vy += (p.originY - scrollAdjustedY) * restoreForce;

        // Apply damping to slow down the particle
        p.vx *= damping;
        p.vy *= damping;

        // Update position
        p.x += p.vx;
        const newY = scrollAdjustedY + p.vy;

        // Update the stored Y position accounting for scroll
        p.y = newY + (scrollY * scrollSpeed);

        // Boundary collision for X axis
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, newY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }
    });

    requestAnimationFrame(drawParticles);
  }

  drawParticles();
}

// Initialize particle system
initParticleSystem();

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');

      // Add staggered animation for skill tags
      if (entry.target.classList.contains('skill-category')) {
        const tags = entry.target.querySelectorAll('.skill-tag');
        tags.forEach((tag, index) => {
          setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
          }, index * 100);
        });
      }
    }
  });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

// Initialize skill tag animations
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.style.opacity = '0';
  tag.style.transform = 'translateY(20px)';
  tag.style.transition = 'all 0.3s ease';
});

// Navigation scroll effect with active highlighting
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  const scrolled = window.scrollY;

  if (scrolled > 100) {
    nav.style.transform = 'translateX(-50%) scale(0.95)';
    nav.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))';
  } else {
    nav.style.transform = 'translateX(-50%) scale(1)';
    nav.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))';
  }

  // Active navigation highlighting
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrolled >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Project card 3D effect
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    this.style.boxShadow = `${rotateY}px ${-rotateX}px 30px rgba(0, 245, 255, 0.3)`;
  });

  card.addEventListener('mouseleave', function () {
    this.style.transform = '';
    this.style.boxShadow = '';
  });
});

// Skill tag hover effects with random colors
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', function () {
    const colors = ['#00F5FF', '#B24BF3', '#FF0080', '#FFD700'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    this.style.borderColor = randomColor;
    this.style.boxShadow = `0 0 30px ${randomColor}40`;
    this.style.color = randomColor;
    this.style.transform = 'translateY(-3px) scale(1.05)';
  });

  tag.addEventListener('mouseleave', function () {
    this.style.borderColor = '';
    this.style.boxShadow = '';
    this.style.color = '';
    this.style.transform = '';
  });
});

// Add floating particles for decoration
function createFloatingParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.style.position = 'fixed';
  particlesContainer.style.top = '0';
  particlesContainer.style.left = '0';
  particlesContainer.style.width = '100vw';
  particlesContainer.style.height = '100vh';
  particlesContainer.style.pointerEvents = 'none';
  particlesContainer.style.zIndex = '1';
  particlesContainer.style.overflow = 'hidden';
  document.body.appendChild(particlesContainer);

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = ['#00F5FF', '#B24BF3', '#FF0080', '#FFD700'][Math.floor(Math.random() * 4)];
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px currentColor`;
    particle.style.animation = `floatParticle ${Math.random() * 20 + 10}s linear infinite`;
    particle.style.animationDelay = Math.random() * 10 + 's';
    particlesContainer.appendChild(particle);
  }
}

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 0.3;
        }
        90% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize floating particles
createFloatingParticles();

// Parallax scrolling effects
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.hero-avatar');

  parallaxElements.forEach(element => {
    const speed = 0.3;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Back to top button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Button hover animations
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', function () {
    this.style.animation = 'pulse 0.5s ease-in-out';
  });

  btn.addEventListener('animationend', function () {
    this.style.animation = '';
  });
});

// Contact link animations
document.querySelectorAll('.contact-link').forEach(link => {
  link.addEventListener('mouseenter', function () {
    this.style.background = 'linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(178, 75, 243, 0.1))';
    this.style.borderColor = '#00F5FF';
    this.style.transform = 'translateY(-5px) scale(1.02)';
  });

  link.addEventListener('mouseleave', function () {
    this.style.background = '';
    this.style.borderColor = '';
    this.style.transform = '';
  });
});

// Glitch effect trigger on hover
const glitchText = document.querySelector('.glitch-text');
glitchText.addEventListener('mouseenter', () => {
  glitchText.style.animationDuration = '0.3s';
});

glitchText.addEventListener('mouseleave', () => {
  glitchText.style.animationDuration = '725ms';
});

// Preload images for better performance
const imageUrls = [
  'assets/images/HolyCross.png',
  'assets/images/Catcher.png',
  'assets/images/Mabel.png',
  'assets/images/PMA.png',
  'assets/images/Sender.png',
  'assets/images/Spotify.png',
  'assets/images/WSSApply.png'
];

imageUrls.forEach(url => {
  const img = new Image();
  img.src = url;
});

// Advanced intersection observer for different animation types
const advancedObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add different animation classes based on element position
      const rect = entry.boundingClientRect;
      const isFromLeft = rect.left < window.innerWidth / 2;

      if (entry.target.classList.contains('project-card')) {
        if (index % 2 === 0) {
          entry.target.classList.add('slide-left');
        } else {
          entry.target.classList.add('slide-right');
        }
      }

      if (entry.target.classList.contains('skill-category')) {
        entry.target.classList.add('fade-in');
      }

      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Apply advanced observer to specific elements
document.querySelectorAll('.project-card, .skill-category').forEach(el => {
  advancedObserver.observe(el);
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply throttling to scroll-heavy functions
const throttledScroll = throttle(() => {
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

// Accessibility improvements
document.addEventListener('keydown', (e) => {
  // ESC key closes mobile menu
  if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
    mobileMenuToggle.classList.remove('active');
    mobileNav.classList.remove('active');
  }

  // Space or Enter activates buttons
  if ((e.key === ' ' || e.key === 'Enter') && document.activeElement.classList.contains('btn')) {
    e.preventDefault();
    document.activeElement.click();
  }
});

// Error handling for canvas
canvas.addEventListener('error', () => {
  console.warn('Canvas rendering error - falling back to CSS animations');
  canvas.style.display = 'none';
});

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Enhanced portfolio loaded successfully');
});

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
  });
}