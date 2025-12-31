import React from 'react';

const Skills = () => {
    const skills = {
        languages: ['C# / .NET', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Python', 'Java', 'Swift', 'C/C++', 'PowerShell', 'YAML', 'SQL'],
        frameworks: ['ASP.NET Core', 'ASP.NET MVC', 'Vue.js', 'Tailwind CSS', 'Express.js', 'React Native', 'Expo', 'WPF', 'Bootstrap'],
        libraries: ['React', 'Redux', 'Axios', 'jQuery', 'Pinia', 'Socket.IO', 'PyTorch', 'NumPy', 'Pandas', 'Scikit-learn', 'Matplotlib'],
        versionControl: ['Git', 'GitHub', 'GitLab', 'Gitea'],
        databases: ['SQL Server', 'PostgreSQL', 'MySQL', 'SQLite'],
        devops: ['CI/CD', 'GitHub Actions', 'Docker', 'Azure DevOps', 'Windows Server & IIS'],
        misc: ['Node.js', 'Entity Framework', 'Prisma', 'Windows Installers'],
        aws: ['Elastic Beanstalk', 'Lightsail', 'AppConfig', 'Secrets Manager', 'SQS', 'SES', 'RDS', 'Lambda', 'S3', 'CloudWatch', 'IAM']
    };

    return (
        <section id="skills">
            <h2 className="section-title">Skills</h2>
            <div className="glass-card">
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
                        <h3>🎬 Frameworks</h3>
                        <div className="skill-tags">
                            {skills.frameworks.map((skill, i) => (
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
                        <h3>💾 Version Control</h3>
                        <div className="skill-tags">
                            {skills.versionControl.map((skill, i) => (
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

export default Skills;
