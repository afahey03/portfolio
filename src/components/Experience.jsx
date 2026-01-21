import React from 'react';

const Experience = () => {
    const parseDate = (dateStr) => {
        if (dateStr === 'Present') {
            return new Date();
        }
        const [month, year] = dateStr.split(' ');
        const monthMap = {
            'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
            'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
        };
        return new Date(parseInt(year), monthMap[month], 1);
    };

    const calculateDuration = (startStr, endStr) => {
        const start = parseDate(startStr);
        const end = parseDate(endStr);

        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        const totalMonths = years * 12 + months + 1;

        if (totalMonths < 12) {
            return `${totalMonths} Month${totalMonths !== 1 ? 's' : ''}`;
        }

        years = Math.floor(totalMonths / 12);
        months = totalMonths % 12;

        if (months === 0) {
            return `${years} yr${years !== 1 ? 's' : ''}`;
        } else {
            return `${years} yr${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
        }
    };

    const experiences = [
        {
            title: 'Software Engineer',
            company: 'The Kenerson Group',
            companyUrl: 'https://treeworks.io',
            startDate: 'December 2025',
            endDate: 'Present',
            location: 'Athol, MA',
            workType: 'Onsite',
            description: 'Full-stack and geospatial software engineering in C# / .NET, React, Express, and SQL Server. Engineered TreeWorks, an urban tree management system built as an extension to Esri\'s ArcGIS Pro and ArcGIS Online platforms, along with TreeAuth, a secure licensing management platform to issue and validate active licenses. Developed Cimplar, Bay State Forestry\'s client plotting and reporting tool.',
            logo: 'TKG.webp'
        },
        {
            company: 'Web Surfing Studios',
            companyUrl: 'https://websurfingstudios.com',
            location: 'Austin, TX',
            workType: 'Remote',
            logo: 'WSS.webp',
            promotions: [
                {
                    title: 'Onboarding Lead',
                    startDate: 'August 2025',
                    endDate: 'Present',
                    description: 'Managed 12 Junior Software Engineer Volunteers, providing support and guidance throughout their onboarding process. Coordinated with leadership to ensure new volunteers were effectively integrated into ongoing projects.'
                },
                {
                    title: 'Volunteer Software Engineer',
                    startDate: 'May 2025',
                    endDate: 'Present',
                    description: 'Full-stack software engineering in C# / .NET, React, AWS, and MySQL. Responsible for constructing and maintaining CI/CD pipelines with Azure DevOps and Git version control, ensuring smooth deployments across development, staging, and production environments. Built an enterprise level email system deployed across the suite of Web Surfing Studios internal and external web applications.'
                }
            ]
        },
        {
            title: 'Point of Sale Software Technician',
            company: 'Aubuchon Company',
            companyUrl: 'https://aubuchon.company',
            startDate: 'June 2025',
            endDate: 'November 2025',
            location: 'Westminster, MA',
            workType: 'Hybrid',
            description: 'Full-stack software engineering in C# / .NET, React, and PostgreSQL. Provided technical support and maintenance for point of sale systems across multiple retail locations. Troubleshoot hardware and software issues and ensure seamless operation of POS terminals. Automated data transfer via PowerShell scripts to streamline reporting and customer management processes. Created and performed automated testing for software releases and expected behavior with Python scripting. Built a full-stack inventory management tool to track and manage all POS systems across Aubuchon Hardware locations.',
            logo: 'Aubuchon.webp'
        }
    ];

    const renderExperienceCard = (exp, i) => {
        if (exp.promotions && exp.promotions.length > 0) {
            const allDates = exp.promotions.flatMap(p => [p.startDate, p.endDate]);
            const startDates = exp.promotions.map(p => parseDate(p.startDate));
            const endDates = exp.promotions.map(p => parseDate(p.endDate));
            const earliestStart = new Date(Math.min(...startDates));
            const latestEnd = new Date(Math.max(...endDates));

            const earliestStartStr = exp.promotions.reduce((earliest, p) => {
                return parseDate(p.startDate) < parseDate(earliest) ? p.startDate : earliest;
            }, exp.promotions[0].startDate);

            const latestEndStr = exp.promotions.reduce((latest, p) => {
                return parseDate(p.endDate) > parseDate(latest) ? p.endDate : latest;
            }, exp.promotions[0].endDate);

            const totalDuration = calculateDuration(earliestStartStr, latestEndStr);

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
                                <p className="work-date" style={{ marginBottom: 0 }}>{totalDuration}</p>
                                <p className="work-date" style={{ marginBottom: 0 }}>
                                    {exp.location}{exp.workType ? ` • ${exp.workType}` : ''}
                                </p>
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
                        {exp.promotions.map((promotion, idx) => {
                            const duration = calculateDuration(promotion.startDate, promotion.endDate);
                            const dateRange = `${promotion.startDate} - ${promotion.endDate}`;

                            return (
                                <div key={idx} style={{ marginTop: idx === 0 ? 12 : 16, paddingLeft: 0 }}>
                                    <h4 className="company" style={{ marginBottom: 4, fontWeight: 500 }}>
                                        {promotion.title}
                                    </h4>
                                    <p className="work-date" style={{ marginBottom: 0 }}>
                                        {dateRange} • {duration}
                                    </p>
                                    {promotion.description && (
                                        <p className="work-description" style={{ marginTop: 8 }}>{promotion.description}</p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }

        const duration = calculateDuration(exp.startDate, exp.endDate);
        const dateRange = `${exp.startDate} - ${exp.endDate}`;

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
                            <p className="work-date" style={{ marginBottom: 0 }}>
                                {dateRange} • {duration}
                            </p>
                            <p className="work-date" style={{ marginBottom: 0 }}>
                                {exp.location}{exp.workType ? ` • ${exp.workType}` : ''}
                            </p>
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
