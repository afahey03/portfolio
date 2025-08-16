var particles = [];
var mouseX = 0;
var mouseY = 0;
var canvas = null;
var ctx = null;
window.addEventListener('load', function () {
    setTimeout(function () {
        var loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 1000);
});
var cursor = document.getElementById('cursor');
var cursorTrail = document.getElementById('cursorTrail');
var trailX = 0;
var trailY = 0;
var smoothing = 0.2;
document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) {
        requestAnimationFrame(function () {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }
});
function animateTrail() {
    var dx = mouseX - trailX;
    var dy = mouseY - trailY;
    trailX += dx * smoothing;
    trailY += dy * smoothing;
    if (cursorTrail) {
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
    }
    requestAnimationFrame(animateTrail);
}
animateTrail();
var interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-tag');
interactiveElements.forEach(function (el) {
    el.addEventListener('mouseenter', function () {
        if (cursor) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = '#FF0080';
        }
    });
    el.addEventListener('mouseleave', function () {
        if (cursor) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = '#00F5FF';
        }
    });
});
window.addEventListener('scroll', function () {
    var scrollTop = window.pageYOffset;
    var docHeight = document.body.offsetHeight - window.innerHeight;
    var scrollPercent = (scrollTop / docHeight) * 100;
    var scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
    }
});
var themeToggle = document.getElementById('themeToggle');
var body = document.body;
var savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
if (themeToggle) {
    themeToggle.addEventListener('click', function () {
        var currentTheme = body.getAttribute('data-theme');
        var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}
var mobileMenuToggle = document.getElementById('mobileMenuToggle');
var mobileNav = document.getElementById('mobileNav');
if (mobileMenuToggle && mobileNav) {
    mobileMenuToggle.addEventListener('click', function () {
        mobileMenuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });
}
var mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
mobileNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        if (mobileMenuToggle && mobileNav) {
            mobileMenuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    });
});
var typingTexts = [
    'Software Developer',
    'Full-Stack Engineer',
    'Problem Solver',
    'Tech Enthusiast',
    'Code Architect',
    'Led Zeppelin Fan'
];
var currentTextIndex = 0;
var currentCharIndex = 0;
var isDeleting = false;
var typingElement = document.getElementById('typingText');
function typeWriter() {
    var currentText = typingTexts[currentTextIndex];
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
    var typeSpeed = isDeleting ? 50 : 100;
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
    var canvasElement = document.getElementById('particleCanvas');
    if (!canvasElement)
        return;
    canvas = canvasElement;
    var context = canvas.getContext('2d');
    if (!context)
        return;
    ctx = context;
    var particleCount = 120;
    var repulsionRadius = 150;
    var restoreForce = 0.002;
    var damping = 0.95;
    var scrollY = 0;
    var scrollSpeed = 0.5;
    function resizeCanvas() {
        if (!canvas)
            return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    var totalHeight = document.documentElement.scrollHeight;
    for (var i = 0; i < particleCount; i++) {
        var x = Math.random() * ((canvas === null || canvas === void 0 ? void 0 : canvas.width) || window.innerWidth);
        var y = Math.random() * totalHeight * 0.7;
        particles.push({
            x: x,
            y: y,
            originX: x,
            originY: y,
            vx: 0,
            vy: 0,
            size: Math.random() * 2 + 1,
            color: "hsl(".concat(180 + Math.random() * 60, ", 70%, 60%)"),
            alpha: Math.random() * 0.5 + 0.3
        });
    }
    window.addEventListener('scroll', function () {
        scrollY = window.pageYOffset;
    });
    function drawParticles() {
        if (!ctx || !canvas)
            return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(function (p) {
            var scrollAdjustedY = p.y - (scrollY * scrollSpeed);
            if (scrollAdjustedY > -100 && scrollAdjustedY < canvas.height + 100) {
                var dx = p.x - mouseX;
                var dy = scrollAdjustedY - mouseY;
                var distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < repulsionRadius) {
                    var force = (repulsionRadius - distance) / repulsionRadius;
                    p.vx += (dx / distance) * force * 0.5;
                    p.vy += (dy / distance) * force * 0.5;
                }
                p.vx += (p.originX - p.x) * restoreForce;
                p.vy += (p.originY - scrollAdjustedY) * restoreForce;
                p.vx *= damping;
                p.vy *= damping;
                p.x += p.vx;
                var newY = scrollAdjustedY + p.vy;
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
function createShootingStar(fromClick) {
    if (fromClick === void 0) { fromClick = false; }
    var shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    var startX = -100;
    var startY = Math.random() * (window.innerHeight * 0.4);
    var endX = window.innerWidth + 200;
    var endY = window.innerHeight - Math.random() * (window.innerHeight * 0.4);
    var deltaX = endX - startX;
    var deltaY = endY - startY;
    var controlX = startX + deltaX / 2;
    var controlY = Math.min(startY, endY) - (Math.random() * 100 + 50);
    var duration = fromClick ? 1.5 : 2.5;
    shootingStar.style.position = 'fixed';
    shootingStar.style.zIndex = '9999';
    shootingStar.style.pointerEvents = 'none';
    shootingStar.style.width = '250px';
    shootingStar.style.height = '30px';
    var starHead = document.createElement('div');
    starHead.className = 'star-head';
    starHead.style.position = 'absolute';
    starHead.style.right = '0';
    starHead.style.top = '50%';
    starHead.style.transform = 'translateY(-50%)';
    starHead.style.width = fromClick ? '12px' : '10px';
    starHead.style.height = fromClick ? '12px' : '10px';
    starHead.style.background = '#ffffff';
    starHead.style.borderRadius = '50%';
    starHead.style.boxShadow = fromClick ? "\n    0 0 20px #ffffff,\n    0 0 40px #00F5FF,\n    0 0 60px #00F5FF,\n    0 0 80px #B24BF3,\n    0 0 100px #00F5FF" : "\n    0 0 15px #ffffff,\n    0 0 30px #00F5FF,\n    0 0 45px #00F5FF,\n    0 0 60px #00F5FF";
    starHead.style.zIndex = '10';
    shootingStar.appendChild(starHead);
    var tailContainer = document.createElement('div');
    tailContainer.style.position = 'absolute';
    tailContainer.style.right = '6px';
    tailContainer.style.top = '50%';
    tailContainer.style.transform = 'translateY(-50%)';
    tailContainer.style.width = '240px';
    tailContainer.style.height = '30px';
    tailContainer.style.transformOrigin = 'right center';
    tailContainer.style.zIndex = '1';
    var mainTail = document.createElement('div');
    mainTail.style.position = 'absolute';
    mainTail.style.width = '100%';
    mainTail.style.height = '2px';
    mainTail.style.top = '50%';
    mainTail.style.left = '0';
    mainTail.style.transform = 'translateY(-50%)';
    mainTail.style.background = fromClick ?
        "linear-gradient(to left, \n      rgba(255, 255, 255, 1) 0%,\n      rgba(178, 75, 243, 0.9) 10%,\n      rgba(0, 245, 255, 0.8) 20%,\n      rgba(0, 245, 255, 0.6) 40%,\n      rgba(0, 245, 255, 0.3) 70%,\n      transparent 100%)" :
        "linear-gradient(to left, \n      rgba(255, 255, 255, 1) 0%,\n      rgba(0, 245, 255, 0.9) 10%,\n      rgba(0, 245, 255, 0.7) 30%,\n      rgba(0, 245, 255, 0.4) 60%,\n      transparent 100%)";
    mainTail.style.borderRadius = '1px';
    tailContainer.appendChild(mainTail);
    for (var i = 1; i <= 3; i++) {
        var glowLayer = document.createElement('div');
        glowLayer.style.position = 'absolute';
        glowLayer.style.width = '100%';
        glowLayer.style.height = "".concat(8 + i * 4, "px");
        glowLayer.style.top = '50%';
        glowLayer.style.left = '0';
        glowLayer.style.transform = 'translateY(-50%)';
        glowLayer.style.background = fromClick ?
            "linear-gradient(to left, \n        rgba(178, 75, 243, ".concat(0.5 - i * 0.1, ") 0%,\n        rgba(0, 245, 255, ").concat(0.4 - i * 0.1, ") 20%,\n        transparent 80%)") :
            "linear-gradient(to left, \n        rgba(0, 245, 255, ".concat(0.4 - i * 0.1, ") 0%,\n        rgba(0, 245, 255, ").concat(0.2 - i * 0.05, ") 40%,\n        transparent 80%)");
        glowLayer.style.filter = "blur(".concat(i * 2, "px)");
        glowLayer.style.borderRadius = '4px';
        tailContainer.appendChild(glowLayer);
    }
    var connector = document.createElement('div');
    connector.style.position = 'absolute';
    connector.style.width = '30px';
    connector.style.height = '20px';
    connector.style.right = '-5px';
    connector.style.top = '50%';
    connector.style.transform = 'translateY(-50%)';
    connector.style.background = "radial-gradient(ellipse at right center, \n    rgba(255, 255, 255, 0.8) 0%,\n    rgba(0, 245, 255, 0.5) 30%,\n    transparent 70%)";
    connector.style.filter = 'blur(3px)';
    tailContainer.appendChild(connector);
    shootingStar.appendChild(tailContainer);
    document.body.appendChild(shootingStar);
    function getPointOnCurve(t) {
        var x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX;
        var y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * endY;
        return { x: x, y: y };
    }
    function getTangentAngle(t) {
        var delta = 0.01;
        var p1 = getPointOnCurve(Math.max(0, t - delta));
        var p2 = getPointOnCurve(Math.min(1, t + delta));
        return Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
    }
    var animationProgress = 0;
    var animationStep = 1 / (duration * 60);
    var animationInterval = setInterval(function () {
        animationProgress += animationStep;
        if (animationProgress >= 1) {
            clearInterval(animationInterval);
            setTimeout(function () {
                if (shootingStar.parentNode) {
                    shootingStar.remove();
                }
            }, 200);
            return;
        }
        var currentPos = getPointOnCurve(animationProgress);
        var angle = getTangentAngle(animationProgress);
        shootingStar.style.left = currentPos.x + 'px';
        shootingStar.style.top = currentPos.y + 'px';
        shootingStar.style.transform = "rotate(".concat(angle, "deg)");
        var speed = Math.abs(Math.sin(animationProgress * Math.PI * 2)) * 0.3 + 0.7;
        tailContainer.style.transform = "translateY(-50%) scaleX(".concat(0.8 + speed * 0.4, ")");
        if (animationProgress < 0.1) {
            shootingStar.style.opacity = (animationProgress * 10).toString();
        }
        else if (animationProgress > 0.85) {
            shootingStar.style.opacity = ((1 - animationProgress) * 6.67).toString();
        }
        else {
            shootingStar.style.opacity = '1';
        }
        var pulseFactor = 1 + Math.sin(animationProgress * Math.PI * 8) * 0.2;
        starHead.style.transform = "translateY(-50%) scale(".concat(pulseFactor, ")");
    }, 1000 / 60);
}
function scheduleShootingStar() {
    var delay = (Math.random() * 30 + 60) * 1000;
    setTimeout(function () {
        createShootingStar();
        scheduleShootingStar();
    }, delay);
}
document.addEventListener('click', function () {
    if (Math.random() < 0.05) {
        createShootingStar(true);
    }
});
var logo = document.querySelector('.avatar-image');
if (logo) {
    logo.addEventListener('mouseenter', function () {
        if (Math.random() < 0.20) {
            createShootingStar(true);
        }
    });
}
setTimeout(function () {
    setTimeout(function () {
        createShootingStar();
        scheduleShootingStar();
    }, 3000);
}, 2000);
var hashLinks = document.querySelectorAll('a[href^="#"]');
hashLinks.forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};
var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (entry.target.classList.contains('skill-category')) {
                var tags = entry.target.querySelectorAll('.skill-tag');
                tags.forEach(function (tag, index) {
                    setTimeout(function () {
                        tag.style.opacity = '1';
                        tag.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);
var revealElements = document.querySelectorAll('.reveal');
revealElements.forEach(function (el) {
    observer.observe(el);
});
var skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(function (tag) {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(20px)';
    tag.style.transition = 'all 0.3s ease';
});
window.addEventListener('scroll', function () {
    var nav = document.querySelector('nav');
    var scrolled = window.scrollY;
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
    var sections = document.querySelectorAll('section');
    var navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
    var current = '';
    sections.forEach(function (section) {
        var sectionTop = section.offsetTop;
        var sectionHeight = section.clientHeight;
        if (scrolled >= sectionTop - 200) {
            current = section.getAttribute('id') || '';
        }
    });
    navLinks.forEach(function (link) {
        var _a;
        link.classList.remove('active');
        if (((_a = link.getAttribute('href')) === null || _a === void 0 ? void 0 : _a.slice(1)) === current) {
            link.classList.add('active');
        }
    });
});
var projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(function (card) {
    var targetRotateX = 0;
    var targetRotateY = 0;
    var currentRotateX = 0;
    var currentRotateY = 0;
    var targetShadowX = 0;
    var targetShadowY = 0;
    var currentShadowX = 0;
    var currentShadowY = 0;
    function animate() {
        currentRotateX += (targetRotateX - currentRotateX) * 0.035;
        currentRotateY += (targetRotateY - currentRotateY) * 0.035;
        currentShadowX += (targetShadowX - currentShadowX) * 0.035;
        currentShadowY += (targetShadowY - currentShadowY) * 0.035;
        card.style.transform = "perspective(1000px) rotateX(".concat(currentRotateX, "deg) rotateY(").concat(currentRotateY, "deg) translateY(-10px)");
        card.style.boxShadow = "".concat(currentShadowX, "px ").concat(currentShadowY, "px 30px rgba(0, 245, 255, 0.3)");
        requestAnimationFrame(animate);
    }
    animate();
    card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        targetRotateX = (y - centerY) / 20;
        targetRotateY = (centerX - x) / 20;
        targetShadowX = targetRotateY;
        targetShadowY = -targetRotateX;
    });
    card.addEventListener('mouseleave', function () {
        targetRotateX = 0;
        targetRotateY = 0;
        targetShadowX = 0;
        targetShadowY = 0;
    });
});
var skillTagsInteractive = document.querySelectorAll('.skill-tag');
skillTagsInteractive.forEach(function (tag) {
    tag.addEventListener('mouseenter', function () {
        var colors = ['#00F5FF', '#B24BF3', '#FF0080', '#FFD700'];
        var randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.style.borderColor = randomColor;
        this.style.boxShadow = "0 0 30px ".concat(randomColor, "40");
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
    var particlesContainer = document.createElement('div');
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100vw';
    particlesContainer.style.height = '100vh';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '1';
    particlesContainer.style.overflow = 'hidden';
    document.body.appendChild(particlesContainer);
    for (var i = 0; i < 20; i++) {
        var particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = ['#00F5FF', '#B24BF3', '#FF0080', '#FFD700'][Math.floor(Math.random() * 4)];
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        particle.style.opacity = (Math.random() * 0.3 + 0.1).toString();
        particle.style.boxShadow = "0 0 ".concat(Math.random() * 10 + 5, "px currentColor");
        particle.style.animation = "floatParticle ".concat(Math.random() * 20 + 10, "s linear infinite");
        particle.style.animationDelay = Math.random() * 10 + 's';
        particlesContainer.appendChild(particle);
    }
}
var particleStyle = document.createElement('style');
particleStyle.textContent = "\n    @keyframes floatParticle {\n        0% {\n            transform: translateY(100vh) translateX(0);\n            opacity: 0;\n        }\n        10% {\n            opacity: 0.3;\n        }\n        90% {\n            opacity: 0.3;\n        }\n        100% {\n            transform: translateY(-100vh) translateX(100px);\n            opacity: 0;\n        }\n    }\n";
document.head.appendChild(particleStyle);
createFloatingParticles();
window.addEventListener('scroll', function () {
    var scrolled = window.pageYOffset;
    var parallaxElements = document.querySelectorAll('.hero-avatar');
    parallaxElements.forEach(function (element) {
        var speed = 0.3;
        element.style.transform = "translateY(".concat(scrolled * speed, "px)");
    });
});
var backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', function () {
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
    backToTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
var buttons = document.querySelectorAll('.btn');
buttons.forEach(function (btn) {
    btn.addEventListener('mouseenter', function () {
        this.style.animation = 'pulse 0.5s ease-in-out';
    });
    btn.addEventListener('animationend', function () {
        this.style.animation = '';
    });
});
var contactLinks = document.querySelectorAll('.contact-link');
contactLinks.forEach(function (link) {
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
var glitchText = document.querySelector('.glitch-text');
if (glitchText) {
    glitchText.addEventListener('mouseenter', function () {
        glitchText.style.animationDuration = '0.3s';
    });
    glitchText.addEventListener('mouseleave', function () {
        glitchText.style.animationDuration = '725ms';
    });
}
var imageUrls = [
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
imageUrls.forEach(function (url) {
    var img = new Image();
    img.src = url;
});
var advancedObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
var advancedObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skill-category')) {
                entry.target.classList.add('fade-in');
            }
            entry.target.classList.add('active');
        }
    });
}, advancedObserverOptions);
var advancedElements = document.querySelectorAll('.project-card, .skill-category');
advancedElements.forEach(function (el) {
    advancedObserver.observe(el);
});
function throttle(func, wait) {
    var timeout;
    return function executedFunction() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var later = function () {
            clearTimeout(timeout);
            func.apply(void 0, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
var throttledScroll = throttle(function () {
    // Maybe add throttled scroll logic later idk
}, 16);
window.addEventListener('scroll', throttledScroll);
document.addEventListener('keydown', function (e) {
    var _a;
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
        }
        mobileNav.classList.remove('active');
    }
    if ((e.key === ' ' || e.key === 'Enter') && ((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains('btn'))) {
        e.preventDefault();
        document.activeElement.click();
    }
});
var canvasElement = document.getElementById('particleCanvas');
if (canvasElement) {
    canvasElement.addEventListener('error', function () {
        console.warn('Canvas rendering error - falling back to CSS animations');
        canvasElement.style.display = 'none';
    });
}
document.addEventListener('DOMContentLoaded', function () {
    console.log('Enhanced portfolio loaded successfully');
});
if ('performance' in window) {
    window.addEventListener('load', function () {
        var navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
            var loadTime = navigation.loadEventEnd - navigation.loadEventStart;
            console.log("Page loaded in ".concat(loadTime, "ms"));
        }
    });
}
