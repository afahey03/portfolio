import React, { useState, useEffect } from 'react';

const Navigation = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        const element = document.querySelector(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setMobileMenuOpen(false);
    };

    return (
        <nav className={scrolled ? 'scrolled' : ''}>
            <div className="nav-container">
                <a href="#top" className="logo" onClick={(e) => handleNavClick(e, '#top')}>
                    <img src="/assets/images/Freeza.webp" alt="AF" className="logo-img" />
                </a>
                <ul className="nav-links">
                    <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a></li>
                    <li><a href="#work" onClick={(e) => handleNavClick(e, '#work')}>Work</a></li>
                    <li><a href="#projects" onClick={(e) => handleNavClick(e, '#projects')}>Projects</a></li>
                    <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a></li>
                </ul>
                <button
                    className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <div className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}>
                <ul className="mobile-nav-links">
                    <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About</a></li>
                    <li><a href="#work" onClick={(e) => handleNavClick(e, '#work')}>Work</a></li>
                    <li><a href="#projects" onClick={(e) => handleNavClick(e, '#projects')}>Projects</a></li>
                    <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
