import React from 'react';

const Experience = () => {
    const experiences = [
        {
            title: 'Junior Software Engineer',
            company: 'Web Surfing Studios',
            date: 'May 2025 - Present • Remote',
            description: 'Full-stack software engineering focused on building scalable web applications and REST APIs using C# / .NET, React, AWS, and MySQL. Responsible for constructing and maintaining CI/CD pipelines with Azure DevOps and Git version control, ensuring smooth deployments across development, staging, and production environments. Recently built an enterprise level email system deployed across the suite of Web Surfing Studios internal and external web applications.'
        },
        {
            title: 'Point of Sale Software Technician',
            company: 'Aubuchon Company',
            date: 'June 2025 - Present • Westminster, MA',
            description: 'Provide technical support and maintenance for point of sale systems across multiple retail locations. Troubleshoot hardware and software issues, perform system updates, and ensure seamless operation of POS terminals to enhance customer experience and operational efficiency. Automate data transfer via PowerShell scripts to streamline reporting and customer management processes. Create and perform automated testing for software releases and expected behavior with Python scripting.'
        }
    ];

    return (
        <section id="work">
            <h2 className="section-title">Work Experience</h2>
            {experiences.map((exp, i) => (
                <div key={i} className="glass-card" style={{ marginBottom: '20px' }}>
                    <div className="work-card">
                        <h3 className="work-title">{exp.title}</h3>
                        <p className="company">{exp.company}</p>
                        <p className="work-date">{exp.date}</p>
                        <p className="work-description">{exp.description}</p>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Experience;
