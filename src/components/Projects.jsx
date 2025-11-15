import React from 'react';

const Projects = () => {
    const projects = [
        {
            image: 'assets/images/Gear.webp',
            type: 'Web Application',
            title: 'Gear Crossroads',
            description: 'A full-stack web application for showing off and browsing setups of various domains. Users can create and share setups with image uploads, descriptions, categories.',
            tech: ['Vue.js', 'TypeScript', 'Axios', 'Pinia', 'C#', 'ASP.NET Core', 'Tailwind CSS', 'MySQL', 'AWS RDS', 'Vercel', 'Render'],
            link: 'https://www.gearcrossroads.com/',
            linkText: '🌐 View Live Site'
        },
        {
            image: 'assets/images/Cnectd.webp',
            type: 'Mobile App',
            title: 'Cnectd',
            description: 'A chat application that allows users to create accounts, send friend requests, and send messages in real-time via DM or groupchat. Built with React Native for mobile and a REST API backend using Node.js and Express.',
            tech: ['React Native', 'Docker', 'Prisma', 'PostgreSQL', 'Express', 'Node.js', 'Socket.IO', 'TypeScript'],
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
            type: 'REST API',
            title: 'WSS Email Catcher',
            description: 'A comprehensive email management API and sleek React UI with endpoints for listing, querying, and deleting email database entries. Features a clean REST architecture with proper HTTP methods.',
            tech: ['C#', '.NET Core', 'REST API', 'Entity Framework', 'MySQL', 'AWS RDS', 'React', 'JavaScript'],
            link: 'https://websurfingstudios.com/Projects#email-catcher',
            linkText: '🌐 View Project Page'
        },
        {
            image: 'assets/images/Sender.webp',
            type: 'REST API',
            title: 'WSS Email Service',
            description: 'Centralized email communication API and AWS Lambda with templating support. Handles automated email sending with customizable templates for various email types.',
            tech: ['C#', '.NET Core', 'REST API', 'AWS SQS', 'AWS Lambda', 'AWS RDS', 'MySQL', 'Entity Framework'],
            link: 'https://websurfingstudios.com/Projects#email-service',
            linkText: '🌐 View Project Page'
        },
        {
            image: 'assets/images/PMA.webp',
            type: 'Web Application',
            title: 'PingMyApp',
            description: 'Real-time website monitoring dashboard tracking uptime, response times, and service health. Features instant alerts and comprehensive activity logging.',
            tech: ['C#', 'ASP.NET MVC', 'AWS', 'Real-Time Monitoring', 'Dashboard UI'],
            link: 'https://pingmyapp.com',
            linkText: '🌐 View Live Site'
        },
        {
            image: 'assets/images/WSSApply.webp',
            type: 'Web Application',
            title: 'Web Surfing Studios Candidate Portal',
            description: 'Application management portal for Web Surfing Studios recruitment. Features application tracking, status checking, and a streamlined candidate journey visualization.',
            tech: ['ASP.NET MVC', 'C#', 'Bootstrap', 'AJAX', 'Entity Framework', 'SQL'],
            link: 'https://apply.websurfingstudios.com',
            linkText: '🌐 View Live Site'
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
            image: 'assets/images/Help.webp',
            type: 'Help Bot',
            title: 'WSS AI Help Bot',
            description: 'AI powered Help Bot using Node.js, C# / .NET, and AWS Lambda during a company-wide hackathon to allow users to run to ask commonly asked questions.',
            tech: ['C#', '.NET Core', 'AWS Lambda', 'Node.js'],
            link: 'https://websurfingstudios.com/Projects#help-bot',
            linkText: '🌐 View Project Page'
        },
        {
            image: 'assets/images/Cache.webp',
            type: 'Cache',
            title: 'C++ Cache Simulator',
            description: 'A C++ program that simulates a CPU cache. Supports different cache sizes, block sizes, and associativity levels. Implements LRU cache eviction policy.',
            tech: ['C++', 'LRU', 'Cache'],
            link: 'https://github.com/afahey03/CSCI226-Computer-Systems-and-Organization',
            linkText: '🔗 Visit Repository'
        },
        {
            image: 'assets/images/Furry.webp',
            type: 'Web Application',
            title: 'Furry Friends Lodge',
            description: 'Full-Stack ASP.NET MVC C# application for pet boarding facility to be able to track & manage pet boarding bookings.',
            tech: ['C#', 'ASP.NET MVC', 'Microsoft SQL', 'Entity Framework'],
            link: 'https://github.com/afahey03/Pet-Boarding',
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
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Projects;
