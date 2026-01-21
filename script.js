/**
 * Portfolio - Check My Work
 * Main JavaScript File
 * Refactored for modularity and clean execution.
 */

// Prevent browser from restoring scroll position on refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Force scroll to top immediately (before DOM loads)
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initTheme();
    initScrollSpy();
    initHeroTypewriter();
    initAboutTypewriter();
    initContactPanels();
    initCVDownload();
    initAOS();
    initDragScroll();
});

/**
 * 1. Navbar Logic
 * Handles smooth scrolling, collapsing on click, and active state updates.
 */
function initNavbar() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Desktop Nav Click Logic
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

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

    // Scroll Logic for Navbar Blur
    // Toggles .navbar-blur class when scrolling past the Hero section
    function handleNavbarBlur() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        // Threshold: 90% of viewport height (approx end of Hero)
        const threshold = window.innerHeight * 0.9;

        if (window.scrollY > threshold) {
            navbar.classList.add('navbar-blur');
        } else {
            navbar.classList.remove('navbar-blur');
        }
    }

    // Attach listener
    window.addEventListener('scroll', handleNavbarBlur);
    // Trigger once on load
    handleNavbarBlur();

    // Mobile Navbar Toggler Logic (Bottom Sheet)
    const toggler = document.getElementById('mobile-nav-toggler');
    if (toggler) {
        toggler.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const content = `
                <div class="d-flex flex-column gap-2 w-100 px-1 pb-1">
                    <h5 class="fw-bold mb-3 text-white">Menu</h5>
                    <button class="popup-pill-btn w-100 justify-content-start ps-4 mobile-nav-link" data-target="#home">
                        <i class="bi bi-house-door-fill fs-5 me-2"></i> Home
                    </button>
                    <button class="popup-pill-btn w-100 justify-content-start ps-4 mobile-nav-link" data-target="#about">
                        <i class="bi bi-person-lines-fill fs-5 me-2"></i> About
                    </button>
                    <button class="popup-pill-btn w-100 justify-content-start ps-4 mobile-nav-link" data-target="#skills">
                        <i class="bi bi-cpu-fill fs-5 me-2"></i> Skills
                    </button>
                    <button class="popup-pill-btn w-100 justify-content-start ps-4 mobile-nav-link" data-target="#projects">
                        <i class="bi bi-layers-fill fs-5 me-2"></i> Projects
                    </button>
                    <button class="popup-pill-btn w-100 justify-content-start ps-4 mobile-nav-link" data-target="#experience">
                        <i class="bi bi-briefcase-fill fs-5 me-2"></i> Experience
                    </button>
                </div>
            `;

            if (window.showInfoPanel) {
                const panel = window.showInfoPanel(content, 'mobile-nav floating-bubble');

                // Attach click listeners to generated links
                setTimeout(() => {
                    const links = panel.querySelectorAll('.mobile-nav-link');
                    links.forEach(link => {
                        link.onclick = (ev) => {
                            ev.preventDefault();
                            const targetId = link.getAttribute('data-target');

                            const closeBtn = panel.querySelector('button:not(.popup-pill-btn)');
                            if (closeBtn) {
                                closeBtn.click();
                            } else {
                                if (document.body.contains(panel)) {
                                    const backdrop = document.getElementById('panel-backdrop');
                                    if (backdrop) backdrop.click();
                                }
                            }

                            // Scroll Logic
                            if (targetId === '#home') {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            } else {
                                const section = document.querySelector(targetId);
                                if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        };
                    });
                }, 50);
            }
        });
    }

    // Mobile Brand Click: Show Quick Actions
    const brand = document.querySelector('.navbar-brand');
    if (brand) {
        brand.addEventListener('click', function (e) {
            if (window.innerWidth <= 991) {
                e.preventDefault();
                window.showQuickActionsPopup();
            }
        });
    }

    // Close navbar when clicking outside
    document.addEventListener('click', function (e) {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            if (!navbarCollapse.contains(e.target) && !toggler.contains(e.target)) {
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
    const darkVideo = document.getElementById('hero-video-dark');
    const lightVideo = document.getElementById('hero-video-light');

    // Helper function to switch videos
    function switchVideo(isLightMode) {
        if (darkVideo && lightVideo) {
            if (isLightMode) {
                darkVideo.style.display = 'none';
                lightVideo.style.display = 'block';
                lightVideo.play();
            } else {
                lightVideo.style.display = 'none';
                darkVideo.style.display = 'block';
                darkVideo.play();
            }
        }
    }

    // Load saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.remove('bi-sun-fill');
        themeIcon.classList.add('bi-moon-fill');
        switchVideo(true);
    }

    themeToggleBtn.addEventListener('click', function () {
        // Save current scroll position
        const currentScrollY = window.scrollY;

        document.body.classList.toggle('light-mode');

        if (document.body.classList.contains('light-mode')) {
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-fill');
            localStorage.setItem('theme', 'light');
            switchVideo(true);
        } else {
            themeIcon.classList.remove('bi-moon-fill');
            themeIcon.classList.add('bi-sun-fill');
            localStorage.setItem('theme', 'dark');
            switchVideo(false);
        }

        // Update hero gradient to match new theme
        if (window.updateHeroGradient) {
            window.updateHeroGradient();
        }

        // Restore scroll position multiple times to handle CSS reflow
        // Immediate restoration
        window.scrollTo(0, currentScrollY);

        // After next paint
        requestAnimationFrame(() => {
            window.scrollTo(0, currentScrollY);

            // After CSS has been applied
            setTimeout(() => {
                window.scrollTo(0, currentScrollY);
            }, 10);

            // Final restoration after all transitions
            setTimeout(() => {
                window.scrollTo(0, currentScrollY);
            }, 50);
        });
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
/**
 * 4. Hero Section Typewriter
 */
function initHeroTypewriter() {
    const text1 = "Hello, I'm Abdallah";
    const text2 = "Backend .NET Developer";
    const el1 = document.getElementById('typewriter');
    const el2 = document.getElementById('netdev');

    if (!el1) return;

    // Apply scanning text class
    el1.classList.add('scanning-text');
    if (el2) el2.classList.add('scanning-text');

    // Typewriter Logic
    let i = 0, j = 0;

    function typeWriter1() {
        if (i < text1.length) {
            el1.textContent += text1.charAt(i);
            i++;
            setTimeout(typeWriter1, 55);
        } else {
            if (el2) {
                el2.textContent = '';
                el2.style.visibility = 'visible';
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
    if (el2) el2.style.visibility = 'hidden';
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
    <span class="code-keyword">public string</span> Nationality => <span class="code-string">"Jordanian"</span>;
    <span class="code-keyword">public List</span>&lt;<span class="code-keyword">string</span>&gt; OpenTo => [<span class="code-string">"Freelancing"</span>, <span class="code-string">"Remote"</span>];
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
            // Faster typing on mobile
            const typingSpeed = window.innerWidth < 992 ? 4 : 5;
            setTimeout(typeWriterCode, typingSpeed);
        }
    }
}

/**
 * 9. AOS Animation Initialization
 */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 600,
            once: true,
            offset: 120, // Trigger earlier when element is 120px from viewport
            easing: 'ease-in-out',
            delay: 0
        });

        // Refresh AOS after all images/resources are loaded to ensure correct offsets
        window.addEventListener('load', () => {
            AOS.refresh();
        });
    }
}

// Global Panel State (needed for window.showInfoPanel to work)
let currentOpenPanel = null;

function closeExistingPanel() {
    if (currentOpenPanel) {
        const panel = currentOpenPanel;
        const backdrop = document.getElementById('panel-backdrop');

        // Remove class to trigger CSS exit transition
        panel.classList.remove('is-visible');

        if (backdrop) {
            backdrop.style.opacity = '0';
            setTimeout(() => { if (document.body.contains(backdrop)) document.body.removeChild(backdrop); }, 300);
        }

        // Wait for transition to finish before removing
        setTimeout(() => { if (document.body.contains(panel)) document.body.removeChild(panel); }, 300);
        currentOpenPanel = null;
    }
}

/**
 * 6. Contact Panels & Project Modals
 * Reusable modal logic for contacts and project details.
 */
function initContactPanels() {

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
        if (type) {
            // Handle multiple classes separated by spaces
            type.split(' ').forEach(cls => {
                if (cls.trim()) panel.classList.add(cls.trim());
            });
        }
        if (type && type.includes('phone')) panel.classList.add('phone-popup-mode');
        panel.innerHTML = content;

        // Close Button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        panel.appendChild(closeBtn);
        document.body.appendChild(panel);

        currentOpenPanel = panel;

        // Animate In - Use CSS Class
        // Allow browser paint cycle before adding class for transition
        requestAnimationFrame(() => {
            panel.classList.add('is-visible');
        });

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

    // Expose Global Helper
    window.showInfoPanel = createInfoPanel;

    // --- Attach Listeners ---

    // Contact Links (removed - now handled in desktop copy handlers section)



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

    // Global Copy Helpers for Mobile Popup
    window.copyEmail = () => {
        navigator.clipboard.writeText('abdallahjkhader@gmail.com');
    };

    // Shared function for Social Icons popup (Say Hi)
    window.showSocialIconsPopup = function () {
        const content = `
            <div class="social-apps-grid">
                <div class="social-app-item" id="social-github-btn">
                    <div class="social-app-icon">
                        <i class="bi bi-github"></i>
                    </div>
                    <div class="social-app-label">GitHub</div>
                </div>
                
                <div class="social-app-item" id="social-linkedin-btn">
                    <div class="social-app-icon">
                        <i class="bi bi-linkedin"></i>
                    </div>
                    <div class="social-app-label">LinkedIn</div>
                </div>
                
                <div class="social-app-item" id="social-whatsapp-btn">
                    <div class="social-app-icon">
                        <i class="bi bi-whatsapp"></i>
                    </div>
                    <div class="social-app-label">WhatsApp</div>
                </div>
                
                <div class="social-app-item" id="social-email-btn">
                    <div class="social-app-icon">
                        <i class="bi bi-envelope-fill"></i>
                    </div>
                    <div class="social-app-label">Email</div>
                </div>
                
                <div class="social-app-item" id="social-phone-btn">
                    <div class="social-app-icon">
                        <i class="bi bi-phone-fill"></i>
                    </div>
                    <div class="social-app-label">Phone</div>
                </div>
            </div>
        `;

        window.showInfoPanel(content, 'say-hi-social floating-bubble');

        // Attach listeners
        setTimeout(() => {
            const replaceWithCopied = (buttonId, text) => {
                const button = document.getElementById(buttonId);
                if (button) {
                    const icon = button.querySelector('.social-app-icon');
                    const label = button.querySelector('.social-app-label');
                    const originalIconHTML = icon.innerHTML;
                    const originalLabelText = label.textContent;

                    // Replace with "Copied" text and copied content
                    icon.innerHTML = '<span style="font-size: 0.7rem; font-weight: 600;">Copied</span>';
                    label.innerHTML = `<span style="font-size: 0.7rem; line-height: 1.2;">${text}</span>`;
                    icon.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

                    // Restore after 3 seconds
                    setTimeout(() => {
                        icon.innerHTML = originalIconHTML;
                        label.innerHTML = originalLabelText;
                        icon.style.background = '';
                    }, 3000);
                }
            };

            document.getElementById('social-github-btn')?.addEventListener('click', () => {
                window.open('https://github.com/AbdallahJkhader', '_blank');
            });

            document.getElementById('social-linkedin-btn')?.addEventListener('click', () => {
                window.open('https://www.linkedin.com/in/abdallah-j-khader-b70739230', '_blank');
            });

            document.getElementById('social-whatsapp-btn')?.addEventListener('click', () => {
                window.open('https://wa.me/962782576216', '_blank');
            });

            document.getElementById('social-phone-btn')?.addEventListener('click', () => {
                navigator.clipboard.writeText('+962782576216').then(() => {
                    replaceWithCopied('social-phone-btn', '+962782576216');
                });
            });

            document.getElementById('social-email-btn')?.addEventListener('click', () => {
                navigator.clipboard.writeText('abdallahjkhader@gmail.com').then(() => {
                    replaceWithCopied('social-email-btn', 'abdallahjkhader@gmail.com');
                });
            });

            // Enable mouse drag scrolling for desktop
            const grid = document.querySelector('.social-apps-grid');
            if (grid) {
                let isDown = false;
                let startX;
                let scrollLeft;

                grid.addEventListener('mousedown', (e) => {
                    isDown = true;
                    grid.style.cursor = 'grabbing';
                    startX = e.pageX - grid.offsetLeft;
                    scrollLeft = grid.scrollLeft;
                });

                grid.addEventListener('mouseleave', () => {
                    isDown = false;
                    grid.style.cursor = 'grab';
                });

                grid.addEventListener('mouseup', () => {
                    isDown = false;
                    grid.style.cursor = 'grab';
                });

                grid.addEventListener('mousemove', (e) => {
                    if (!isDown) return;
                    e.preventDefault();
                    const x = e.pageX - grid.offsetLeft;
                    const walk = (x - startX) * 2; // Scroll speed multiplier
                    grid.scrollLeft = scrollLeft - walk;
                });

                // Set initial cursor
                grid.style.cursor = 'grab';
            }
        }, 50);
    };

    // Shared function for Quick Actions popup (Say Hi / View CV)
    window.showQuickActionsPopup = function () {
        const content = `
            <div class="d-flex flex-column gap-2 w-100 px-1 pb-1">
                <div class="d-flex flex-row gap-2 w-100">
                    <button id="mobile-say-hi-btn" class="popup-pill-btn flex-fill justify-content-center">
                        <i class="bi bi-chat-text fs-5"></i>
                        <span class="fs-6">Say Hi</span>
                    </button>

                    <button id="mobile-cv-btn" class="popup-pill-btn flex-fill justify-content-center">
                        <i class="bi bi-file-earmark-person fs-5"></i>
                        <span class="fs-6">View CV</span>
                    </button>
                </div>
            </div>
        `;

        if (window.showInfoPanel) {
            window.showInfoPanel(content, 'quick-actions floating-bubble');

            setTimeout(() => {
                // CV Logic
                const mobCvBtn = document.getElementById('mobile-cv-btn');
                if (mobCvBtn) {
                    mobCvBtn.onclick = () => {
                        const link = document.createElement('a');
                        link.href = 'Abdallah J. Khader CV.pdf';
                        link.target = '_blank';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        mobCvBtn.innerHTML = '<span class="fs-6 fw-bold ms-2 text-success">Opened!</span><i class="bi bi-check-circle fs-5 me-2 text-success"></i>';
                    };
                }

                // Say Hi Logic
                const sayHiBtn = document.getElementById('mobile-say-hi-btn');
                if (sayHiBtn) {
                    sayHiBtn.onclick = () => {
                        showSocialIconsPopup();
                    };
                }
            }, 50);
        }
    };

    // Say Hi Button - Hero Section
    const sayHiBtn = document.getElementById('sayHiBtn');
    if (sayHiBtn) {
        sayHiBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Always show social icons popup directly
            window.showSocialIconsPopup();
        });
    }

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
                window.showInfoPanel('<i class="bi bi-hourglass-split fs-1"></i><br><strong>Coming Soon!</strong><br><small>This feature is under development</small>', 'coming-soon');
            }
        });
    });

    // Helper to handle Project Carousels (Focus & Read, RestoM)
    function openProjectCarousel(slides, prefix) {
        if (!slides) return;

        function getSlideHTML(slideIndex) {
            const slide = slides[slideIndex];
            const currentNumber = slideIndex + 1;
            const totalSlides = slides.length;

            // Generate Arrow Navigation Buttons
            const prevDisabled = slideIndex === 0 ? 'disabled style="opacity: 0.3; cursor: not-allowed;"' : '';
            const nextDisabled = slideIndex === totalSlides - 1 ? 'disabled style="opacity: 0.3; cursor: not-allowed;"' : '';

            // Arrow Controls HTML
            let controlsHTML = `
                <div class="d-flex align-items-center gap-2">
                    <button id="${prefix}-prev-btn" class="btn btn-sm btn-outline-secondary fw-bold rounded-circle p-0 d-flex align-items-center justify-content-center" 
                        style="width: 32px; height: 32px; transition: all 0.2s;" ${prevDisabled} title="Previous">
                        <i class="bi bi-chevron-left"></i>
                    </button>
                    
                    <span class="text-muted small fw-bold mx-1" style="font-family: monospace;">${currentNumber}/${totalSlides}</span>

                    <button id="${prefix}-next-btn" class="btn btn-sm btn-outline-secondary fw-bold rounded-circle p-0 d-flex align-items-center justify-content-center" 
                        style="width: 32px; height: 32px; transition: all 0.2s;" ${nextDisabled} title="Next">
                        <i class="bi bi-chevron-right"></i>
                    </button>

                    <div class="vr mx-2"></div>

                    <button id="${prefix}-close-btn" class="btn btn-sm btn-outline-danger fw-bold rounded-circle p-0 d-flex align-items-center justify-content-center" 
                        style="width: 32px; height: 32px; transition: all 0.2s;" title="Close">
                        <i class="bi bi-x fs-5"></i>
                    </button>
                </div>
            `;

            return `
                <div class="text-start p-3 fade-in">
                    <div class="d-flex align-items-center mb-3">
                        <img src="${slide.icon}" alt="${slide.title}" width="${slide.iconWidth}" class="rounded-3 shadow-sm me-3" style="object-fit: contain;">
                        <h4 class="fw-bold mb-0">${slide.title}</h4>
                        <div class="ms-auto">
                            ${controlsHTML}
                        </div>
                    </div>
                    <div class="carousel-content">${slide.content}</div>
                </div>
            `;
        }

        const wrapperID = `${prefix}-carousel-content`;
        const initialHTML = `<div id="${wrapperID}">${getSlideHTML(0)}</div>`;
        window.showInfoPanel(initialHTML, 'project-details');

        function attachCarouselListeners(currentIndex) {
            const container = document.getElementById(wrapperID);
            if (!container) return;

            // Close Button
            const closeBtn = document.getElementById(`${prefix}-close-btn`);
            if (closeBtn) {
                closeBtn.onclick = (e) => {
                    e.stopPropagation();
                    const backdrop = document.getElementById('panel-backdrop');
                    if (backdrop) backdrop.click();
                };
            }

            // Previous Button
            const prevBtn = document.getElementById(`${prefix}-prev-btn`);
            if (prevBtn && !prevBtn.disabled) {
                prevBtn.onclick = (e) => {
                    e.stopPropagation();
                    if (currentIndex > 0) {
                        updateSlide(currentIndex - 1);
                    }
                };
            }

            // Next Button
            const nextBtn = document.getElementById(`${prefix}-next-btn`);
            if (nextBtn && !nextBtn.disabled) {
                nextBtn.onclick = (e) => {
                    e.stopPropagation();
                    if (currentIndex < slides.length - 1) {
                        updateSlide(currentIndex + 1);
                    }
                };
            }

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
 * 10. Drag to Scroll for Skills, Projects, Experience
 * Enables mouse drag scrolling on desktop at mobile viewport sizes
 */
function initDragScroll() {
    const sections = ['#skills .row', '#projects .row', '#experience .row'];

    sections.forEach(selector => {
        const container = document.querySelector(selector);
        if (!container) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.style.cursor = 'grabbing';
            container.style.userSelect = 'none';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed multiplier
            container.scrollLeft = scrollLeft - walk;
        });

        // Set initial cursor style
        container.style.cursor = 'grab';

        // Reset scroll position to start
        container.scrollLeft = 0;
    });
}

