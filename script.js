// Typewriter Effect
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = this.txt;

        // Initial Type Speed
        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }
        setTimeout(() => this.type(), typeSpeed);
    }
}

// DOM Elements
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const header = document.getElementById('main-header');
const sections = document.querySelectorAll('section');

// Mobile menu toggle
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
    
    // Toggle between menu and close icon
    const icon = menuBtn.querySelector('i');
    if (menuBtn.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when clicking a nav link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.classList.remove('no-scroll');
            
            // Reset menu icon
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const offset = 20; // Additional offset from the top
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const scrollThreshold = 100; // Minimum scroll amount before header hides

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Always show header at the top of the page
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        header.classList.remove('scroll-down');
        header.style.transform = 'translateY(0)';
        return;
    }
    
    // Hide header when scrolling down, show when scrolling up
    if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        // Scrolling down
        if (!header.classList.contains('scroll-down')) {
            header.style.transform = `translateY(-${header.offsetHeight}px)`;
            header.classList.add('scroll-down');
            header.classList.remove('scroll-up');
        }
    } else if (currentScroll < lastScroll) {
        // Scrolling up
        if (header.classList.contains('scroll-down') || currentScroll < scrollThreshold) {
            header.style.transform = 'translateY(0)';
            header.classList.add('scroll-up');
            header.classList.remove('scroll-down');
        }
    }
    
    lastScroll = currentScroll;
});

// Highlight active navigation item based on scroll position
function highlightNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const headerHeight = header.offsetHeight;
        
        if (window.pageYOffset >= sectionTop - headerHeight - 100) {
            current = `#${section.getAttribute('id')}`;
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === current) {
            item.classList.add('active');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize any animations
    initScrollAnimations();
    
    // Set initial active nav item
    highlightNav();
    
    // Update active nav item on scroll
    window.addEventListener('scroll', highlightNav);
    
    // Add loaded class to body for any entrance animations
    document.body.classList.add('loaded');
});

// Handle page refresh - scroll to top
window.onbeforeunload = function() {
    window.scrollTo(0, 0);
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = mobileMenuBtn.querySelector('i');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-times');
        
        // Toggle body scroll when menu is open
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    });
}

// Animate elements when they come into view
function initScrollAnimations() {
    // Timeline items animation
    const timelineItems = document.querySelectorAll('.experience-item');
    const skillCategories = document.querySelectorAll('.skills-category');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // For timeline items
                if (entry.target.classList.contains('experience-item')) {
                    entry.target.classList.add('visible');
                }
                // For skill categories
                if (entry.target.classList.contains('skills-category')) {
                    entry.target.classList.add('visible');
                    // Animate skill bars
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach(bar => {
                        const width = bar.getAttribute('data-width') + '%';
                        bar.style.width = width;
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all elements that should be animated on scroll
    [...timelineItems, ...skillCategories].forEach(item => {
        observer.observe(item);
    });
}

// Header scroll effect
function initHeaderScroll() {
    let lastScroll = 0;
    const header = document.getElementById('main-header');
    
    // Show header initially
    setTimeout(() => {
        header.classList.add('visible');
    }, 500);
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Always show header at the very top
        if (currentScroll <= 0) {
            header.classList.add('visible');
            document.body.classList.remove('scrolling-up');
            lastScroll = currentScroll;
            return;
        }
        
        // Scrolling down and past threshold
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.remove('visible');
            document.body.classList.remove('scrolling-up');
        } 
        // Scrolling up or at the top
        else {
            header.classList.add('visible');
            document.body.classList.add('scrolling-up');
        }
        
        lastScroll = currentScroll;
    });
}

function init() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize header scroll effect
    initHeaderScroll();
    const txtElement = document.getElementById('typewriter-text');
    if (txtElement) {
        const words = [
            'Building Bridges Between User Needs and Product Innovation',
            'Crafting Exceptional Digital Experiences',
            'Transforming Ideas into Impactful Products'
        ];
        const wait = 3000; // 3 seconds
        
        // Initialize TypeWriter
        new TypeWriter(txtElement, words, wait);
    }
    
    // Add scroll reveal animation
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add animation to sections on load
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const content = section.querySelector('h2, h3, p, ul, .experience-item, .project-item');
        if (content) {
            content.classList.add('animate-on-scroll');
        }
    });
    
    // Add animation to navigation items on scroll
    const navLinks = document.querySelectorAll('.nav-links li');
    const headerHeight = document.getElementById('main-header').offsetHeight;
    
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 20;
            const sectionHeight = section.offsetHeight;
            
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(li => {
            li.classList.remove('active');
            const link = li.querySelector('a');
            if (link && link.getAttribute('href') === `#${current}`) {
                li.classList.add('active');
            }
        });
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Initial update
    updateActiveNav();
}
