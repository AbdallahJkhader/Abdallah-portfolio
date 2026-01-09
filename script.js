
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
    rootMargin: '-30% 0px -70% 0px', // Active when element crosses the upper part of the screen
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
    var emailSpan = document.getElementById('emailLink');
    var phoneSpan = document.getElementById('phoneLink');
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
                openLink('https://www.linkedin.com/in/abdallah-j-khader-b70739230');
            } else if (type === 'whatsapp') {
                openLink('https://wa.me/962782576216');
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


    var emailLink = document.getElementById('emailLink');
    if (emailLink) {
        emailLink.onclick = function (e) {
            e.preventDefault();
            createInfoPanel('<img src="gmail icon.png" alt="Gmail" width="40" height="35" style="vertical-align: middle;"><br><strong>abdallahjkhader@gmail.com</strong><br><small>Click to copy email address</small>', 'email');
        };
    }

    if (phoneSpan) {
        phoneSpan.onclick = function (e) {
            e.preventDefault();
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

    linkedinLink.onclick = function (e) {
        e.preventDefault();
        createInfoPanel('<i class="bi bi-linkedin fs-1"></i><br><strong>linkedin.com/in/abdallah-j-khader-b70739230</strong><br><small>Click to open profile</small>', 'linkedin');
    };

    var whatsappLink = document.querySelector('a[href*="wa.me"]');
    if (whatsappLink) {
        whatsappLink.onclick = function (e) {
            e.preventDefault();
            createInfoPanel('<i class="bi bi-whatsapp fs-1"></i><br><strong>Opening WhatsApp...</strong><br><small>You are going to WhatsApp, are you sure?</small>', 'whatsapp');
        };
    }


    const detailBtns = document.querySelectorAll('.details-btn');
    detailBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            if (btn.id === 'focusReadBtn') {


                const slides = [
                    // Slide 1: Overview
                    {
                        id: 1,
                        title: 'Focus & Read',
                        icon: 'focusandreadlogo.jpg',
                        iconWidth: 80,
                        content: `
                            <p class="small mb-3">
                                An integrated web platform specifically designed to assist students with ADHD in organizing their academic lives, improving focus, and leveraging AI to simplify the learning process.
                            </p>
                            <p class="small mb-3">
                                The project provides a structured environment tailored for neurodivergent minds, combining intelligent file management, deep focus tracking, and smart study tools. It helps students stay motivated through streak tracking while enabling teachers to monitor progress and engagement.
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
                    // Slide 3: Key Features
                    {
                        id: 3,
                        title: 'Key Features',
                        icon: 'req doc icon.png',
                        iconWidth: 70,
                        content: `
                            <div class="row">
                                <div class="col-12 mb-3">
                                    <h6 class="fw-bold text-primary mb-2">Smart Dashboard & Focus:</h6>
                                    <ul class="small mb-0">
                                        <li><strong>Tracking:</strong> Daily/Weekly stats, Streak system.</li>
                                        <li><strong>File Manager:</strong> Support for PDF, Word, PPT, Videos.</li>
                                        <li><strong>Content Viewer:</strong> Read & extract text directly in-browser.</li>
                                        <li><strong>Focus Tools:</strong> Pomodoro Timer, Notifications.</li>
                                    </ul>
                                </div>
                                <div class="col-12">
                                    <h6 class="fw-bold text-primary mb-2">AI & Collaboration:</h6>
                                    <ul class="small mb-0">
                                        <li><strong>AI Companion:</strong> Summaries, Interactive Quizzes, Flashcards (Llama 3).</li>
                                        <li><strong>Classes:</strong> Resource sharing, Group chats, Teacher analytics.</li>
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
                    // Slide 5: Tech Stack
                    {
                        id: 5,
                        title: 'Tech Stack',
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
                                        <span class="badge bg-gradient-primary">EF Core</span>
                                        <span class="badge bg-gradient-primary">OpenXML & iText7</span>
                                    </div>
                                </div>
                                <div class="mb-4">
                                    <h6 class="fw-bold text-light mb-2"><i class="bi bi-window-sidebar me-2 text-info"></i>Frontend</h6>
                                    <div class="d-flex flex-wrap gap-2">
                                        <span class="badge bg-gradient-primary">HTML5</span>
                                        <span class="badge bg-gradient-primary">CSS3</span>
                                        <span class="badge bg-gradient-primary">JavaScript</span>
                                        <span class="badge bg-gradient-primary">Bootstrap 5</span>
                                    </div>
                                </div>
                                <div>
                                    <h6 class="fw-bold text-light mb-2"><i class="bi bi-robot me-2 text-info"></i>AI Integration</h6>
                                    <div class="d-flex flex-wrap gap-2">
                                        <span class="badge bg-gradient-primary">Groq API (Llama-3.3-70b-versatile)</span>
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
                                RestoM is a comprehensive, full-stack restaurant management solution designed to bridge the gap between front-of-house service and kitchen operations.
                            </p>
                            <p class="small mb-3">
                                It provides a real-time, unified platform for managing orders, tables, and inventory, ensuring a seamless flow from order taking to meal preparation and billing.
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
                    // Slide 3: Key Features
                    {
                        id: 3,
                        title: 'Key Features',
                        icon: 'req doc icon.png',
                        iconWidth: 60,
                        content: `
                            <div class="row">
                                <div class="col-12 mb-3">
                                    <ul class="small mb-0">
                                        <li><strong>POS & Ordering:</strong> Intuitive interface (ordering.html) for dynamic orders.</li>
                                        <li><strong>KDS:</strong> Real-time kitchen dashboard (kitchen.html) to replace paper tickets.</li>
                                        <li><strong>Inventory:</strong> Robust tracking (Inventory.html) to minimize waste.</li>
                                        <li><strong>Table Management:</strong> Visual seating (Tabels.html) to assign orders.</li>
                                        <li><strong>Reporting:</strong> Professional invoices (invoices.html) & sales insights.</li>
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
                    // Slide 5: Built With
                    {
                        id: 5,
                        title: 'Built With',
                        icon: 'web technologies icon.png',
                        iconWidth: 50,
                        content: `
                             <div class="p-2">
                                <div class="mb-4">
                                    <h6 class="fw-bold text-light mb-2"><i class="bi bi-hdd-stack me-2 text-info"></i>Backend & Database</h6>
                                    <div class="d-flex flex-wrap gap-2">
                                        <span class="badge bg-gradient-primary">ASP.NET Core Web API</span>
                                        <span class="badge bg-gradient-primary">C#</span>
                                        <span class="badge bg-gradient-primary">Entity Framework Core</span>
                                        <span class="badge bg-gradient-primary">SQL Server</span>
                                    </div>
                                </div>
                                <div class="mb-4">
                                    <h6 class="fw-bold text-light mb-2"><i class="bi bi-window-sidebar me-2 text-info"></i>Frontend</h6>
                                    <div class="d-flex flex-wrap gap-2">
                                        <span class="badge bg-gradient-primary">Vanilla JavaScript</span>
                                        <span class="badge bg-gradient-primary">HTML5</span>
                                        <span class="badge bg-gradient-primary">CSS3</span>
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
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const aboutTop = aboutSection.getBoundingClientRect().top;
            // Trigger when About section is entering view (e.g., nearing top)
            // 400px allows it to trigger smoothly as the user scrolls down from Hero
            if (aboutTop <= 400) {
                document.body.classList.add('scrolled-sidebar-active');
            } else {
                document.body.classList.remove('scrolled-sidebar-active');
            }
        }
    });
});

/* Typewriter Logic for About Section */
window.addEventListener('DOMContentLoaded', function () {
    const aboutSection = document.getElementById('about');
    const summaryEl = document.getElementById('about-summary');
    const codeEl = document.getElementById('about-code');

    const summaryText = "Associate Software Engineer (.NET) with hands-on experience in C#, ASP.NET Core (MVC & Web API) and Entity Framework Core. Focused on backend development, building RESTful APIs, implementing business logic, and integrating SQL Server using Code First and DB First. Contributed to academic and learning projects, with a solid understanding of OOP and clean code principles. Seeking to grow technical expertise within professional .NET teams.";

    const codeTextSimple = `public class Developer
{
    public string Name => "Abdallah J. Khader";
    public DateTime BirthDate => new DateTime(2004, 12, 10);
    public string Location => "Amman, Jordan";
    public List<string> OpenTo => ["Onsite", "Freelancing", "Remote"];
    public bool IsAvailable => OpenTo.Count > 0;

    public string Create() => "She said: 'We need commitment'. I did: 'git commit'.";
}

Console.WriteLine(new Developer().Create());`;

    const codeTextColored = `<span class="code-keyword">public class</span> <span class="code-class">Developer</span>
{
    <span class="code-keyword">public string</span> Name => <span class="code-string">"Abdallah J. Khader"</span>;
    <span class="code-keyword">public</span> <span class="code-class">DateTime</span> BirthDate => <span class="code-keyword">new</span> <span class="code-class">DateTime</span>(<span class="code-number">2004</span>, <span class="code-number">12</span>, <span class="code-number">10</span>);
    <span class="code-keyword">public string</span> Location => <span class="code-string">"Amman, Jordan"</span>;
    <span class="code-keyword">public</span> <span class="code-class">List</span>&lt;<span class="code-keyword">string</span>&gt; OpenTo => [<span class="code-string">"Onsite"</span>, <span class="code-string">"Freelancing"</span>, <span class="code-string">"Remote"</span>];
    <span class="code-keyword">public bool</span> IsAvailable => OpenTo.Count > <span class="code-number">0</span>;

    <span class="code-keyword">public string</span> <span class="code-method">Create</span>() => <span class="code-string">"She said: 'We need commitment'. I did: 'git commit'."</span>;
}

<span class="code-class">Console</span>.<span class="code-method">WriteLine</span>(<span class="code-keyword">new</span> <span class="code-class">Developer</span>().<span class="code-method">Create</span>());`;

    let started = false;

    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                started = true;
                // Only type the code, summary is static now.
                typeText(codeEl, codeTextSimple, 2, () => {
                    // Restore Colors after typing finishes
                    codeEl.innerHTML = codeTextColored;
                });
            }
        });
    }, { threshold: 0.3 });

    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }

    function typeText(element, text, speed, callback) {
        let i = 0;
        element.textContent = "";
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                if (callback) callback();
            }
        }
        type();
    }
});
