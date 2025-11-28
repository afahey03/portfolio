import React from 'react';

const About = () => {
    const education = [
        {
            degree: 'Bachelor of Arts - BA, Computer Science & Religious Studies',
            institution: 'College of the Holy Cross',
            years: '2021 - 2025',
            logo: 'HCLogo.webp'
        }/*,
        {
            degree: 'Master of Arts - MA, Theology',
            institution: 'Holy Apostles College and Seminary',
            years: '2026 - Present',
            logo: 'HALogo.webp'
        }*/
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
                        <div key={index} className="education-item" style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                            <div style={{ flex: 1 }}>
                                <div className="education-degree">{edu.degree}</div>
                                <div className="education-institution" style={{ display: 'flex', alignItems: 'center' }}>
                                    {edu.logo && (
                                        <img
                                            src={`assets/logos/${edu.logo}`}
                                            alt={edu.institution + ' logo'}
                                            style={{
                                                height: 32,
                                                width: 'auto',
                                                marginRight: 8,
                                                borderRadius: 6,
                                                background: 'rgba(255,255,255,0.05)'
                                            }}
                                        />
                                    )}
                                    <span>{edu.institution}</span>
                                </div>
                                <div className="education-years">{edu.years}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
