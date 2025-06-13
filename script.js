// Animate skill bars on scroll
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.querySelector('.skill-level');
                const percentage = entry.target.dataset.level;
                skillLevel.style.transform = `scaleX(${percentage / 100})`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillItems.forEach(item => {
        observer.observe(item);
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dark mode toggle
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme);

// Skill tags hover effect
document.querySelectorAll('.skill-tags span').forEach(tag => {
    tag.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-2px) rotate(2deg)';
    });
    
    tag.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0) rotate(0)';
    });
});

// GitHub stats refresh
const refreshGitHubStats = () => {
    const timestamp = new Date().getTime();
    document.querySelectorAll('.github-stats img').forEach(img => {
        img.src = img.src.split('?')[0] + '?t=' + timestamp;
    });
};

// Refresh GitHub stats every hour
setInterval(refreshGitHubStats, 3600000); 