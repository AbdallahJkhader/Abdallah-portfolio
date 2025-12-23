
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
    const text2 = "Software Developer | .NET";
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
        // Styles moved to styles.css (#panel-backdrop)
        document.body.appendChild(backdrop);


        setTimeout(() => {
            backdrop.style.opacity = '1';
        }, 10);

        var panel = document.createElement('div');
        panel.className = 'contact-info-panel';
        panel.innerHTML = content;
        // Styles moved to styles.css (.contact-info-panel)


        var closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        // Styles for button moved to styles.css (.contact-info-panel button)

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

        closeBtn.onclick = closePanel;


        panel.style.cursor = 'pointer';
        panel.onclick = function (e) {
            if (e.target === closeBtn) {
                closePanel();
            } else {
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

                        panel.innerHTML = '<i class="bi bi-check-circle fs-1"></i><br><strong>Phone Copied!</strong><br><small>Phone number copied to clipboard</small>';
                        setTimeout(() => {
                            closePanel();
                        }, 1500);
                    });
                }
            }
        };


        backdrop.onclick = closePanel;


        setTimeout(() => {
            if (currentOpenPanel === panel) {
                closePanel();
            }
        }, 5000);

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
            createInfoPanel('<img src="phone number icon.png" alt="Phone" width="34" height="34" style="vertical-align: middle; border-radius: 50%; object-fit: cover; object-position: center;"><br><strong>+962 78 257 6216</strong><br><small>Call or message this number</small>', 'phone');
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

    // Open Details "Coming Soon" Logic
    const detailBtns = document.querySelectorAll('.details-btn');
    detailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            createInfoPanel('<i class="bi bi-hourglass-split fs-1"></i><br><strong>Coming Soon!</strong><br><small>This feature is under development</small>', 'coming-soon');
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

    // Update panel click handler to support coming-soon auto-close if needed, though default 5s works.
    // The createInfoPanel implementation already handles 5s timeout.
    // If we want immediate close on click for 'coming-soon' just like others:
    // Existing logic for 'email'/'phone' etc is inside the createInfoPanel closure which we are not modifying here directly
    // but we can rely on the default behavior or standard close.
});
