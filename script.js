"use strict";
let particles = [];
let mouseX = 0;
let mouseY = 0;
let canvas = null;
let ctx = null;
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 1000);
});
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let trailX = 0;
let trailY = 0;
const smoothing = 0.2;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) {
        requestAnimationFrame(() => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }
});
function animateTrail() {
    const dx = mouseX - trailX;
    const dy = mouseY - trailY;
    trailX += dx * smoothing;
    trailY += dy * smoothing;
    if (cursorTrail) {
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
    }
    requestAnimationFrame(animateTrail);
}
animateTrail();
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-tag');
interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        if (cursor) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = '#FF0080';
        }
    });
    el.addEventListener('mouseleave', () => {
        if (cursor) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = '#00F5FF';
        }
    });
});
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
    }
});
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNav = document.getElementById('mobileNav');
if (mobileMenuToggle && mobileNav) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });
}
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (mobileMenuToggle && mobileNav) {
            mobileMenuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    });
});
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
        if (typingElement) {
            typingElement.textContent = currentText.substring(0, currentCharIndex - 1);
        }
        currentCharIndex--;
    }
    else {
        if (typingElement) {
            typingElement.textContent = currentText.substring(0, currentCharIndex + 1);
        }
        currentCharIndex++;
    }
    let typeSpeed = isDeleting ? 50 : 100;
    if (!isDeleting && currentCharIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    }
    else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
        typeSpeed = 500;
    }
    setTimeout(typeWriter, typeSpeed);
}
setTimeout(typeWriter, 1000);
function initParticleSystem() {
    const canvasElement = document.getElementById('particleCanvas');
    if (!canvasElement)
        return;
    canvas = canvasElement;
    const context = canvas.getContext('2d');
    if (!context)
        return;
    ctx = context;
    const particleCount = 120;
    const repulsionRadius = 150;
    const restoreForce = 0.002;
    const damping = 0.95;
    let scrollY = 0;
    const scrollSpeed = 0.5;
    function resizeCanvas() {
        if (!canvas)
            return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    const totalHeight = document.documentElement.scrollHeight;
    for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * (canvas?.width || window.innerWidth);
        const y = Math.random() * totalHeight * 0.7;
        particles.push({
            x: x,
            y: y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
            size: Math.random() * 2 + 1,
            color: `hsl(${180 + Math.random() * 60}, 70%, 60%)`,
            alpha: Math.random() * 0.5 + 0.3
        });
    }
    window.addEventListener('scroll', () => {
        scrollY = window.pageYOffset;
    });
    function drawParticles() {
        if (!ctx || !canvas)
            return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
            const scrollAdjustedY = p.y - (scrollY * scrollSpeed);
            if (scrollAdjustedY > -100 && scrollAdjustedY < canvas.height + 100) {
                const dx = p.x - mouseX;
                const dy = scrollAdjustedY - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < repulsionRadius) {
                    const force = (repulsionRadius - distance) / repulsionRadius;
                    p.vx += (dx / distance) * force * 0.5;
                    p.vy += (dy / distance) * force * 0.5;
                }
                p.vx += (p.originX - p.x) * restoreForce;
                p.vy += (p.originY - scrollAdjustedY) * restoreForce;
                p.vx *= damping;
                p.vy *= damping;
                p.x += p.vx;
                const newY = scrollAdjustedY + p.vy;
                p.y = newY + (scrollY * scrollSpeed);
                if (p.x < 0 || p.x > canvas.width)
                    p.vx *= -1;
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
initParticleSystem();
function createShootingStar(fromClick = false) {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    const startX = -100;
    const startY = Math.random() * (window.innerHeight * 0.4);
    const endX = window.innerWidth + 200;
    const endY = window.innerHeight - Math.random() * (window.innerHeight * 0.4);
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const controlX = startX + deltaX / 2;
    const controlY = Math.min(startY, endY) - (Math.random() * 100 + 50);
    const duration = fromClick ? 1.5 : 2.5;
    shootingStar.style.position = 'fixed';
    shootingStar.style.zIndex = '9999';
    shootingStar.style.pointerEvents = 'none';
    shootingStar.style.width = '250px';
    shootingStar.style.height = '30px';
    const starHead = document.createElement('div');
    starHead.className = 'star-head';
    starHead.style.position = 'absolute';
    starHead.style.right = '0';
    starHead.style.top = '50%';
    starHead.style.transform = 'translateY(-50%)';
    starHead.style.width = fromClick ? '12px' : '10px';
    starHead.style.height = fromClick ? '12px' : '10px';
    starHead.style.background = '#ffffff';
    starHead.style.borderRadius = '50%';
    starHead.style.boxShadow = fromClick ? `
    0 0 20px #ffffff,
    0 0 40px #00F5FF,
    0 0 60px #00F5FF,
    0 0 80px #B24BF3,
    0 0 100px #00F5FF` : `
    0 0 15px #ffffff,
    0 0 30px #00F5FF,
    0 0 45px #00F5FF,
    0 0 60px #00F5FF`;
    starHead.style.zIndex = '10';
    shootingStar.appendChild(starHead);
    const tailContainer = document.createElement('div');
    tailContainer.style.position = 'absolute';
    tailContainer.style.right = '6px';
    tailContainer.style.top = '50%';
    tailContainer.style.transform = 'translateY(-50%)';
    tailContainer.style.width = '240px';
    tailContainer.style.height = '30px';
    tailContainer.style.transformOrigin = 'right center';
    tailContainer.style.zIndex = '1';
    const mainTail = document.createElement('div');
    mainTail.style.position = 'absolute';
    mainTail.style.width = '100%';
    mainTail.style.height = '2px';
    mainTail.style.top = '50%';
    mainTail.style.left = '0';
    mainTail.style.transform = 'translateY(-50%)';
    mainTail.style.background = fromClick ?
        `linear-gradient(to left, 
      rgba(255, 255, 255, 1) 0%,
      rgba(178, 75, 243, 0.9) 10%,
      rgba(0, 245, 255, 0.8) 20%,
      rgba(0, 245, 255, 0.6) 40%,
      rgba(0, 245, 255, 0.3) 70%,
      transparent 100%)` :
        `linear-gradient(to left, 
      rgba(255, 255, 255, 1) 0%,
      rgba(0, 245, 255, 0.9) 10%,
      rgba(0, 245, 255, 0.7) 30%,
      rgba(0, 245, 255, 0.4) 60%,
      transparent 100%)`;
    mainTail.style.borderRadius = '1px';
    tailContainer.appendChild(mainTail);
    for (let i = 1; i <= 3; i++) {
        const glowLayer = document.createElement('div');
        glowLayer.style.position = 'absolute';
        glowLayer.style.width = '100%';
        glowLayer.style.height = `${8 + i * 4}px`;
        glowLayer.style.top = '50%';
        glowLayer.style.left = '0';
        glowLayer.style.transform = 'translateY(-50%)';
        glowLayer.style.background = fromClick ?
            `linear-gradient(to left, 
        rgba(178, 75, 243, ${0.5 - i * 0.1}) 0%,
        rgba(0, 245, 255, ${0.4 - i * 0.1}) 20%,
        transparent 80%)` :
            `linear-gradient(to left, 
        rgba(0, 245, 255, ${0.4 - i * 0.1}) 0%,
        rgba(0, 245, 255, ${0.2 - i * 0.05}) 40%,
        transparent 80%)`;
        glowLayer.style.filter = `blur(${i * 2}px)`;
        glowLayer.style.borderRadius = '4px';
        tailContainer.appendChild(glowLayer);
    }
    const connector = document.createElement('div');
    connector.style.position = 'absolute';
    connector.style.width = '30px';
    connector.style.height = '20px';
    connector.style.right = '-5px';
    connector.style.top = '50%';
    connector.style.transform = 'translateY(-50%)';
    connector.style.background = `radial-gradient(ellipse at right center, 
    rgba(255, 255, 255, 0.8) 0%,
    rgba(0, 245, 255, 0.5) 30%,
    transparent 70%)`;
    connector.style.filter = 'blur(3px)';
    tailContainer.appendChild(connector);
    shootingStar.appendChild(tailContainer);
    document.body.appendChild(shootingStar);
    function getPointOnCurve(t) {
        const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX;
        const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * endY;
        return { x, y };
    }
    function getTangentAngle(t) {
        const delta = 0.01;
        const p1 = getPointOnCurve(Math.max(0, t - delta));
        const p2 = getPointOnCurve(Math.min(1, t + delta));
        return Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
    }
    let animationProgress = 0;
    const animationStep = 1 / (duration * 60);
    const animationInterval = setInterval(() => {
        animationProgress += animationStep;
        if (animationProgress >= 1) {
            clearInterval(animationInterval);
            setTimeout(() => {
                if (shootingStar.parentNode) {
                    shootingStar.remove();
                }
            }, 200);
            return;
        }
        const currentPos = getPointOnCurve(animationProgress);
        const angle = getTangentAngle(animationProgress);
        shootingStar.style.left = currentPos.x + 'px';
        shootingStar.style.top = currentPos.y + 'px';
        shootingStar.style.transform = `rotate(${angle}deg)`;
        const speed = Math.abs(Math.sin(animationProgress * Math.PI * 2)) * 0.3 + 0.7;
        tailContainer.style.transform = `translateY(-50%) scaleX(${0.8 + speed * 0.4})`;
        if (animationProgress < 0.1) {
            shootingStar.style.opacity = (animationProgress * 10).toString();
        }
        else if (animationProgress > 0.85) {
            shootingStar.style.opacity = ((1 - animationProgress) * 6.67).toString();
        }
        else {
            shootingStar.style.opacity = '1';
        }
        const pulseFactor = 1 + Math.sin(animationProgress * Math.PI * 8) * 0.2;
        starHead.style.transform = `translateY(-50%) scale(${pulseFactor})`;
    }, 1000 / 60);
}
function scheduleShootingStar() {
    const delay = (Math.random() * 30 + 60) * 1000;
    setTimeout(() => {
        createShootingStar();
        scheduleShootingStar();
    }, delay);
}
document.addEventListener('click', () => {
    if (Math.random() < 0.05) {
        createShootingStar(true);
    }
});
const logo = document.querySelector('.avatar-image');
if (logo) {
    logo.addEventListener('mouseenter', () => {
        if (Math.random() < 0.20) {
            createShootingStar(true);
        }
    });
}
setTimeout(() => {
    setTimeout(() => {
        createShootingStar();
        scheduleShootingStar();
    }, 3000);
}, 2000);
const hashLinks = document.querySelectorAll('a[href^="#"]');
hashLinks.forEach((anchor) => {
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
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
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
const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach((el) => {
    observer.observe(el);
});
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag) => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(20px)';
    tag.style.transition = 'all 0.3s ease';
});
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const scrolled = window.scrollY;
    if (nav) {
        if (scrolled > 100) {
            nav.style.transform = 'translateX(-50%) scale(0.95)';
            nav.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))';
        }
        else {
            nav.style.transform = 'translateX(-50%) scale(1)';
            nav.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))';
        }
    }
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
    let current = '';
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrolled >= sectionTop - 200) {
            current = section.getAttribute('id') || '';
        }
    });
    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href')?.slice(1) === current) {
            link.classList.add('active');
        }
    });
});
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card) => {
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let targetShadowX = 0;
    let targetShadowY = 0;
    let currentShadowX = 0;
    let currentShadowY = 0;
    function animate() {
        currentRotateX += (targetRotateX - currentRotateX) * 0.035;
        currentRotateY += (targetRotateY - currentRotateY) * 0.035;
        currentShadowX += (targetShadowX - currentShadowX) * 0.035;
        currentShadowY += (targetShadowY - currentShadowY) * 0.035;
        card.style.transform = `perspective(1000px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) translateY(-10px)`;
        card.style.boxShadow = `${currentShadowX}px ${currentShadowY}px 30px rgba(0, 245, 255, 0.3)`;
        requestAnimationFrame(animate);
    }
    animate();
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        targetRotateX = (y - centerY) / 20;
        targetRotateY = (centerX - x) / 20;
        targetShadowX = targetRotateY;
        targetShadowY = -targetRotateX;
    });
    card.addEventListener('mouseleave', () => {
        targetRotateX = 0;
        targetRotateY = 0;
        targetShadowX = 0;
        targetShadowY = 0;
    });
});
const skillTagsInteractive = document.querySelectorAll('.skill-tag');
skillTagsInteractive.forEach((tag) => {
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
        particle.style.opacity = (Math.random() * 0.3 + 0.1).toString();
        particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px currentColor`;
        particle.style.animation = `floatParticle ${Math.random() * 20 + 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 10 + 's';
        particlesContainer.appendChild(particle);
    }
}
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
createFloatingParticles();
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-avatar');
    parallaxElements.forEach((element) => {
        const speed = 0.3;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (backToTop) {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        }
        else {
            backToTop.classList.remove('visible');
        }
    }
});
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
const buttons = document.querySelectorAll('.btn');
buttons.forEach((btn) => {
    btn.addEventListener('mouseenter', function () {
        this.style.animation = 'pulse 0.5s ease-in-out';
    });
    btn.addEventListener('animationend', function () {
        this.style.animation = '';
    });
});
const contactLinks = document.querySelectorAll('.contact-link');
contactLinks.forEach((link) => {
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
const glitchText = document.querySelector('.glitch-text');
if (glitchText) {
    glitchText.addEventListener('mouseenter', () => {
        glitchText.style.animationDuration = '0.3s';
    });
    glitchText.addEventListener('mouseleave', () => {
        glitchText.style.animationDuration = '725ms';
    });
}
const imageUrls = [
    'assets/images/HolyCross.webp',
    'assets/images/Catcher.webp',
    'assets/images/Mabel.webp',
    'assets/images/PMA.webp',
    'assets/images/Sender.webp',
    'assets/images/Spotify.webp',
    'assets/images/WSSApply.webp',
    'assets/images/Shortcut.webp',
    'assets/images/Chess.webp'
];
imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
});
const advancedObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const advancedObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skill-category')) {
                entry.target.classList.add('fade-in');
            }
            entry.target.classList.add('active');
        }
    });
}, advancedObserverOptions);
const advancedElements = document.querySelectorAll('.project-card, .skill-category');
advancedElements.forEach((el) => {
    advancedObserver.observe(el);
});
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
const throttledScroll = throttle(() => {
    // Maybe add throttled scroll logic later idk
}, 16);
window.addEventListener('scroll', throttledScroll);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
        }
        mobileNav.classList.remove('active');
    }
    if ((e.key === ' ' || e.key === 'Enter') && document.activeElement?.classList.contains('btn')) {
        e.preventDefault();
        document.activeElement.click();
    }
});
const canvasElement = document.getElementById('particleCanvas');
if (canvasElement) {
    canvasElement.addEventListener('error', () => {
        console.warn('Canvas rendering error - falling back to CSS animations');
        canvasElement.style.display = 'none';
    });
}
document.addEventListener('DOMContentLoaded', () => {
    console.log('Enhanced portfolio loaded successfully');
});
if ('performance' in window) {
    window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
            const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
            console.log(`Page loaded in ${loadTime}ms`);
        }
    });
}
(function initCvOrbitV2() {
    const cvBtn = document.getElementById('cvOrbitBtn');
    if (!cvBtn)
        return;
    const RESUME_PATH = 'assets/docs/AidanFaheyResume2025.pdf';
    const anchorVH = 0.72;
    const easingY = 0.12;
    const wobbleAmpX = 9;
    const wobbleAmpY = 8;
    const wobbleSpeed1 = 0.0012;
    const wobbleSpeed2 = 0.0019;
    let inertialY = 0;
    const inertialDecay = 0.90;
    const inertialGain = 0.18;
    let currentY = window.innerHeight * anchorVH;
    let onLeft = false;
    let lastScrollY = window.scrollY;
    let cumulativeAbsScroll = 0;
    const flipThresholdPx = 2400;
    let sideShiftX = 0;
    let sideTargetX = 0;
    const easingSide = 0.05;
    function computeLeftShift() {
        const margin = 22;
        const btnW = cvBtn ? cvBtn.offsetWidth : 48;
        return -Math.max(0, window.innerWidth - (margin * 2 + btnW));
    }
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function setSideTarget() {
        sideTargetX = onLeft ? computeLeftShift() : 0;
    }
    setSideTarget();
    window.addEventListener('scroll', () => {
        const dy = window.scrollY - lastScrollY;
        lastScrollY = window.scrollY;
        inertialY += dy * inertialGain;
        cumulativeAbsScroll += Math.abs(dy);
        if (cumulativeAbsScroll >= flipThresholdPx) {
            onLeft = !onLeft;
            setSideTarget();
            cumulativeAbsScroll = 0;
        }
    }, { passive: true });
    window.addEventListener('resize', () => {
        currentY = clamp(currentY, 64, window.innerHeight - 64);
        setSideTarget();
    });
    function tick(now) {
        if (!prefersReduced) {
            const wobbleX = Math.sin(now * wobbleSpeed1) * wobbleAmpX + Math.sin(now * wobbleSpeed2) * 0.5 * wobbleAmpX;
            const wobbleY = Math.cos(now * wobbleSpeed2) * wobbleAmpY;
            const baseTargetY = window.innerHeight * anchorVH;
            const targetY = clamp(baseTargetY + wobbleY + inertialY, 56, window.innerHeight - 56);
            currentY += (targetY - currentY) * easingY;
            sideShiftX += (sideTargetX - sideShiftX) * easingSide;
            inertialY *= inertialDecay;
            cvBtn.style.transform = `translate3d(${wobbleX + sideShiftX}px, ${Math.round(currentY)}px, 0)`;
        }
        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    cvBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = RESUME_PATH;
        link.setAttribute('download', RESUME_PATH.split('/').pop() || 'resume.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
    });
    cvBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            cvBtn.click();
        }
    });
    function clamp(v, min, max) {
        return Math.max(min, Math.min(max, v));
    }
})();
//# sourceMappingURL=script.js.map