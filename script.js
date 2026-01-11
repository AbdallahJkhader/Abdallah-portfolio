/**
 * Portfolio - Check My Work
 * Main JavaScript File
 * Refactored for modularity and clean execution.
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initTheme();
    initScrollSpy();
    initHeroTypewriter();
    initAboutTypewriter();
    initContactPanels();
    initCVDownload();
    initSidebarScroll();
    initAOS();
});

/**
 * 1. Navbar Logic
 * Handles smooth scrolling, collapsing on click, and active state updates.
 */
function initNavbar() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Collapse navbar if open (mobile)
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }

            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Scroll to target
            const targetId = this.getAttribute('href');
            if (targetId === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                history.pushState(null, null, targetId);
                return;
            }

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.pushState(null, null, targetId);
            } else {
                history.pushState(null, null, targetId);
            }
        });
    });

    // Close navbar when clicking outside
    document.addEventListener('click', function (e) {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                new bootstrap.Collapse(navbarCollapse, { toggle: false }).hide();
            }
        }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navbarCollapse && navbarCollapse.classList.contains('show')) {
            new bootstrap.Collapse(navbarCollapse, { toggle: false }).hide();
        }
    });
}

/**
 * 2. Theme Toggling
 * Handles Light/Dark mode switching and persistence.
 */
function initTheme() {
    const themeToggleBtn = document.getElementById('themeToggle');
    if (!themeToggleBtn) return;

    const themeIcon = themeToggleBtn.querySelector('i');

    // Load saved preference
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
}

/**
 * 3. Scroll Spy
 * Highlight navbar links based on scroll position.
 */
function initScrollSpy() {
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -70% 0px',
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

    // Handle Home specifically for fixed positioning top scroll
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
}

/**
 * 4. Hero Section Typewriter
 */
function initHeroTypewriter() {
    const text1 = "Hello, I'm Abdallah";
    const text2 = "Backend .NET Developer";
    const el1 = document.getElementById('typewriter');
    const el2 = document.getElementById('netdev');

    if (!el1) return;

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

    el1.textContent = '';
    if (el2) el2.style.display = 'none';
    typeWriter1();
}

/**
 * 5. About Section Typewriter
 */
function initAboutTypewriter() {
    const summaryEl = document.getElementById('about-summary');
    const codeEl = document.getElementById('about-code');
    if (!summaryEl || !codeEl) return;

    const summaryText = ".NET Developer with hands-on experience in building web applications using ASP.NET Core (MVC & Web API). Focused on writing clean, maintainable code by applying SOLID principles and design patterns like Repository and Unit of Work. Proficient in SQL Server and Entity Framework Core, with a strong interest in developing structured and scalable backend solutions.";

    // Code block content with syntax highlighting spans
    const codeTextColored = `<span class="code-keyword">public class</span> <span class="code-class">Developer</span>
{
    <span class="code-keyword">public string</span> Name => <span class="code-string">"Abdallah J. Khader"</span>;
    <span class="code-keyword">public DateTime</span> BirthDate => <span class="code-keyword">new</span> <span class="code-class">DateTime</span>(2004, 12, 10);
    <span class="code-keyword">public string</span> Location => <span class="code-string">"Amman, Jordan"</span>;
    <span class="code-keyword">public List</span>&lt;<span class="code-keyword">string</span>&gt; OpenTo => [<span class="code-string">"Onsite"</span>, <span class="code-string">"Freelancing"</span>, <span class="code-string">"Remote"</span>];
    <span class="code-keyword">public bool</span> IsAvailable => OpenTo.Count > 0;

    <span class="code-keyword">public string</span> <span class="code-function">Create</span>() => <span class="code-string">"She said: 'We need commitment'. I did: 'git commit'."</span>;
}

<span class="code-class">Console</span>.<span class="code-function">WriteLine</span>(<span class="code-keyword">new</span> <span class="code-class">Developer</span>().<span class="code-function">Create</span>());`;

    let cIndex = 0;
    let currentCodeBuffer = '';

    // Observer to start animation when visible
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            // Summary: Fade In
            summaryEl.innerHTML = summaryText;
            summaryEl.style.opacity = 0;
            summaryEl.style.transition = 'opacity 1.5s ease-in-out';
            setTimeout(() => summaryEl.style.opacity = 1, 100);

            // Code: Typewriter
            codeEl.innerHTML = '';
            codeEl.style.opacity = 1;
            typeWriterCode();

            observer.disconnect();
        }
    }, { threshold: 0.1 });

    observer.observe(document.getElementById('about'));

    // Removed typeWriterSummary as we are now fading in

    function typeWriterCode() {
        if (cIndex < codeTextColored.length) {
            let char = codeTextColored.charAt(cIndex);

            if (char === '<') {
                let tagEnd = codeTextColored.indexOf('>', cIndex);
                if (tagEnd !== -1) {
                    currentCodeBuffer += codeTextColored.substring(cIndex, tagEnd + 1);
                    cIndex = tagEnd + 1;
                    typeWriterCode(); // Recurse to skip delay for tags
                    return;
                }
            } else if (char === '&') {
                let entityEnd = codeTextColored.indexOf(';', cIndex);
                if (entityEnd !== -1) {
                    currentCodeBuffer += codeTextColored.substring(cIndex, entityEnd + 1);
                    cIndex = entityEnd + 1;
                } else {
                    currentCodeBuffer += char;
                    cIndex++;
                }
            } else {
                currentCodeBuffer += char;
                cIndex++;
            }

            codeEl.innerHTML = currentCodeBuffer;
            setTimeout(typeWriterCode, 5); // Fast code typing
        }
    }
}

