
document.addEventListener('DOMContentLoaded', function () {

    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');


    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();


            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }


            navLinks.forEach(l => l.classList.remove('active'));


            this.classList.add('active');


            const targetId = this.getAttribute('href');


            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                history.pushState(null, null, targetId);
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (targetSection) {

                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });


                history.pushState(null, null, targetId);
            } else {

                history.pushState(null, null, targetId);
            }
        });
    });


    document.addEventListener('click', function (e) {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        }
    });


    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    });
});


function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


// Intersection Observer for Scroll Spy
const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -50% 0px', // Active when element is near top-center
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Explicitly handle Home Scroll Spy due to fixed positioning
window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight * 0.5) {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#home') {
                link.classList.add('active');
            }
        });
    }
});

window.addEventListener('DOMContentLoaded', function () {
    const text1 = "Hello, I'm Abdallah";
    const text2 = "Associate Software Engineer | .NET Developer";
    const el1 = document.getElementById('typewriter');
    const el2 = document.getElementById('netdev');
    let i = 0, j = 0;
    function typeWriter1() {
        if (i < text1.length) {
            el1.textContent += text1.charAt(i);
            i++;
            setTimeout(typeWriter1, 55);
        } else {
            if (el2) {
                el2.textContent = '';
                el2.style.display = 'block';
                typeWriter2();
            }
        }
    }
    function typeWriter2() {
        if (j < text2.length) {
            el2.textContent += text2.charAt(j);
            j++;
            setTimeout(typeWriter2, 55);
        }
    }
    if (el1) {
        el1.textContent = '';
        if (el2) el2.style.display = 'none';
        typeWriter1();
    }
});


