window.ProjectData = window.ProjectData || {};

window.ProjectData.focusReadSlides = [
    // Slide 1: Overview & Problem Statement
    {
        id: 1,
        title: 'Focus & Read',
        icon: 'images/focusandreadlogo.jpg',
        iconWidth: 80,
        content: `
            <h6 class="fw-bold text-primary mb-2">Overview:</h6>
            <p class="small mb-3">
                An integrated web platform specifically designed to assist students with ADHD in organizing their academic lives, improving focus, and leveraging AI to simplify the learning process.
            </p>
            <p class="small mb-3">
                The project provides a structured environment tailored for neurodivergent minds, combining intelligent file management, deep focus tracking, and smart study tools.
            </p>
            <h6 class="fw-bold text-danger mb-2 mt-3">Problem Statement:</h6>
            <p class="small mb-3">
                Traditional study tools often lack features specifically tailored for neurodivergent minds.
                Students with ADHD frequently struggle with maintaining focus, organizing tasks, and managing time effectively
                in standard learning environments, leading to decreased productivity and academic stress.
                There is a need for a specialized platform that combines distraction-blocking, smart scheduling,
                and accessible reading formats in one cohesive environment.
            </p>
        `
    },
    // Slide 2: Key Features
    {
        id: 2,
        title: 'Key Features',
        icon: 'images/req doc icon.png',
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
    // Slide 3: Project Video
    {
        id: 3,
        title: 'Project Video',
        icon: 'images/focusandreadlogo.jpg',
        iconWidth: 50,
        content: `
            <div class="w-100 text-center">
                <video controls class="rounded shadow-sm" style="max-width: 100%; max-height: 280px; width: auto; height: auto; background-color: #000;">
                    <source src="videos/focus video.MP4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        `
    },
    // Slide 4: Tech Stack
    {
        id: 4,
        title: 'Tech Stack',
        icon: 'images/web technologies icon.png',
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

window.ProjectData.restoMSlides = [
    // Slide 1: Overview & Problem Statement
    {
        id: 1,
        title: 'RestoM',
        icon: 'images/RestoM logo.jpg',
        iconWidth: 80,
        content: `
            <h6 class="fw-bold text-primary mb-2">Overview:</h6>
            <p class="small mb-3">
                RestoM is a comprehensive, full-stack restaurant management solution designed to bridge the gap between front-of-house service and kitchen operations.
            </p>
            <p class="small mb-3">
                It provides a real-time, unified platform for managing orders, tables, and inventory, ensuring a seamless flow from order taking to meal preparation and billing.
            </p>
            <h6 class="fw-bold text-danger mb-2 mt-3">Problem Statement:</h6>
            <p class="small mb-3">
                Manual restaurant operations often lead to miscommunication between the front-of-house and kitchen, resulting in incorrect orders and delays. 
                Inventory mismanagement can cause unexpected shortages, while a lack of data visibility hinders strategic decision-making. 
                RestoM addresses these inefficiencies by digitizing the entire workflow.
            </p>
        `
    },
    // Slide 2: Key Features
    {
        id: 2,
        title: 'Key Features',
        icon: 'images/req doc icon.png',
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
    // Slide 3: Project Video
    {
        id: 3,
        title: 'Project Video',
        icon: 'images/RestoM logo.jpg',
        iconWidth: 50,
        content: `
            <div class="w-100 text-center">
                <video controls class="rounded shadow-sm" style="max-width: 100%; max-height: 280px; width: auto; height: auto; background-color: #000;">
                    <source src="videos/RestoM video.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        `
    },
    // Slide 4: Built With
    {
        id: 4,
        title: 'Built With',
        icon: 'images/web technologies icon.png',
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
