/**
 * Main JavaScript File for Claire Lin's Portfolio
 * Handles menu toggle, scroll animations, and other general functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initMobileMenu();
    initScrollAnimations();
    initProgressBars();
});

/**
 * Mobile Menu Toggle Functionality
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    let menuOpen = false;
    
    menuBtn.addEventListener('click', () => {
        if (!menuOpen) {
            menuBtn.classList.add('open');
            navLinks.classList.add('active');
            menuOpen = true;
        } else {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('active');
            menuOpen = false;
        }
    });
    
    // Close menu when clicking on links
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('active');
            menuOpen = false;
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuOpen && !e.target.closest('.nav-links') && !e.target.closest('.menu-btn')) {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('active');
            menuOpen = false;
        }
    });
}

/**
 * Scroll Animations
 * Adds animations to elements when they come into view
 */
function initScrollAnimations() {
    // Add fade-in animation to section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    const workItems = document.querySelectorAll('.work-item');
    const learningItems = document.querySelectorAll('.learning-item');
    
    // Create observer for elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's a progress bar, animate it
                if (entry.target.classList.contains('learning-item')) {
                    const progressBar = entry.target.querySelector('.progress-bar');
                    if (progressBar) {
                        const percent = progressBar.getAttribute('data-percent');
                        progressBar.style.width = `${percent}%`;
                    }
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all elements
    sectionHeaders.forEach(header => {
        header.classList.add('fade-in');
        observer.observe(header);
    });
    
    workItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
    
    learningItems.forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Add scroll class to navbar when scrolling
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

/**
 * Initialize Progress Bars in the Learning Section
 */
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        
        // Only animate when in viewport
        // Animation is handled by the scroll observer
        bar.style.width = '0%';
    });
}

/**
 * Smooth Scroll to Section
 * Handles smooth scrolling when clicking navigation links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calculate header height for offset
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});