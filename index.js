// Theme management
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;
    
    // Update button icon
    const icon = this.themeToggle.querySelector('i');
    if (theme === 'dark') {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}

// Simple hover effects for contact links
class ContactEnhancer {
  constructor() {
    this.init();
  }

  init() {
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
      link.addEventListener('mouseenter', this.handleHover.bind(this));
      link.addEventListener('mouseleave', this.handleLeave.bind(this));
    });
  }

  handleHover(e) {
    const icon = e.currentTarget.querySelector('i');
    icon.style.transform = 'scale(1.1)';
    icon.style.transition = 'transform 0.2s ease';
  }

  handleLeave(e) {
    const icon = e.currentTarget.querySelector('i');
    icon.style.transform = 'scale(1)';
  }
}

// Navigation management
class NavigationManager {
  constructor() {
    this.navMenu = document.getElementById('nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.init();
  }

  init() {
    // Smooth scrolling for navigation links
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Track active section on scroll
    window.addEventListener('scroll', () => this.updateActiveSection());
  }

  updateActiveSection() {
    const sections = ['profile', 'experience', 'education', 'skills', 'about'];
    const headerHeight = document.querySelector('.header').offsetHeight;
    const scrollPosition = window.scrollY + headerHeight + 100;

    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      const link = document.querySelector(`[href="#${sectionId}"]`);
      
      if (section && link) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          this.navLinks.forEach(navLink => navLink.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new ContactEnhancer();
  new NavigationManager();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'k') {
    e.preventDefault();
    const themeManager = new ThemeManager();
    themeManager.toggleTheme();
  }
});
