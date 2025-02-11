document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const icon = themeToggle.querySelector('i');

    function isMobile() {
        return window.matchMedia('(max-width: 768px)').matches;
    }

    const savedTheme = localStorage.getItem('theme');
    let defaultTheme;
    
    if (savedTheme) {
        defaultTheme = savedTheme;
    } else {
        defaultTheme = isMobile() ? 'light' : 'dark';
        localStorage.setItem('theme', defaultTheme);
    }
    
    document.documentElement.setAttribute('data-theme', defaultTheme);
    updateIcon(defaultTheme === 'dark');
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme === 'dark');
    });

    function updateIcon(isDark) {
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container') && !e.target.closest('.mobile-menu-btn')) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    const logo = document.querySelector('.logo');
    const primaryText = document.querySelector('.logo-text.primary');
    const secondaryText = document.querySelector('.logo-text.secondary');
    let timeoutId;

    function showDream() {
        primaryText.style.opacity = '0';
        primaryText.style.transform = 'translateY(-20px)';
        secondaryText.style.opacity = '1';
        secondaryText.style.transform = 'translateY(0)';
    }

    function showYume() {
        primaryText.style.opacity = '1';
        primaryText.style.transform = 'translateY(0)';
        secondaryText.style.opacity = '0';
        secondaryText.style.transform = 'translateY(20px)';
    }

    logo.addEventListener('mouseenter', () => {
        clearTimeout(timeoutId);
        showDream();
        
        timeoutId = setTimeout(() => {
            showYume();
        }, 3000);
    });
});
