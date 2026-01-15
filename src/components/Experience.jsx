import React from 'react';

const Experience = () => {
    const experiences = [
        {
            title: 'Software Engineer',
            company: 'The Kenerson Group',
            companyUrl: 'https://treeworks.io',
            date: 'December 2025 - Present • Athol, MA',
            description: 'Full-stack and geospatial software engineering in C# / .NET, React, Express, and SQL Server. Engineered TreeWorks, an urban tree management system built as an extension to Esri\'s ArcGIS Pro and ArcGIS Online platforms, along with TreeAuth, a secure licensing management platform to issue and validate active licenses.',
            logo: 'TKG.webp'
        },
        {
            company: 'Web Surfing Studios',
            companyUrl: 'https://websurfingstudios.com',
            totalDuration: 'May 2025 - Present • Remote',
            logo: 'WSS.webp',
            promotions: [
                {
                    title: 'Onboarding Lead',
                    date: 'August 2025 - Present',
                    description: 'Managed 12 Junior Software Engineer Volunteers, providing support and guidance throughout their onboarding process. Coordinated with leadership to ensure new volunteers were effectively integrated into ongoing projects.'
                },
                {
                    title: 'Volunteer Software Engineer',
                    date: 'May 2025 - Present',
                    description: 'Full-stack software engineering in C# / .NET, React, AWS, and MySQL. Responsible for constructing and maintaining CI/CD pipelines with Azure DevOps and Git version control, ensuring smooth deployments across development, staging, and production environments. Built an enterprise level email system deployed across the suite of Web Surfing Studios internal and external web applications.'
                }
            ]
        },
        {
            title: 'Point of Sale Software Technician',
            company: 'Aubuchon Company',
            companyUrl: 'https://aubuchon.company',
            date: 'June 2025 - November 2025 • Westminster, MA',
            description: 'Full-stack software engineering in C# / .NET, React, and PostgreSQL. Provided technical support and maintenance for point of sale systems across multiple retail locations. Troubleshoot hardware and software issues and ensure seamless operation of POS terminals. Automated data transfer via PowerShell scripts to streamline reporting and customer management processes. Created and performed automated testing for software releases and expected behavior with Python scripting. Built a full-stack inventory management tool to track and manage all POS systems across Aubuchon Hardware locations.',
            logo: 'Aubuchon.webp'
        }
    ];

    const renderExperienceCard = (exp, i) => {
        // Entry with promotions: Company first, then job titles
        if (exp.promotions && exp.promotions.length > 0) {
            return (
                <div key={i} className="glass-card" style={{ marginBottom: '20px' }}>
                    <div className="work-card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1 }}>
                                <h3 className="work-title" style={{ marginBottom: 0 }}>
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
                                </h3>
                                <p className="work-date" style={{ marginBottom: 8 }}>{exp.totalDuration}</p>
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
                        {exp.promotions.map((promotion, idx) => (
                            <div key={idx} style={{ marginTop: idx === 0 ? 12 : 16, paddingLeft: 0 }}>
                                <h4 className="company" style={{ marginBottom: 4, fontWeight: 500 }}>
                                    {promotion.title}
                                </h4>
                                <p className="work-date" style={{ marginBottom: 8 }}>{promotion.date}</p>
                                {promotion.description && (
                                    <p className="work-description" style={{ marginTop: 8 }}>{promotion.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // Entry without promotions: Job title first, then company
        return (
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
        );
    };

    return (
        <section id="work">
            <h2 className="section-title">Work Experience</h2>
            {experiences.map((exp, i) => renderExperienceCard(exp, i))}
        </section>
    );
};

export default Experience;
