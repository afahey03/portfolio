import React from 'react';

const Experience = () => {
    const experiences = [
        {
            title: 'Software Engineer',
            company: 'The Kenerson Group',
            companyUrl: 'https://treeworks.io',
            date: 'December 2025 - Present • Athol, MA',
            description: 'Software development in C# / .NET of TreeWorks, an urban tree management system built as an extension to Esri\'s ArcGIS Pro and ArcGIS Online platforms.',
            logo: 'TKG.webp'
        },
        {
            title: 'Volunteer Software Engineer & Onboarding Lead',
            company: 'Web Surfing Studios',
            companyUrl: 'https://www.websurfingstudios.com',
            date: 'May 2025 - Present • Remote',
            description: 'Full-stack software engineering focused on building scalable web applications and REST APIs using C# / .NET, React, AWS, and MySQL. Responsible for constructing and maintaining CI/CD pipelines with Azure DevOps and Git version control, ensuring smooth deployments across development, staging, and production environments. Reviewed pull requests, managed learning modules and provided support to new engineers. Built an enterprise level email system deployed across the suite of Web Surfing Studios internal and external web applications.',
            logo: 'WSS.webp'
        },
        {
            title: 'Point of Sale Software Technician',
            company: 'Aubuchon Company',
            companyUrl: 'https://www.aubuchon.company',
            date: 'June 2025 - November 2025 • Westminster, MA',
            description: 'Provided technical support and maintenance for point of sale systems across multiple retail locations. Troubleshoot hardware and software issues and ensure seamless operation of POS terminals. Automated data transfer via PowerShell scripts to streamline reporting and customer management processes. Created and performed automated testing for software releases and expected behavior with Python scripting. Built a full-stack inventory management tool to track and manage all POS systems across Aubuchon Hardware locations using C#, ASP.NET Core, React, and PostreSQL.',
            logo: 'Aubuchon.webp'
        }
    ];

    return (
        <section id="work">
            <h2 className="section-title">Work Experience</h2>
            {experiences.map((exp, i) => (
                <div key={i} className="glass-card" style={{ marginBottom: '20px' }}>
                    <div className="work-card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1 }}>
                                <h3 className="work-title" style={{ marginBottom: 0 }}>{exp.title}</h3>
                                <p className="company" style={{ marginBottom: 0 }}>
                                    {exp.companyUrl ? (
                                        <a
                                            href={exp.companyUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: 'inherit',
                                                textDecoration: 'none',
                                                cursor: 'pointer',
                                                transition: 'text-decoration 0.2s',
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                        >
                                            {exp.company}
                                        </a>
                                    ) : (
                                        exp.company
                                    )}
                                </p>
                                <p className="work-date" style={{ marginBottom: 0 }}>{exp.date}</p>
                            </div>
                            {exp.logo && (
                                <div
                                    className="logo-container"
                                    style={{
                                        height: 64,
                                        display: 'flex',
                                        alignItems: 'center',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: 12,
                                        overflow: 'hidden',
                                        marginLeft: 16
                                    }}
                                >
                                    <img
                                        src={`assets/logos/${exp.logo}`}
                                        alt={exp.company + ' logo'}
                                        style={{
                                            height: '64px',
                                            width: 'auto',
                                            objectFit: 'contain',
                                            borderRadius: 8,
                                            background: 'transparent',
                                            display: 'block'
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        <p className="work-description" style={{ marginTop: 12 }}>{exp.description}</p>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Experience;