window.addEventListener('DOMContentLoaded', function () {
    var emailSpan = document.querySelector('span[title*="Email"]');
    var phoneSpan = document.querySelector('span[title*="Phone"]');
    var githubLink = document.querySelector('a[href*="github"]');
    var linkedinLink = document.querySelector('a[href*="linkedin"]');
    var currentOpenPanel = null;


    function closeExistingPanel() {
        if (currentOpenPanel) {
            var panel = currentOpenPanel;
            var backdrop = document.getElementById('panel-backdrop');

            panel.style.transform = 'translate(-50%, -50%) scale(0)';
            panel.style.opacity = '0';

            if (backdrop) {
                backdrop.style.opacity = '0';
                setTimeout(() => {
                    if (document.body.contains(backdrop)) {
                        document.body.removeChild(backdrop);
                    }
                }, 300);
            }

            setTimeout(() => {
                if (document.body.contains(panel)) {
                    document.body.removeChild(panel);
                }
            }, 300);
            currentOpenPanel = null;
        }
    }

    function createInfoPanel(content, type) {

        closeExistingPanel();


        var backdrop = document.createElement('div');
        backdrop.id = 'panel-backdrop';

        document.body.appendChild(backdrop);


        setTimeout(() => {
            backdrop.style.opacity = '1';
        }, 10);

        var panel = document.createElement('div');
        panel.className = 'contact-info-panel';
        if (type === 'phone') {
            panel.classList.add('phone-popup-mode');
        }
        panel.innerHTML = content;



        var closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';


        panel.appendChild(closeBtn);
        document.body.appendChild(panel);


        currentOpenPanel = panel;


        setTimeout(() => {
            panel.style.transform = 'translate(-50%, -50%) scale(1)';
            panel.style.opacity = '1';
        }, 10);


        function closePanel() {
            if (currentOpenPanel === panel) {
                panel.style.transform = 'translate(-50%, -50%) scale(0)';
                panel.style.opacity = '0';

                var backdrop = document.getElementById('panel-backdrop');
                if (backdrop) {
                    backdrop.style.opacity = '0';
                    setTimeout(() => {
                        if (document.body.contains(backdrop)) {
                            document.body.removeChild(backdrop);
                        }
                    }, 300);
                }

                setTimeout(() => {
                    if (document.body.contains(panel)) {
                        document.body.removeChild(panel);
                    }
                }, 300);
                currentOpenPanel = null;
            }
        }


        function openLink(url) {
            closePanel();
            setTimeout(() => {
                window.open(url, '_blank');
            }, 300);
        }

        closeBtn.onclick = function (e) {
            e.stopPropagation(); // Prevent bubbling to panel
            closePanel();
        };

        panel.style.cursor = 'pointer';
        panel.onclick = function (e) {
            // Check if the click originated from the button or its children (just in case)
            if (e.target === closeBtn || closeBtn.contains(e.target)) {
                return; // Already handled by closeBtn.onclick
            }

            // Otherwise, handle panel click (Link opening / Copy)
            if (type === 'github') {
                openLink('https://github.com/AbdallahJkhader');
            } else if (type === 'linkedin') {
                openLink('https://www.linkedin.com/in/abdallah-khader-b70739230?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app');
            } else if (type === 'email') {

                navigator.clipboard.writeText('abdallahjkhader@gmail.com').then(() => {

                    panel.innerHTML = '<i class="bi bi-check-circle fs-1"></i><br><strong>Email Copied!</strong><br><small>Email address copied to clipboard</small>';
                    setTimeout(() => {
                        closePanel();
                    }, 1500);
                });
            } else if (type === 'phone') {

                navigator.clipboard.writeText('+962782576216').then(() => {

                    panel.classList.remove('phone-popup-mode');
                    panel.innerHTML = '<i class="bi bi-check-circle fs-1"></i><br><strong>Phone Copied!</strong><br><small>Phone number copied to clipboard</small>';
                    setTimeout(() => {
                        closePanel();
                    }, 1500);
                });
            }
        };


        backdrop.onclick = closePanel;




        return panel;
    }


    if (emailSpan) {
        emailSpan.style.cursor = 'pointer';
        emailSpan.onclick = function () {
            createInfoPanel('<img src="gmail icon.png" alt="Gmail" width="40" height="35" style="vertical-align: middle;"><br><strong>abdallahjkhader@gmail.com</strong><br><small>Click to copy email address</small>', 'email');
        };
    }

    if (phoneSpan) {
        phoneSpan.style.cursor = 'pointer';
        phoneSpan.onclick = function () {

            const isLightMode = document.body.classList.contains('light-mode');
            const iconSrc = isLightMode ? 'phone number black.png' : 'phone number white.png';

            createInfoPanel('<img src="' + iconSrc + '" alt="Phone Number" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">', 'phone');
        };
    }

    if (githubLink) {
        githubLink.onclick = function (e) {
            e.preventDefault();
            createInfoPanel('<i class="bi bi-github fs-1"></i><br><strong>github.com/AbdallahJkhader</strong><br><small>Click to open profile</small>', 'github');
        };
    }

    if (linkedinLink) {
        linkedinLink.onclick = function (e) {
            e.preventDefault();
            createInfoPanel('<i class="bi bi-linkedin fs-1"></i><br><strong>linkedin.com/in/abdallah-khader-b70739230</strong><br><small>Click to open profile</small>', 'linkedin');
        };
    }


    const detailBtns = document.querySelectorAll('.details-btn');
    detailBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {

            if (btn.id === 'focusReadBtn') {


                const slides = [
                    // Slide 1: Overview (Original)
                    {
                        id: 1,
                        title: 'Focus & Read',
                        icon: 'focusandreadlogo.jpg',
                        iconWidth: 80,
                        content: `
                            <p class="small mb-3">
                                Distraction-free educational web application built with ASP.NET Core MVC, specifically designed
                                for neurodivergent learners, particularly students with ADHD, to boost focus, organizational skills, and
                                productivity. The platform integrates multiple smart tools, including customizable Pomodoro timers
                                and a Virtual Classes feature. Key AI-powered features include Intelligent Summarization and Quiz
                                generation.
                            </p>
                            <p class="small mb-3">
                                My role focused heavily on Back-End development. Implemented as a B.Sc. graduation project at
                                The Hashemite University.
                            </p>
                        `
                    },
                    // Slide 2: Problem Statement (Original)
                    {
                        id: 2,
                        title: 'Problem Statement',
                        icon: 'ADHD icon.png',
                        iconWidth: 70,
                        content: `
                            <p class="small mb-3">
                                Traditional study tools often lack features specifically tailored for neurodivergent minds.
                                Students with ADHD frequently struggle with maintaining focus, organizing tasks, and managing time effectively
                                in standard learning environments, leading to decreased productivity and academic stress.
                                There is a need for a specialized platform that combines distraction-blocking, smart scheduling,
                                and accessible reading formats in one cohesive environment.
                            </p>
                        `
                    },
                    // Slide 3: Requirements (Original)
                    {
                        id: 3,
                        title: 'Requirement Document',
                        icon: 'req doc icon.png',
                        iconWidth: 70,
                        content: `
                            <div class="row">
                                <div class="col-12 mb-3">
                                    <h6 class="fw-bold text-primary mb-2">Functional Reqs:</h6>
                                    <ul class="small mb-0">
                                        <li>User Authentication & Profile Management</li>
                                        <li>Timer and Focus Tools</li>
                                        <li>AI Features (Summarization, Quizzes, Flashcards)</li>
                                        <li>Progress Tracker & Organization Tools</li>
                                        <li>Study tools like notes & videos</li>
                                    </ul>
                                </div>
                                <div class="col-12">
                                    <h6 class="fw-bold text-primary mb-2">Non-Functional Reqs:</h6>
                                    <ul class="small mb-0">
                                        <li><strong>Accessibility:</strong> WCAG 2.1 compliance for neurodivergent users.</li>
                                        <li><strong>Performance:</strong> Fast load times (< 2s) for study and focus tools.</li>
                                        <li><strong>Reliability:</strong> 99.9% uptime for study sessions.</li>
                                        <li><strong>Scalability:</strong> Support widespread student usage.</li>
                                    </ul>
                                </div>
                            </div>
                        `
                    },
                    // Slide 4: Project Video
                    {
                        id: 4,
                        title: 'Project Video',
                        icon: 'focusandreadlogo.jpg',
                        iconWidth: 50,
                        content: `
                            <div class="w-100 text-center">
                                <video controls class="rounded shadow-sm" style="max-width: 100%; max-height: 380px; width: auto; height: auto; background-color: #000;">
                                    <source src="focus video.MP4" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        `
                    },
                    // Slide 5: Used Technologies
                    {
                        id: 5,
                        title: 'Used Technologies',
                        icon: 'web technologies icon.png',
                        iconWidth: 50,
                        content: `
                             <div class="p-2">
                                <div class="mb-4">
                                    <h6 class="fw-bold text-light mb-2"><i class="bi bi-hdd-stack me-2 text-info"></i>Backend & Database</h6>
                                    <div class="d-flex flex-wrap gap-2">
                                        <span class="badge bg-gradient-primary">ASP.NET Core MVC</span>
                                        <span class="badge bg-gradient-primary">C#</span>
                                        <span class="badge bg-gradient-primary">SQL Server</span>
                                        <span class="badge bg-gradient-primary">Entity Framework Core</span>
                                        <span class="badge bg-gradient-primary">Clean Architecture</span>
                                    </div>
                                </div>
                                <div class="mb-4">
                                    <h6 class="fw-bold text-light mb-2"><i class="bi bi-window-sidebar me-2 text-info"></i>Frontend & UI</h6>
                                    <div class="d-flex flex-wrap gap-2">
                                        <span class="badge bg-gradient-primary">HTML5</span>
                                        <span class="badge bg-gradient-primary">CSS3</span>
                                        <span class="badge bg-gradient-primary">JavaScript</span>
                                        <span class="badge bg-gradient-primary">Bootstrap 5</span>
                                        <span class="badge bg-gradient-primary">Responsive Design</span>
                                    </div>
                                </div>
                                <div>
                                    <h6 class="fw-bold text-light mb-2"><i class="bi bi-robot me-2 text-info"></i>AI & Tools</h6>
                                    <div class="d-flex flex-wrap gap-2">
                                        <span class="badge bg-gradient-primary">Groq API</span>
                                        <span class="badge bg-gradient-primary">Git & GitHub</span>
                                        <span class="badge bg-gradient-primary">Visual Studio</span>
                                        <span class="badge bg-gradient-primary">Agile/Scrum</span>
                                    </div>
                                </div>
                            </div>
                        `
                    }
                ];

                function getSlideHTML(slideIndex) {
                    const slide = slides[slideIndex];
                    const hasPrev = slideIndex > 0;
                    const hasNext = slideIndex < slides.length - 1;

                    return `
                        <div id="fr-slide-${slide.id}" class="text-start p-3 fade-in">
                            <div class="d-flex align-items-center mb-3">
                                <img src="${slide.icon}" alt="${slide.title}" width="${slide.iconWidth}" class="rounded-3 shadow-sm me-3" style="object-fit: contain;">
                                <h4 class="fw-bold mb-0">${slide.title}</h4>
                                <div class="ms-auto d-flex gap-2">
                                    ${hasPrev ? `<i id="fr-prev-btn" class="bi bi-arrow-left-circle-fill fs-2 cursor-pointer text-info" role="button" title="Previous"></i>` : ''}
                                    ${hasNext ? `<i id="fr-next-btn" class="bi bi-arrow-right-circle-fill fs-2 cursor-pointer text-info" role="button" title="Next"></i>` : ''}
                                </div>
                            </div>
                            <div class="carousel-content">
                                ${slide.content}
                            </div>
                        </div>
                    `;
                }


                const wrapperHTML = `<div id="fr-carousel-content">${getSlideHTML(0)}</div>`;


                const panel = createInfoPanel(wrapperHTML, 'project-details');


                function attachNavListeners(currentIndex) {
                    const contentContainer = document.getElementById('fr-carousel-content');
                    if (!contentContainer) return;

                    const prevBtn = document.getElementById('fr-prev-btn');
                    const nextBtn = document.getElementById('fr-next-btn');

                    if (prevBtn) {
                        prevBtn.onclick = (e) => {
                            e.stopPropagation();
                            const newIndex = currentIndex - 1;
                            contentContainer.innerHTML = getSlideHTML(newIndex);
                            attachNavListeners(newIndex);
                        };
                    }

                    if (nextBtn) {
                        nextBtn.onclick = (e) => {
                            e.stopPropagation();
                            const newIndex = currentIndex + 1;
                            contentContainer.innerHTML = getSlideHTML(newIndex);
                            attachNavListeners(newIndex);
                        };
                    }
                }


                attachNavListeners(0);
            } else if (btn.id === 'restoMBtn') {

                const restoSlides = [
                    // Slide 1: Overview
                    {
                        id: 1,
                        title: 'RestoM',
                        icon: 'RestoM logo.jpg',
                        iconWidth: 80,
                        content: `
                            <p class="small mb-3">
                                A comprehensive Restaurant Management System designed to streamline operations, from order taking to kitchen execution and billing. 
                                Built with a robust ASP.NET Core Web API backend and an efficient Entity Framework data layer, it ensures consistency and speed in high-pressure environments.
                            </p>
                            <p class="small mb-3">
                                Key features include real-time order processing, inventory tracking, and detailed analytics for business insights.
                            </p>
                        `
                    },
                    // Slide 2: Problem Statement
                    {
                        id: 2,
                        title: 'Problem Statement',
                        icon: 'RestoM logo.jpg',
                        iconWidth: 60,
                        content: `
                            <p class="small mb-3">
                                Manual restaurant operations often lead to miscommunication between the front-of-house and kitchen, resulting in incorrect orders and delays. 
                                Inventory mismanagement can cause unexpected shortages, while a lack of data visibility hinders strategic decision-making. 
                                RestoM addresses these inefficiencies by digitizing the entire workflow.
                            </p>
                        `
                    },
                    // Slide 3: Requirements
                    {
                        id: 3,
                        title: 'Key Requirements',
                        icon: 'req doc icon.png',
                        iconWidth: 60,
                        content: `
                            <div class="row">
                                <div class="col-12 mb-3">
                                    <h6 class="fw-bold text-primary mb-2">Functional Modules:</h6>
                                    <ul class="small mb-0">
                                        <li><strong>POS System:</strong> Fast order entry and billing.</li>
                                        <li><strong>Kitchen Display System (KDS):</strong> Real-time order updates for chefs.</li>
                                        <li><strong>Inventory Management:</strong> Auto-deduction of stock based on recipes.</li>
                                        <li><strong>Analytics Dashboard:</strong> Sales reports and performance metrics.</li>
                                    </ul>
                                </div>
                            </div>
                        `
                    },
                    // Slide 4: Project Video
                    {
                        id: 4,
                        title: 'Project Video',
                        icon: 'RestoM logo.jpg',
                        iconWidth: 50,
                        content: `
                            <div class="w-100 text-center">
                                <video controls class="rounded shadow-sm" style="max-width: 100%; max-height: 380px; width: auto; height: auto; background-color: #000;">
                                    <source src="RestoM video.mp4" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        `
                    },
                    // Slide 5: Used Technologies
                    {
                        id: 5,
                        title: 'Used Technologies',
                        icon: 'web technologies icon.png',
                        iconWidth: 50,
                        content: `
                             <div class="p-2">
                                <div class="mb-4">
                                    <h6 class="fw-bold text-light mb-2"><i class="bi bi-hdd-stack me-2 text-info"></i>Backend & Database</h6>
                                    <div class="d-flex flex-wrap gap-2">
                                        <span class="badge bg-gradient-primary">ASP.NET Core Web API</span>
                                        <span class="badge bg-gradient-primary">C#</span>
                                        <span class="badge bg-gradient-primary">SQL Server</span>
                                        <span class="badge bg-gradient-primary">Entity Framework Core</span>
                                    </div>
                                </div>
                                <div class="mb-4">
                                    <h6 class="fw-bold text-light mb-2"><i class="bi bi-window-sidebar me-2 text-info"></i>Frontend & Interfaces</h6>
                                    <div class="d-flex flex-wrap gap-2">
                                        <span class="badge bg-gradient-primary">HTML5/CSS3</span>
                                        <span class="badge bg-gradient-primary">JavaScript</span>
                                        <span class="badge bg-gradient-primary">Bootstrap 5</span>
                                        <span class="badge bg-gradient-primary">Swagger UI</span>
                                    </div>
                                </div>
                                <div>
                                    <h6 class="fw-bold text-light mb-2"><i class="bi bi-tools me-2 text-info"></i>Tools</h6>
                                    <div class="d-flex flex-wrap gap-2">
                                        <span class="badge bg-gradient-primary">Git & GitHub</span>
                                        <span class="badge bg-gradient-primary">Visual Studio</span>
                                        <span class="badge bg-gradient-primary">Postman</span>
                                    </div>
                                </div>
                            </div>
                        `
                    }
                ];

                function getRestoSlideHTML(slideIndex) {
                    const slide = restoSlides[slideIndex];
                    const hasPrev = slideIndex > 0;
                    const hasNext = slideIndex < restoSlides.length - 1;

                    return `
                        <div id="rm-slide-${slide.id}" class="text-start p-3 fade-in">
                            <div class="d-flex align-items-center mb-3">
                                <img src="${slide.icon}" alt="${slide.title}" width="${slide.iconWidth}" class="rounded-3 shadow-sm me-3" style="object-fit: contain;">
                                <h4 class="fw-bold mb-0">${slide.title}</h4>
                                <div class="ms-auto d-flex gap-2">
                                    ${hasPrev ? `<i id="rm-prev-btn" class="bi bi-arrow-left-circle-fill fs-2 cursor-pointer text-info" role="button" title="Previous"></i>` : ''}
                                    ${hasNext ? `<i id="rm-next-btn" class="bi bi-arrow-right-circle-fill fs-2 cursor-pointer text-info" role="button" title="Next"></i>` : ''}
                                </div>
                            </div>
                            <div class="carousel-content">
                                ${slide.content}
                            </div>
                        </div>
                    `;
                }


                const wrapperHTML = `<div id="rm-carousel-content">${getRestoSlideHTML(0)}</div>`;


                const panel = createInfoPanel(wrapperHTML, 'project-details');


                function attachRestoNavListeners(currentIndex) {
                    const contentContainer = document.getElementById('rm-carousel-content');
                    if (!contentContainer) return;

                    const prevBtn = document.getElementById('rm-prev-btn');
                    const nextBtn = document.getElementById('rm-next-btn');

                    if (prevBtn) {
                        prevBtn.onclick = (e) => {
                            e.stopPropagation();
                            const newIndex = currentIndex - 1;
                            contentContainer.innerHTML = getRestoSlideHTML(newIndex);
                            attachRestoNavListeners(newIndex);
                        };
                    }

                    if (nextBtn) {
                        nextBtn.onclick = (e) => {
                            e.stopPropagation();
                            const newIndex = currentIndex + 1;
                            contentContainer.innerHTML = getRestoSlideHTML(newIndex);
                            attachRestoNavListeners(newIndex);
                        };
                    }
                }


                attachRestoNavListeners(0);

            } else {
                // Default "Coming Soon" for other buttons
                createInfoPanel('<i class="bi bi-hourglass-split fs-1"></i><br><strong>Coming Soon!</strong><br><small>This feature is under development</small>', 'coming-soon');
            }
        });
    });
});


