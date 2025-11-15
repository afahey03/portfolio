import React, { useEffect, useRef } from 'react';

const StarField = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let stars = [];
        let spiralAngle = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = document.body.scrollHeight;
        };

        const createStars = (count) => {
            stars = [];
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random(),
                    layer: Math.random() // For parallax
                });
            }
        };

        const drawGalaxySpiral = () => {
            const centerX = canvas.width / 2;
            const centerY = canvas.height * 0.3;
            const numArms = 3;
            const particlesPerArm = 200;

            ctx.save();
            ctx.globalCompositeOperation = 'screen';

            for (let arm = 0; arm < numArms; arm++) {
                const armAngle = (arm * Math.PI * 2) / numArms;

                for (let i = 0; i < particlesPerArm; i++) {
                    const t = i / particlesPerArm;
                    const distance = t * Math.min(canvas.width, canvas.height) * 0.5;
                    const angle = armAngle + spiralAngle + t * Math.PI * 5;

                    const x = centerX + Math.cos(angle) * distance;
                    const y = centerY + Math.sin(angle) * distance;

                    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 5);
                    const opacity = (1 - t) * 0.7;

                    if (arm === 0) {
                        gradient.addColorStop(0, `rgba(139, 92, 246, ${opacity})`);
                        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
                    } else if (arm === 1) {
                        gradient.addColorStop(0, `rgba(236, 72, 153, ${opacity})`);
                        gradient.addColorStop(1, 'rgba(236, 72, 153, 0)');
                    } else {
                        gradient.addColorStop(0, `rgba(6, 182, 212, ${opacity})`);
                        gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
                    }

                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(x, y, 3 + t * 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            ctx.restore();
            spiralAngle += 0.001;
        };

        const drawStars = () => {
            const scrollY = window.pageYOffset;
            const isMobile = window.innerWidth <= 768;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw galaxy spiral (desktop only)
            if (!isMobile) {
                drawGalaxySpiral();
            }

            // Draw regular stars with parallax
            stars.forEach(star => {
                const parallaxOffset = scrollY * star.layer * 0.5;
                const adjustedY = star.y - parallaxOffset;

                ctx.beginPath();
                ctx.arc(star.x, adjustedY % canvas.height, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();

                // Update position
                star.x += star.vx;
                star.y += star.vy;

                // Wrap around screen
                if (star.x < 0) star.x = canvas.width;
                if (star.x > canvas.width) star.x = 0;
                if (star.y < 0) star.y = canvas.height;
                if (star.y > canvas.height) star.y = 0;

                // Twinkle effect
                star.opacity += (Math.random() - 0.5) * 0.05;
                star.opacity = Math.max(0.1, Math.min(1, star.opacity));
            });

            animationFrameId = requestAnimationFrame(drawStars);
        };

        resizeCanvas();
        createStars(150);
        drawStars();

        window.addEventListener('resize', () => {
            resizeCanvas();
            createStars(150);
        });

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return <canvas ref={canvasRef} className="star-field" />;
};

export default StarField;
