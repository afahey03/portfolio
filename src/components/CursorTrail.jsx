import React, { useEffect, useRef } from 'react';

const CursorTrail = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticle = (x, y) => {
            if (particles.length < 50) {
                particles.push({
                    x,
                    y,
                    size: Math.random() * 3 + 1,
                    speedX: (Math.random() - 0.5) * 2,
                    speedY: (Math.random() - 0.5) * 2,
                    life: 1,
                    color: Math.random() > 0.5 ? '#8b5cf6' : '#ec4899'
                });
            }
        };

        const updateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, index) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.life -= 0.02;
                particle.size *= 0.98;

                if (particle.life <= 0) {
                    particles.splice(index, 1);
                } else {
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color;
                    ctx.globalAlpha = particle.life;
                    ctx.fill();
                    ctx.globalAlpha = 1;
                }
            });

            animationFrameId = requestAnimationFrame(updateParticles);
        };

        const handleMouseMove = (e) => {
            if (Math.random() < 0.15) {
                createParticle(e.clientX, e.clientY);
            }
        };

        resizeCanvas();
        updateParticles();

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', resizeCanvas);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return <canvas ref={canvasRef} className="cursor-trail" />;
};

export default CursorTrail;
