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
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

// Navigation scroll effect
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
  });

  card.addEventListener('mouseleave', function () {
    this.style.transform = '';
  });
});

// Skill tag hover effects
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', function () {
    const colors = ['#00F5FF', '#B24BF3', '#FF0080', '#FFD700'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    this.style.borderColor = randomColor;
    this.style.boxShadow = `0 0 30px ${randomColor}40`;
    this.style.color = randomColor;
  });

  tag.addEventListener('mouseleave', function () {
    this.style.borderColor = '';
    this.style.boxShadow = '';
    this.style.color = '';
  });
});

// Add floating particles
function createParticles() {
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

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = ['#00F5FF', '#B24BF3', '#FF0080', '#FFD700'][Math.floor(Math.random() * 4)];
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.opacity = Math.random() * 0.5 + 0.3;
    particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px currentColor`;
    particle.style.animation = `floatParticle ${Math.random() * 20 + 10}s linear infinite`;
    particle.style.animationDelay = Math.random() * 10 + 's';
    particlesContainer.appendChild(particle);
  }
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 0.5;
        }
        90% {
            opacity: 0.5;
        }
        100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles
window.addEventListener('load', createParticles);

// Parallax scrolling
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const gradientBg = document.querySelector('.gradient-bg');
  if (gradientBg) {
    gradientBg.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Active navigation highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href').slice(1) === current) {
      link.style.color = '#00F5FF';
      link.style.textShadow = '0 0 20px #00F5FF';
    }
  });
});

// Button hover animation
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', function () {
    this.style.animation = 'pulse 0.5s';
  });
  btn.addEventListener('animationend', function () {
    this.style.animation = '';
  });
});

// Add pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(pulseStyle);

// Contact link animations
document.querySelectorAll('.contact-link').forEach(link => {
  link.addEventListener('mouseenter', function () {
    this.style.background = 'linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(178, 75, 243, 0.1))';
    this.style.borderColor = '#00F5FF';
  });
  link.addEventListener('mouseleave', function () {
    this.style.background = '';
    this.style.borderColor = '';
  });
});

// Preload images
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

async function getSpotifyNowPlaying() {
  const spotifyContainer = document.getElementById('spotify-now-playing');

  try {
    const response = await fetch('now-playing.json');

    if (response.ok) {
      const data = await response.json();

      if (data.is_playing) {
        const songName = data.song_name;
        const artistName = data.artist_name;

        spotifyContainer.innerHTML = `
                    <svg class="spotify-icon" viewBox="0 0 24 24">
                        <path
                            d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.5 17.5c-.276.13-.541.229-.8.291-.301.071-.692.1-.967.1-.403 0-.756-.109-1.077-.326-.321-.216-.549-.553-.683-.98-.135-.429-.199-.958-.199-1.571 0-1.127.34-1.921 1.018-2.388.679-.467 1.637-.687 2.871-.665.257.004.5.011.729.021.23.01.442.023.636.042l.096-.64c-.184-.047-.384-.075-.599-.085-.216-.01-.43-.016-.642-.016-1.528 0-2.736.376-3.626 1.129-.889.753-1.332 1.748-1.332 2.983 0 .723.23 1.34.69 1.849.46.51 1.096.884 1.908 1.122.812.238 1.879.317 3.197.237.288-.016.577-.042.868-.078l.192-.614zm.447-10.457c-.12.01-.258.016-.402.016-1.288 0-2.316-.323-3.084-.969-.768-.646-1.152-1.486-1.152-2.52 0-.649.197-1.19.591-1.62.395-.43 1.006-.757 1.834-.986.829-.228 1.85-.262 3.064-.105.101.013.2.028.295.045l.097-.611c-.139-.028-.276-.048-.411-.061-.401-.035-.806-.052-1.217-.052-1.428 0-2.55.265-3.366.795-.815.53-1.223 1.258-1.223 2.184 0 .944.385 1.688 1.155 2.232.77.545 1.758.82 2.964.82.176 0 .34-.002.492-.007l.098-.612z" />
                    </svg>
                    <span>🎵 Listening to **${songName}** by ${artistName}</span>
                `;
        spotifyContainer.style.display = 'flex';
      } else {
        spotifyContainer.style.display = 'none';
      }
    } else {
      console.error('Failed to fetch now-playing.json:', response.status);
      spotifyContainer.style.display = 'none';
    }
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    spotifyContainer.style.display = 'none';
  }
}

getSpotifyNowPlaying();

setInterval(getSpotifyNowPlaying, 30000);