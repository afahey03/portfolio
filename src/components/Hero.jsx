import React, { useState, useEffect } from 'react';

const Hero = () => {
    const typingTexts = [
        'Software Developer',
        'Full-Stack Engineer',
        'Problem Solver',
        'Tech Enthusiast',
        'Code Architect',
        'Led Zeppelin Fan'
    ];

    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const text = typingTexts[currentIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setCurrentText(text.substring(0, currentText.length + 1));
                if (currentText === text) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                setCurrentText(text.substring(0, currentText.length - 1));
                if (currentText === '') {
                    setIsDeleting(false);
                    setCurrentIndex((currentIndex + 1) % typingTexts.length);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentIndex]);

    return (
        <section className="hero" id="top">
            <div className="hero-content">
                <div className="hero-avatar">
                    <div className="avatar-ring"></div>
                    <img
                        src="assets/images/HolyCross.webp"
                        alt="Aidan Fahey"
                        className="avatar-image"
                    />
                </div>
                <h1 className="glitch-text" data-text="Aidan Fahey">Aidan Fahey</h1>
                <p className="subtitle">
                    <span className="typing-text">{currentText}</span>
                    <span className="cursor-blink">|</span>
                </p>
                <p className="education">
                    B.A. Computer Science & Religious Studies<br />
                    College of the Holy Cross
                </p>
                <div className="cta-buttons">
                    <a href="#projects" className="btn btn-primary" onClick={(e) => handleScroll(e, '#projects')}>View Projects</a>
                    <a href="#contact" className="btn btn-outline" onClick={(e) => handleScroll(e, '#contact')}>Get In Touch</a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
