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
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            setScrollProgress(scrollPercent);
        };

        window.addEventListener('scroll', handleScroll);
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
                <p>Rochdale, MA</p>
            </footer>
        </div>
    );
}

export default App;
