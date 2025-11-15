import React from 'react';

const About = () => {
    const skills = {
        languages: ['C# / .NET', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Python', 'Java', 'Swift', 'C/C++', 'PowerShell', 'YAML'],
        libraries: ['React', 'React Native', 'Redux', 'jQuery', 'PyTorch', 'NumPy', 'Pandas', 'Scikit-learn', 'Socket.IO'],
        frameworks: ['.NET Core', 'ASP.NET Core', 'ASP.NET MVC', 'Vue.js', 'Bootstrap', 'Windows Forms', 'FastAPI', 'Express.js'],
        databases: ['Microsoft SQL', 'MySQL', 'PostgreSQL'],
        versionControl: ['Git', 'GitHub', 'GitLab', 'Gitea'],
        devops: ['GitHub Workflows', 'Docker', 'Prisma', 'Azure DevOps', 'CI/CD'],
        misc: ['Entity Framework', 'Node.js', 'Windows Installers', 'Windows Server & IIS'],
        aws: ['Elastic Beanstalk', 'Lambda', 'RDS', 'SQS', 'SES', 'Lightsail', 'AppConfig', 'CloudWatch', 'Secrets Manager']
    };

    return (
        <section id="about">
            <h2 className="section-title">About Me</h2>
            <div className="glass-card">
                <p className="about-text">
                    Passionate software developer with expertise in building scalable web applications and APIs.
                    I thrive on solving complex problems and creating innovative solutions that make a real impact in
                    the digital world.
                </p>
                <div className="skills-container">
                    <div className="skill-category">
                        <h3>💻 Languages</h3>
                        <div className="skill-tags">
                            {skills.languages.map((skill, i) => (
                                <span key={i} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div className="skill-category">
                        <h3>📚 Libraries</h3>
                        <div className="skill-tags">
                            {skills.libraries.map((skill, i) => (
                                <span key={i} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div className="skill-category">
                        <h3>🎬 Frameworks</h3>
                        <div className="skill-tags">
                            {skills.frameworks.map((skill, i) => (
                                <span key={i} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div className="skill-category">
                        <h3>🧰 Databases</h3>
                        <div className="skill-tags">
                            {skills.databases.map((skill, i) => (
                                <span key={i} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div className="skill-category">
                        <h3>💾 Version Control</h3>
                        <div className="skill-tags">
                            {skills.versionControl.map((skill, i) => (
                                <span key={i} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div className="skill-category">
                        <h3>👾 DevOps</h3>
                        <div className="skill-tags">
                            {skills.devops.map((skill, i) => (
                                <span key={i} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div className="skill-category">
                        <h3>⚡ Misc</h3>
                        <div className="skill-tags">
                            {skills.misc.map((skill, i) => (
                                <span key={i} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div className="skill-category">
                        <h3>☁️ AWS Services</h3>
                        <div className="skill-tags">
                            {skills.aws.map((skill, i) => (
                                <span key={i} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
