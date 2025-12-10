document.addEventListener('DOMContentLoaded', () => {

    /* --- DATA CONFIG --- */
    
    const projects = [
        {
            title: "LAROLO Land Rover",
            description: "Een custom WordPress-thema ontwikkeld voor Land Rover specialist Larolo. De focus lag op een robuust design dat hun expertise en aanbod overzichtelijk presenteert.",
            tags: ["JavaScript", "PHP", "CSS3", "WordPress", "Design"],
            githublink: "https://github.com/woutvanlommel/LAROLO-lode",
            link: "#", // Deze knop wordt nu verborgen omdat hij '#' is
            image: "./assets/projectimages/larolo.png"
        },
        {
            title: "NextGenMedia rebranding",
            description: "Volledige digitale rebranding voor een mediabureau. Een high-performance website met een strakke UI die de nieuwe huisstijl kracht bijzet.",
            tags: ["JavaScript", "PHP", "CSS3","WordPress", "Design"],
            githublink: "https://github.com/woutvanlommel/nextgenmedia",
            link: "", // Leeg gelaten -> knop wordt verborgen
            image: "./assets/projectimages/nextgenmedia.png"
        },
        {
            title: "JRK Herckenrode website",
            description: "Een informatieve platform voor Jeugd Rode Kruis Herckenrode. Gebouwd om nieuws, activiteiten en inschrijvingen toegankelijk te maken voor leden en ouders.",
            tags: ["JavaScript", "PHP", "CSS3", "WordPress", "Design"],
            githublink: "https://github.com/woutvanlommel/jrk",
            link: "https://www.jrkherckenrode.be/", // Deze wordt wel getoond
            image: "assets/projectimages/jrk-herckenrode.png" 
        },
    ];

    const skills = [
        "JavaScript", "PHP", "HTML5", "CSS3", "MySQL", "Git",
        "Vite", "VS Code", "Laravel", "WordPress Custom Themes",
    ];

    /* --- MOBILE NAVIGATION --- */
    const hamburger = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    /* --- RENDER PROJECTS & PAGINATION --- */
    const projectsContainer = document.getElementById('projects-container');
    const paginationContainer = document.getElementById('pagination-controls');
    const itemsPerPage = 6;
    let currentPage = 1;

    function renderProjects() {
        projectsContainer.innerHTML = ''; 

        // Calculation
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedProjects = projects.slice(start, end);

        // Render Cards
        paginatedProjects.forEach(project => {
            const card = document.createElement('article');
            card.className = 'project-card';
            
            // 1. Check of er Tags zijn
            let tagsHtml = '';
            if (project.tags && project.tags.length > 0) {
                const tagsList = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
                tagsHtml = `<div class="project-tags">${tagsList}</div>`;
            }

            // 2. Check voor GitHub Link (niet leeg en niet '#')
            let githubBtn = '';
            if (project.githublink && project.githublink !== '#' && project.githublink !== '') {
                githubBtn = `
                    <a href="${project.githublink}" class="project-link" target="_blank">
                        View Code <i class="fab fa-github"></i>    
                    </a>`;
            }

            // 3. Check voor Live Link (niet leeg en niet '#')
            let liveBtn = '';
            if (project.link && project.link !== '#' && project.link !== '') {
                liveBtn = `
                    <a href="${project.link}" class="project-link" target="_blank">
                        View online <i class="fa-solid fa-globe"></i>
                    </a>`;
            }

            // 4. Container voor links alleen tonen als er minstens één knop is
            let linksContainerHtml = '';
            if (githubBtn || liveBtn) {
                linksContainerHtml = `<div class="project-links">${githubBtn}${liveBtn}</div>`;
            }
            
            // Image handling (with placeholder fallback logic)
            const imgPath = project.image ? project.image : './assets/project_placeholder.png';

            card.innerHTML = `
                <div class="project-image-container">
                    <img src="${imgPath}" alt="${project.title}" class="project-image" onerror="this.src='./assets/project_placeholder.png'"> 
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.description}</p>
                    
                    ${tagsHtml}
                    ${linksContainerHtml}
                </div>
            `;
            projectsContainer.appendChild(card);
            observer.observe(card); 
        });

        renderPagination();
    }

    function renderPagination() {
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(projects.length / itemsPerPage);

        if (totalPages <= 1) return;

        // Prev Button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderProjects();
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            }
        });
        paginationContainer.appendChild(prevBtn);

        // Number Buttons
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            btn.textContent = i;
            btn.addEventListener('click', () => {
                currentPage = i;
                renderProjects();
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            });
            paginationContainer.appendChild(btn);
        }

        // Next Button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderProjects();
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            }
        });
        paginationContainer.appendChild(nextBtn);
    }

    /* --- RENDER SKILLS --- */
    const skillsContainer = document.getElementById('skills-container');
    function renderSkills() {
        skillsContainer.innerHTML = ''; 
        skills.forEach(skill => {
            const skillTag = document.createElement('div');
            skillTag.className = 'skill-tag';
            skillTag.textContent = skill;
            skillsContainer.appendChild(skillTag);
        });
    }

    /* --- ANIMATIONS (Scroll Observer) --- */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    /* --- INITIALIZATION --- */
    renderProjects();
    renderSkills();

    setTimeout(() => {
        document.querySelectorAll('.skill-tag').forEach(el => observer.observe(el));
    }, 100);
});