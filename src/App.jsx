import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import StarField from './components/StarField';
import Navigation from './components/Navigation';
import './App.css';

function App() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const scrollPercent = (scrollTop / docHeight) * 100;
                    setScrollProgress(scrollPercent);
                    ticking = false;
                });
                ticking = true;
            }
        };

        handleScroll(); // Initial calculation
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="app">
            <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
            <StarField />
            <Navigation />

            <main>
                <Hero />
                <About />
                <Experience />
                <Projects />
                <Contact />
            </main>

            <a
                href="/assets/docs/AidanFaheyResume2025.pdf"
                className="cv-orbit-btn"
                download
                aria-label="Download résumé"
            >
                CV
            </a>

            <button
                className={`back-to-top ${scrollProgress > 20 ? 'visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Back to top"
            >
                ↑
            </button>

            <footer>
                <p>© 2025 Aidan Fahey. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;