window.addEventListener('DOMContentLoaded', function () {
    var downloadBtn = document.getElementById('downloadBtn');


    if (downloadBtn) {
        downloadBtn.addEventListener('click', function () {

            const link = document.createElement('a');
            link.href = 'Abdallah J. Khader CV.pdf';
            link.target = '_blank';


            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);


            const originalText = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Opened!';
            downloadBtn.classList.remove('btn-primary');
            downloadBtn.classList.add('btn-success');


            setTimeout(() => {
                downloadBtn.innerHTML = originalText;
                downloadBtn.classList.remove('btn-success');
                downloadBtn.classList.add('btn-primary');
            }, 3000);
        });
    }
});
/* Theme Toggling Logic */
window.addEventListener('DOMContentLoaded', function () {
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn.querySelector('i');

    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.remove('bi-sun-fill');
        themeIcon.classList.add('bi-moon-fill');
    }

    themeToggleBtn.addEventListener('click', function () {
        document.body.classList.toggle('light-mode');

        if (document.body.classList.contains('light-mode')) {
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-fill');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('bi-moon-fill');
            themeIcon.classList.add('bi-sun-fill');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Sticky Sidebar Layout Logic
    window.addEventListener('scroll', function () {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const skillsTop = skillsSection.getBoundingClientRect().top;
            // Trigger when skills section is near the top (e.g., under navbar + some offset)
            // 150px is roughly navbar height (80px) + some buffer
            if (skillsTop <= 150) {
                document.body.classList.add('scrolled-sidebar-active');
            } else {
                document.body.classList.remove('scrolled-sidebar-active');
            }
        }
    });
});
