import React from 'react';

const Projects = () => {
    const projects = [
        {
            image: 'assets/images/Gear.webp',
            type: 'Web Application',
            title: 'Gear Crossroads',
            description: 'A full-stack web application for showing off and browsing setups of various domains. Users can create and share setups with image uploads, descriptions, categories.',
            tech: ['Vue.js', 'TypeScript', 'Axios', 'Pinia', 'C#', 'ASP.NET Core', 'Tailwind CSS', 'Node.js', 'MySQL', 'AWS RDS', 'Vercel', 'Render'],
            link: 'https://gearcrossroads.com/',
            linkText: '🌐 View Live Site'
        },
        {
            image: 'assets/images/Cnectd.webp',
            type: 'Mobile App',
            title: 'Cnectd',
            description: 'A chat application that allows users to create accounts, send friend requests, and send messages in real-time via DM or groupchat. Built with React Native for mobile and a REST API backend using Node.js and Express.',
            tech: ['React Native', 'Docker', 'Prisma', 'PostgreSQL', 'Express.js', 'Node.js', 'Socket.IO', 'TypeScript'],
            link: 'https://github.com/afahey03/cnectd',
            linkText: '🔗 Visit Repository'
        },
        {
            image: 'assets/images/Mabel.webp',
            type: 'Programming Language',
            title: 'Mabel',
            description: 'An object oriented programming language named after my Chow Chow, supporting OOP features like inheritance, polymorphism, and interfaces.',
            tech: ['OOP', 'Compiler Construction', 'Programming Language Design', 'Parser', 'Lexer', 'Virtual Machine', 'Grammars', 'Java'],
            link: 'https://github.com/afahey03/Mabel',
            linkText: '🔗 Visit Repository'
        },
        {
            image: 'assets/images/Catcher.webp',
            type: 'Web Application',
            title: 'WSS Email Catcher',
            description: 'A comprehensive email management API and sleek React UI with endpoints for listing, querying, and deleting email database entries. Features a clean REST architecture with proper HTTP methods.',
            tech: ['C#', 'ASP.NET Core', 'REST API', 'Entity Framework', 'MySQL', 'AWS RDS', 'Node.js', 'React', 'JavaScript'],
            link: 'https://websurfingstudios.com/Projects#email-catcher',
            linkText: '📃 View Project Page'
        },
        {
            image: 'assets/images/Sender.webp',
            type: 'REST API',
            title: 'WSS Email Service',
            description: 'Centralized email communication API and AWS Lambda with templating support. Handles automated email sending with customizable templates for various email types.',
            tech: ['C#', 'ASP.NET Core', 'REST API', 'AWS SQS', 'AWS Lambda', 'AWS RDS', 'MySQL', 'Entity Framework'],
            link: 'https://websurfingstudios.com/Projects#email-service',
            linkText: '📃 View Project Page'
        },
        {
            image: 'assets/images/WSSApply.webp',
            type: 'Web Application',
            title: 'Web Surfing Studios Candidate Portal',
            description: 'Application management portal for Web Surfing Studios recruitment. Features application tracking, status checking, and a streamlined candidate journey visualization.',
            tech: ['C#', 'ASP.NET Core', 'React', 'Node.js', 'REST API', 'Bootstrap', 'AJAX', 'Entity Framework', 'MySQL', 'JavaScript'],
            link: 'https://apply.websurfingstudios.com',
            linkText: '🌐 View Live Site'
        },
        {
            image: 'assets/images/Aub.webp',
            type: 'Web Application',
            title: 'Aubuchon Hardware POS Inventory Management System',
            description: 'Inventory management system for Aubuchon Hardware to track and manage POS systems across all stores.',
            tech: ['C#', 'ASP.NET Core', 'React', 'Node.js', 'REST API', 'OAuth2', 'Entity Framework', 'PostgreSQL', 'JavaScript']
        },
        {
            image: 'assets/images/PMA.webp',
            type: 'Web Application',
            title: 'PingMyApp',
            description: 'Real-time website monitoring dashboard tracking uptime, response times, and service health. Features instant alerts and comprehensive activity logging.',
            tech: ['C#', 'ASP.NET MVC', 'AWS', 'MySQL', 'Entity Framework', 'Real-Time Monitoring'],
            link: 'https://pingmyapp.com',
            linkText: '🌐 View Live Site'
        },
        {
            image: 'assets/images/Help.webp',
            type: 'Help Bot',
            title: 'WSS AI Help Bot',
            description: 'AI powered Help Bot using Node.js, C# / .NET, and AWS Lambda during a company-wide hackathon to allow users to run to ask commonly asked questions.',
            tech: ['C#', 'ASP.NET Core', 'AWS Lambda', 'Node.js'],
            link: 'https://websurfingstudios.com/Projects#help-bot',
            linkText: '📃 View Project Page'
        },
        {
            image: 'assets/images/Spotify.webp',
            type: 'Script',
            title: 'Spotify to GitHub Status',
            description: 'A Python script that automatically updates your GitHub status to be whatever you are listening to on Spotify.',
            tech: ['Python', 'GitHub API', 'Spotify API', 'Script'],
            link: 'https://github.com/afahey03/Spotify-GitHub-Status',
            linkText: '🔗 Visit Repository'
        },
        {
            image: 'assets/images/Shortcut.webp',
            type: 'Mobile App',
            title: 'Shortcut',
            description: 'An iPhone Map Application that calculates and displays the shortest distance between the user and their queried and selected location.',
            tech: ['Swift', 'iOS', 'SwiftUI', 'MapKit', 'CoreLocation', "Dijkstra's Algorithm"],
            link: 'https://github.com/afahey03/Shortcut',
            linkText: '🔗 Visit Repository'
        },
        {
            image: 'assets/images/Chess.webp',
            type: 'Web Application',
            title: 'Chess Bot',
            description: 'A Chess web interface, API, and AI that allows the user to play a game of chess against an advanced AI opponent.',
            tech: ['Python', 'PyTorch', 'NumPy', 'FastAPI', 'Quiescence Search', 'Alpha-Beta Pruning'],
            link: 'https://github.com/afahey03/Chess-Bot',
            linkText: '🔗 Visit Repository'
        },
        {
            image: 'assets/images/Cache.webp',
            type: 'Cache',
            title: 'C++ Cache Simulator',
            description: 'A C++ program that simulates a CPU cache. Supports different cache sizes, block sizes, and associativity levels. Implements LRU cache eviction policy.',
            tech: ['C++', 'LRU', 'Cache'],
            link: 'https://github.com/afahey03/CSCI226-Computer-Systems-and-Organization',
            linkText: '🔗 Visit Repository'
        }
    ];

    return (
        <section id="projects">
            <h2 className="section-title">Projects</h2>
            <div className="projects-grid">
                {projects.map((project, i) => (
                    <article key={i} className="project-card">
                        <img src={project.image} alt={project.title} className="project-image" loading="lazy" />
                        <div className="project-content">
                            <span className="project-type">{project.type}</span>
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-description">{project.description}</p>
                            <div className="project-tech">
                                {project.tech.map((tech, j) => (
                                    <span key={j} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                            <div className="project-links">
                                <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                                    {project.linkText}
                                </a>
                                {project.companyLinkedIn && (
                                    <a
                                        href={project.companyLinkedIn}
                                        className="project-linkedin-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Company LinkedIn"
                                    >
                                        <svg className="linkedin-icon" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Projects;
