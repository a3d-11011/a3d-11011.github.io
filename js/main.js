document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initVideoTabs();
    initScrollAnimations();
    initNavbarScroll();
    initSmoothScroll();
});

function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetTab) panel.classList.add('active');
            });
        });
    });
}

function initVideoTabs() {
    const videoTabs = document.querySelectorAll('.video-tab');
    const videoPanels = document.querySelectorAll('.video-panel');
    videoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetVideo = tab.dataset.video;
            videoTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            videoPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetVideo) panel.classList.add('active');
            });
        });
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });
    document.querySelectorAll('.method-card, .feature-list li, .realworld-card, .comparison-item').forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({ top: targetElement.offsetTop - navbarHeight - 20, behavior: 'smooth' });
            }
        });
    });
}

function copyBibtex() {
    const bibtexCode = document.querySelector('.bibtex-code code').textContent;
    navigator.clipboard.writeText(bibtexCode).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
        copyBtn.style.background = '#10b981';
        setTimeout(() => { copyBtn.innerHTML = originalText; copyBtn.style.background = ''; }, 2000);
    });
}