/**
 * 9. AOS Animation Initialization
 */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true
        });
    }
}

/**
 * 6. Contact Panels & Project Modals
 * Reusable modal logic for contacts and project details.
 */
function initContactPanels() {
    let currentOpenPanel = null;

    // Helper: Close Panel
    function closeExistingPanel() {
        if (currentOpenPanel) {
            const panel = currentOpenPanel;
            const backdrop = document.getElementById('panel-backdrop');

            panel.style.transform = 'translate(-50%, -50%) scale(0)';
            panel.style.opacity = '0';

            if (backdrop) {
                backdrop.style.opacity = '0';
                setTimeout(() => { if (document.body.contains(backdrop)) document.body.removeChild(backdrop); }, 300);
            }

            setTimeout(() => { if (document.body.contains(panel)) document.body.removeChild(panel); }, 300);
            currentOpenPanel = null;
        }
    }

    // Helper: Create Panel
    function createInfoPanel(content, type) {
        closeExistingPanel();

        // Backdrop
        const backdrop = document.createElement('div');
        backdrop.id = 'panel-backdrop';
        document.body.appendChild(backdrop);
        setTimeout(() => backdrop.style.opacity = '1', 10);

        // Panel
        const panel = document.createElement('div');
        panel.className = 'contact-info-panel';
        if (type === 'phone') panel.classList.add('phone-popup-mode');
        panel.innerHTML = content;

        // Close Button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        panel.appendChild(closeBtn);
        document.body.appendChild(panel);

        currentOpenPanel = panel;

        // Animate In
        setTimeout(() => {
            panel.style.transform = 'translate(-50%, -50%) scale(1)';
            panel.style.opacity = '1';
        }, 10);

        // Close Handlers
        function closePanel() {
            if (currentOpenPanel === panel) {
                closeExistingPanel(); // Reuse logic
            }
        }

        backdrop.onclick = closePanel;
        closeBtn.onclick = (e) => { e.stopPropagation(); closePanel(); };

        // Interaction Handling
        panel.style.cursor = 'pointer';
        panel.onclick = (e) => {
            if (e.target === closeBtn || closeBtn.contains(e.target)) return;

            if (type === 'github') window.open('https://github.com/AbdallahJkhader', '_blank');
            else if (type === 'linkedin') window.open('https://www.linkedin.com/in/abdallah-j-khader-b70739230', '_blank');
            else if (type === 'whatsapp') window.open('https://wa.me/962782576216', '_blank');
            else if (type === 'email') {
                navigator.clipboard.writeText('abdallahjkhader@gmail.com').then(() => {
                    panel.innerHTML = '<i class="bi bi-check-circle fs-1"></i><br><strong>Email Copied!</strong><br><small>Email address copied to clipboard</small>';
                    setTimeout(closePanel, 1500);
                });
            } else if (type === 'phone') {
                navigator.clipboard.writeText('+962782576216').then(() => {
                    panel.classList.remove('phone-popup-mode');
                    panel.innerHTML = '<i class="bi bi-check-circle fs-1"></i><br><strong>Phone Copied!</strong><br><small>Phone number copied to clipboard</small>';
                    setTimeout(closePanel, 1500);
                });
            }
        };

        return panel;
    }

    // --- Attach Listeners ---

    // Contact Links
    const emailLink = document.getElementById('emailLink');
    if (emailLink) emailLink.onclick = (e) => {
        e.preventDefault();
        createInfoPanel('<img src="images/gmail icon.png" alt="Gmail" width="40" height="35" style="vertical-align: middle;"><br><strong>abdallahjkhader@gmail.com</strong><br><small>Click to copy email address</small>', 'email');
    };

    const phoneSpan = document.getElementById('phoneLink');
    if (phoneSpan) phoneSpan.onclick = (e) => {
        e.preventDefault();
        const isLightMode = document.body.classList.contains('light-mode');
        const iconSrc = isLightMode ? 'images/phone number black.png' : 'images/phone number white.png';
        createInfoPanel(`<img src="${iconSrc}" alt="Phone Number" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">`, 'phone');
    };

    const githubLink = document.querySelector('a[href*="github"]');
    if (githubLink) githubLink.onclick = (e) => {
        e.preventDefault();
        createInfoPanel('<i class="bi bi-github fs-1"></i><br><strong>github.com/AbdallahJkhader</strong><br><small>Click to open profile</small>', 'github');
    };

    const linkedinLink = document.querySelector('a[href*="linkedin"]');
    if (linkedinLink) linkedinLink.onclick = (e) => {
        e.preventDefault();
        createInfoPanel('<i class="bi bi-linkedin fs-1"></i><br><strong>linkedin.com/in/abdallah-j-khader-b70739230</strong><br><small>Click to open profile</small>', 'linkedin');
    };

    const whatsappLink = document.querySelector('a[href*="wa.me"]');
    if (whatsappLink) whatsappLink.onclick = (e) => {
        e.preventDefault();
        createInfoPanel('<i class="bi bi-whatsapp fs-1"></i><br><strong>+962 78 257 6216</strong><br><small>Click to open chat</small>', 'whatsapp');
    };

    // Project Details Buttons
    const detailBtns = document.querySelectorAll('.details-btn');
    detailBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            if (btn.id === 'focusReadBtn') {
                openProjectCarousel(window.ProjectData.focusReadSlides, 'focus-read');
            } else if (btn.id === 'restoMBtn') {
                openProjectCarousel(window.ProjectData.restoMSlides, 'restom');
            } else {
                createInfoPanel('<i class="bi bi-hourglass-split fs-1"></i><br><strong>Coming Soon!</strong><br><small>This feature is under development</small>', 'coming-soon');
            }
        });
    });

    // Helper to handle Project Carousels (Focus & Read, RestoM)
    function openProjectCarousel(slides, prefix) {
        if (!slides) return;

        function getSlideHTML(slideIndex) {
            const slide = slides[slideIndex];
            const hasPrev = slideIndex > 0;
            const hasNext = slideIndex < slides.length - 1;

            // Unique IDs for buttons based on prefix to avoid conflict
            return `
                <div class="text-start p-3 fade-in">
                    <div class="d-flex align-items-center mb-3">
                        <img src="${slide.icon}" alt="${slide.title}" width="${slide.iconWidth}" class="rounded-3 shadow-sm me-3" style="object-fit: contain;">
                        <h4 class="fw-bold mb-0">${slide.title}</h4>
                        <div class="ms-auto d-flex gap-2">
                            ${hasPrev ? `<i id="${prefix}-prev-btn" class="bi bi-arrow-left-circle-fill fs-2 cursor-pointer text-info" role="button" title="Previous"></i>` : ''}
                            ${hasNext ? `<i id="${prefix}-next-btn" class="bi bi-arrow-right-circle-fill fs-2 cursor-pointer text-info" role="button" title="Next"></i>` : ''}
                        </div>
                    </div>
                    <div class="carousel-content">${slide.content}</div>
                </div>
            `;
        }

        const wrapperID = `${prefix}-carousel-content`;
        const initialHTML = `<div id="${wrapperID}">${getSlideHTML(0)}</div>`;
        createInfoPanel(initialHTML, 'project-details');

        function attachCarouselListeners(currentIndex) {
            const container = document.getElementById(wrapperID);
            if (!container) return;

            const prevBtn = document.getElementById(`${prefix}-prev-btn`);
            const nextBtn = document.getElementById(`${prefix}-next-btn`);

            if (prevBtn) prevBtn.onclick = (e) => {
                e.stopPropagation();
                updateSlide(currentIndex - 1);
            };

            if (nextBtn) nextBtn.onclick = (e) => {
                e.stopPropagation();
                updateSlide(currentIndex + 1);
            };

            function updateSlide(newIndex) {
                container.innerHTML = getSlideHTML(newIndex);
                attachCarouselListeners(newIndex);
            }
        }

        attachCarouselListeners(0);
    }
}

/**
 * 7. CV Download Logic
 */
function initCVDownload() {
    const downloadBtn = document.getElementById('downloadBtn');
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
}

/**
 * 8. Sticky Sidebar Logic
 */
function initSidebarScroll() {
    window.addEventListener('scroll', function () {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const aboutTop = aboutSection.getBoundingClientRect().top;
            if (aboutTop <= 400) {
                document.body.classList.add('scrolled-sidebar-active');
            } else {
                document.body.classList.remove('scrolled-sidebar-active');
            }
        }
    });
}
