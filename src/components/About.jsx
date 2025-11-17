import React from 'react';

const About = () => {
    const education = [
        {
            degree: 'B.A. Computer Science & Religious Studies',
            institution: 'College of the Holy Cross',
            years: '2021 - 2025'
        }
    ];

    return (
        <section id="about">
            <h2 className="section-title">About Me</h2>
            <div className="glass-card">
                <p className="about-text">
                    Passionate software developer with expertise in building scalable web applications and APIs.
                    I thrive on solving complex problems and creating innovative solutions that make a real impact in
                    the digital world.
                </p>
                <div className="education-section">
                    <h3 className="education-heading">Education</h3>
                    {education.map((edu, index) => (
                        <div key={index} className="education-item">
                            <div className="education-degree">{edu.degree}</div>
                            <div className="education-institution">{edu.institution}</div>
                            <div className="education-years">{edu.years}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
