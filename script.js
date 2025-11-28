
document.addEventListener('DOMContentLoaded', function() {
    
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');
    
  
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
    
    
    document.addEventListener('click', function(e) {
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        }
    });
    
    
    document.addEventListener('keydown', function(e) {
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


const debouncedScrollHandler = debounce(function() {
    
}, 16); 

window.addEventListener('scroll', debouncedScrollHandler);

window.addEventListener('DOMContentLoaded', function() {
    const text1 = "Hello, I'm Abdallah";
    const text2 = "Junior .NET Developer";
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

// Contact info display functionality
window.addEventListener('DOMContentLoaded', function() {
    var emailSpan = document.querySelector('span[title*="Email"]');
    var phoneSpan = document.querySelector('span[title*="Phone"]');
    var githubLink = document.querySelector('a[href*="github"]');
    var linkedinLink = document.querySelector('a[href*="linkedin"]');
    var currentOpenPanel = null;
    
    // Close any existing panel
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
    
    // Create animated info panels
    function createInfoPanel(content, type) {
        // Close any existing panel first
        closeExistingPanel();
        
        // Create backdrop
        var backdrop = document.createElement('div');
        backdrop.id = 'panel-backdrop';
        backdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(backdrop);
        
        // Animate backdrop in
        setTimeout(() => {
            backdrop.style.opacity = '1';
        }, 10);
        
        var panel = document.createElement('div');
        panel.className = 'contact-info-panel';
        panel.innerHTML = content;
        panel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            z-index: 1000;
            font-family: 'Montserrat', sans-serif;
            font-size: 1.2rem;
            text-align: center;
            min-width: 300px;
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        `;
        
        // Add close button
        var closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            opacity: 0.8;
        `;
        closeBtn.onmouseover = () => closeBtn.style.opacity = '1';
        closeBtn.onmouseout = () => closeBtn.style.opacity = '0.8';
        
        panel.appendChild(closeBtn);
        document.body.appendChild(panel);
        
        // Store reference to current panel
        currentOpenPanel = panel;
        
        // Animate in
        setTimeout(() => {
            panel.style.transform = 'translate(-50%, -50%) scale(1)';
            panel.style.opacity = '1';
        }, 10);
        
        // Close handlers
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
        
        // Open link handler
        function openLink(url) {
            closePanel();
            setTimeout(() => {
                window.open(url, '_blank');
            }, 300);
        }
        
        closeBtn.onclick = closePanel;
        
        // Make panel clickable to open link or copy info
        panel.style.cursor = 'pointer';
        panel.onclick = function(e) {
            if (e.target === closeBtn) {
                closePanel();
            } else {
                if (type === 'github') {
                    openLink('https://github.com/AbdallahJkhader');
                } else if (type === 'linkedin') {
                    openLink('https://www.linkedin.com/in/abdallah-khader-b70739230?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app');
                } else if (type === 'email') {
                    // Copy email to clipboard
                    navigator.clipboard.writeText('abdallahjkhader@gmail.com').then(() => {
                        // Show success feedback
                        panel.innerHTML = '<i class="bi bi-check-circle fs-1"></i><br><strong>Email Copied!</strong><br><small>Email address copied to clipboard</small>';
                        setTimeout(() => {
                            closePanel();
                        }, 1500);
                    });
                } else if (type === 'phone') {
                    // Copy phone to clipboard
                    navigator.clipboard.writeText('+962782576216').then(() => {
                        // Show success feedback
                        panel.innerHTML = '<i class="bi bi-check-circle fs-1"></i><br><strong>Phone Copied!</strong><br><small>Phone number copied to clipboard</small>';
                        setTimeout(() => {
                            closePanel();
                        }, 1500);
                    });
                }
            }
        };
        
        // Close on backdrop click
        backdrop.onclick = closePanel;
        
        // Auto close after 5 seconds
        setTimeout(() => {
            if (currentOpenPanel === panel) {
                closePanel();
            }
        }, 5000);
        
        return panel;
    }
    
    // Click handlers
    if (emailSpan) {
        emailSpan.style.cursor = 'pointer';
        emailSpan.onclick = function() {
            createInfoPanel('<img src="gmail icon.png" alt="Gmail" width="48" height="42" style="vertical-align: middle;"><br><strong>abdallahjkhader@gmail.com</strong><br><small>Click to copy email address</small>', 'email');
        };
    }
    
    if (phoneSpan) {
        phoneSpan.style.cursor = 'pointer';
        phoneSpan.onclick = function() {
            createInfoPanel('<img src="phone number icon.jpg" alt="Phone" width="28" height="28" style="vertical-align: middle; border-radius: 50%; object-fit: cover; object-position: center;"><br><strong>+962 78 257 6216</strong><br><small>Call or message this number</small>', 'phone');
        };
    }
    
    if (githubLink) {
        githubLink.onclick = function(e) {
            e.preventDefault();
            createInfoPanel('<i class="bi bi-github fs-1"></i><br><strong>github.com/AbdallahJkhader</strong><br><small>Click to open profile</small>', 'github');
        };
    }
    
    if (linkedinLink) {
        linkedinLink.onclick = function(e) {
            e.preventDefault();
            createInfoPanel('<i class="bi bi-linkedin fs-1"></i><br><strong>linkedin.com/in/abdallah-khader-b70739230</strong><br><small>Click to open profile</small>', 'linkedin');
        };
    }
});

// Contact Me button toggle
window.addEventListener('DOMContentLoaded', function() {
    var downloadBtn = document.getElementById('downloadBtn');
    
    // Download CV button functionality
    if(downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Create a temporary link to download CV
            const link = document.createElement('a');
            link.href = 'Abdallah J.Khader CV.pdf';
            link.target = '_blank';
            
            // Add click event to trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Optional: Show a success message
            const originalText = downloadBtn.innerHTML;
            downloadBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Opened!';
            downloadBtn.classList.remove('btn-primary');
            downloadBtn.classList.add('btn-success');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                downloadBtn.innerHTML = originalText;
                downloadBtn.classList.remove('btn-success');
                downloadBtn.classList.add('btn-primary');
            }, 3000);
        });
    }
}); 