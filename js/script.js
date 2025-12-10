document.addEventListener('DOMContentLoaded', () => {

    /* --- DATA CONFIG --- */
    
    // 1. PROJECTS
    const projects = [
        {
            title: "LAROLO Land Rover",
            description: "Moderne weather application die real-time data ophaalt via OpenWeatherMap API met dynamische achtergronden.",
            tags: ["JavaScript", "PHP", "CSS3", "HTML5", "WordPress Custom Theme"],
            githublink: "https://github.com/woutvanlommel/LAROLO-lode",
            link: "#",
            image: "./assets/projectimages/larolo.png"
        },
        {
            title: "NextGenMedia rebranding",
            description: "RESTful API voor een webshop, inclusief authenticatie, product filtering en veilige JWT login implementatie.",
            tags: ["JavaScript", "PHP", "CSS3", "HTML5", "WordPress Custom Theme"],
            githublink: "https://github.com/woutvanlommel/nextgenmedia",
            link: "#",
            image: "./assets/projectimages/nextgenmedia.png"
        },
        {
            title: "JRK Herckenrode website",
            description: "Een custom dashboard voor klantenbeheer, gebouwd met een PHP backend en MySQL database. Inclusief real-time data visualisatie.",
            tags: ["JavaScript", "PHP", "CSS3", "HTML5", "WordPress Custom Theme"],
            githublink: "https://github.com/woutvanlommel/jrk",
            link: "#",
            image: "assets/projectimages/jrk-herckenrode.png" 
        },
    ];

    // 2. SKILLS
    const skills = [
        "JavaScript", 
        "PHP", 
        "HTML5", 
        "CSS3", 
        "MySQL", 
        "Git",
        "Vite", 
        "VS Code", 
        "Laravel",,
        "WordPress Custom Themes",
    ];

    /* --- RENDER LOGIC --- */

    // Render Projects
    const projectsContainer = document.getElementById('projects-container');
    
    function renderProjects() {
        projectsContainer.innerHTML = ''; // Reset container

        projects.forEach(project => {
            const card = document.createElement('article');
            card.className = 'project-card';

            // Generate tags HTML
            const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

            card.innerHTML = `
                <div class="project-image-container">
                    <img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.src='./assets/project_placeholder.png'"> 
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-tags">${tagsHtml}</div>
                    <div class="project-links">
                        <a href="${project.githublink}" class="project-link" target="_blank">
                            View online <i class="fa-solid fa-globe"></i>
                        </a>
                        <a href="${project.link}" class="project-link" target="_blank">
                            View Code <i class="fab fa-github"></i>
                        </a>
                    </div>
                </div>
            `;
            projectsContainer.appendChild(card);
        });
    }

    // Render Skills
    const skillsContainer = document.getElementById('skills-container');

    function renderSkills() {
        skillsContainer.innerHTML = ''; // Reset container
        
        skills.forEach(skill => {
            const skillTag = document.createElement('div');
            skillTag.className = 'skill-tag';
            skillTag.textContent = skill;
            skillsContainer.appendChild(skillTag);
        });
    }

    /* --- INITIALIZATION --- */
    renderProjects();
    renderSkills();

    /* --- ANIMATIONS (Scroll Observer) --- */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Observe all animate-able elements
    setTimeout(() => {
        document.querySelectorAll('.project-card, .skill-tag').forEach(el => {
            observer.observe(el);
        });
    }, 100); // Small delay to ensure DOM is ready
});