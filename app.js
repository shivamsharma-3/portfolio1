// Shivam Sharma Portfolio JavaScript - Fixed Version

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initCursorAnimations();
    initNavigation();
    initScrollAnimations();
    initTypingEffect();
    initContactForm();
    initSmoothScrolling();
    initMobileNavigation();
    initHeroButtons();
    initParallaxEffects();
    initHoverEffects();
    initAccessibility();
    initLoadingAnimations();
});

// Cursor Animation System (No Large Circle)
function initCursorAnimations() {
    // Check if device supports advanced cursor animations
    if (window.innerWidth <= 480 || 'ontouchstart' in window) {
        // Keep default cursor on mobile/touch devices
        return;
    }

    // Create cursor elements (no large circle)
    const cursorGlow = createCursorGlow();
    const trails = createCursorTrails();
    
    let mouseX = 0, mouseY = 0;
    let isClicking = false;
    
    // Mouse movement handler
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update cursor glow position immediately
        cursorGlow.style.left = mouseX + 'px';
        cursorGlow.style.top = mouseY + 'px';
        
        // Update trail positions
        updateCursorTrails(trails, mouseX, mouseY);
        
        // Create cursor particles on movement
        if (Math.random() < 0.08) {
            createCursorParticle(mouseX, mouseY);
        }
    });
    
    // Click effects
    document.addEventListener('mousedown', (e) => {
        isClicking = true;
        createRippleEffect(e.clientX, e.clientY);
        cursorGlow.classList.add('active');
        
        // Enhanced click particles
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                createCursorParticle(
                    e.clientX + (Math.random() - 0.5) * 30,
                    e.clientY + (Math.random() - 0.5) * 30
                );
            }, i * 40);
        }
    });
    
    document.addEventListener('mouseup', () => {
        isClicking = false;
        cursorGlow.classList.remove('active');
    });
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll(`
        a, button, .btn, .nav-link, .project-card, .skill-item, 
        .certification-card, .timeline-content, .education-item,
        .contact-icon, .social-link, input, textarea, select,
        .scroll-arrow, .hero-btn, .download-btn
    `);
    
    interactiveElements.forEach(element => {
        // Add magnetic class for magnetic effect
        element.classList.add('magnetic-element');
        
        element.addEventListener('mouseenter', () => {
            cursorGlow.classList.add('active');
            
            // Magnetic effect
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            element.addEventListener('mousemove', magneticEffect);
            
            function magneticEffect(e) {
                const deltaX = (e.clientX - centerX) * 0.15;
                const deltaY = (e.clientY - centerY) * 0.15;
                
                element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            }
            
            element.magneticHandler = magneticEffect;
        });
        
        element.addEventListener('mouseleave', () => {
            cursorGlow.classList.remove('active');
            
            // Reset magnetic effect
            element.style.transform = '';
            if (element.magneticHandler) {
                element.removeEventListener('mousemove', element.magneticHandler);
            }
        });
    });
    
    // Special cursor effects for specific sections
    initSpecialCursorEffects();
}

function createCursorGlow() {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    return glow;
}

function createCursorTrails() {
    const trails = [];
    const trailCount = 25;
    
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        const progress = (trailCount - i) / trailCount;
        trail.style.opacity = progress * 0.9;
        trail.style.transform = `translate(-50%, -50%) scale(${0.3 + progress * 0.7})`;
        document.body.appendChild(trail);
        
        trails.push({
            element: trail,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        });
    }
    
    return trails;
}

function updateCursorTrails(trails, mouseX, mouseY) {
    trails.forEach((trail, index) => {
        setTimeout(() => {
            trail.x += (mouseX - trail.x) * 0.3;
            trail.y += (mouseY - trail.y) * 0.3;
            
            trail.element.style.left = trail.x + 'px';
            trail.element.style.top = trail.y + 'px';
        }, index * 8);
    });
}

function createRippleEffect(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'cursor-ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    document.body.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

function createCursorParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    
    // Random direction and distance
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 25 + 8;
    const finalX = x + Math.cos(angle) * distance;
    const finalY = y + Math.sin(angle) * distance;
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    document.body.appendChild(particle);
    
    // Animate particle
    setTimeout(() => {
        particle.style.left = finalX + 'px';
        particle.style.top = finalY + 'px';
        particle.style.transition = 'all 1s cubic-bezier(0.25, 0.8, 0.25, 1)';
    }, 10);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 1000);
}

function initSpecialCursorEffects() {
    // Skills section - cursor glow enhancement
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const cursorGlow = document.querySelector('.cursor-glow');
            if (cursorGlow) {
                cursorGlow.style.background = 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const cursorGlow = document.querySelector('.cursor-glow');
            if (cursorGlow) {
                cursorGlow.style.background = 'radial-gradient(circle, rgba(220, 38, 38, 0.1) 0%, transparent 70%)';
            }
        });
    });
    
    // Projects section - enhanced particle effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const cursorGlow = document.querySelector('.cursor-glow');
            if (cursorGlow) {
                cursorGlow.style.width = '120px';
                cursorGlow.style.height = '120px';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const cursorGlow = document.querySelector('.cursor-glow');
            if (cursorGlow) {
                cursorGlow.style.width = '100px';
                cursorGlow.style.height = '100px';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(220, 38, 38, 0.1) 0%, transparent 70%)';
            }
        });
    });
}

// Navigation functionality
function initNavigation() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.98)';
            nav.style.backdropFilter = 'blur(15px)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
            nav.style.backdropFilter = 'blur(10px)';
        }
    });

    // Update active navigation link based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// FIXED: Smooth scrolling for navigation links
function initSmoothScrolling() {
    // Handle all navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const heroButtons = document.querySelectorAll('.hero-btn[href^="#"]');
    const allScrollLinks = [...navLinks, ...heroButtons];
    
    allScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = 70;
                const targetTop = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const navToggle = document.querySelector('.nav-toggle');
                if (navMenu && navToggle && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
                
                console.log(`Scrolling to section: ${targetId}`);
            }
        });
    });
    
    // Handle scroll arrow
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function(e) {
            e.preventDefault();
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const navHeight = 70;
                const targetTop = aboutSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetTop,
                    behavior: 'smooth'
                });
                
                console.log('Scrolling to about section');
            }
        });
    }
}

// Initialize hero buttons functionality
function initHeroButtons() {
    const viewWorkBtn = document.querySelector('.hero-btn[href="#projects"]');
    const getInTouchBtn = document.querySelector('.hero-btn[href="#contact"]');
    
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', function(e) {
            console.log('View Work button clicked');
        });
    }
    
    if (getInTouchBtn) {
        getInTouchBtn.addEventListener('click', function(e) {
            console.log('Get In Touch button clicked');
        });
    }
}

// Mobile navigation toggle
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            console.log('Mobile menu toggled');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Typing effect for hero subtitle
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) {
        console.log('Typing element not found');
        return;
    }
    
    const texts = [
        'AI Developer',
        'Web Developer', 
        'Prompt Engineer',
        'Tech Innovator'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isTyping = false;
    
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;
    
    function typeWriter() {
        if (isTyping) return;
        isTyping = true;
        
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let speed = isDeleting ? deleteSpeed : typeSpeed;
        
        if (!isDeleting && charIndex === currentText.length) {
            speed = pauseTime;
            isDeleting = true;
        } 
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        isTyping = false;
        setTimeout(typeWriter, speed);
    }
    
    typingElement.textContent = '';
    setTimeout(() => {
        console.log('Starting typing effect');
        typeWriter();
    }, 1500);
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.25,
        rootMargin: '0px 0px -150px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
                
                if (entry.target.classList.contains('project-card')) {
                    animateProjectCard(entry.target);
                }
                
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillItem(entry.target);
                }
                
                if (entry.target.classList.contains('certification-card')) {
                    animateCertificationCard(entry.target);
                }
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(`
        .section-header,
        .about-text,
        .education-section,
        .timeline-item,
        .project-card,
        .skill-item,
        .certification-card,
        .contact-item,
        .contact-form
    `);

    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = '0.1s';
        observer.observe(el);
    });
}

function animateTimelineItem(item) {
    const content = item.querySelector('.timeline-content');
    if (content) {
        content.style.transform = 'translateX(-30px)';
        content.style.opacity = '0';
        
        setTimeout(() => {
            content.style.transform = 'translateX(0)';
            content.style.opacity = '1';
            content.style.transition = 'all 0.6s ease';
        }, 200);
    }
}

function animateProjectCard(card) {
    card.style.transform = 'scale(0.95)';
    card.style.opacity = '0.8';
    
    setTimeout(() => {
        card.style.transform = 'scale(1)';
        card.style.opacity = '1';
        card.style.transition = 'all 0.6s ease';
    }, 300);
}

function animateSkillItem(item) {
    item.style.transform = 'translateY(20px)';
    item.style.opacity = '0';
    
    setTimeout(() => {
        item.style.transform = 'translateY(0)';
        item.style.opacity = '1';
        item.style.transition = 'all 0.5s ease';
    }, Math.random() * 300);
}

function animateCertificationCard(card) {
    const icon = card.querySelector('.certification-icon');
    if (icon) {
        icon.style.transform = 'scale(0.5) rotate(-180deg)';
        icon.style.opacity = '0';
        
        setTimeout(() => {
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.opacity = '1';
            icon.style.transition = 'all 0.8s ease';
        }, 200);
    }
}

// FIXED: Contact form handling with Formspree integration
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        // Ensure form inputs are properly accessible
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            // Remove any attributes that might prevent input
            input.removeAttribute('readonly');
            input.removeAttribute('disabled');
            
            // Ensure proper event handling
            input.addEventListener('focus', function() {
                console.log(`Focused on ${this.name || this.placeholder}`);
                this.style.borderColor = '#dc2626';
                this.style.borderWidth = '2px';
            });
            
            input.addEventListener('input', function() {
                console.log(`Input in ${this.name || this.placeholder}: ${this.value}`);
                if (this.value.trim() !== '') {
                    this.style.borderColor = '#dc2626';
                }
            });
            
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.style.borderColor = '#dc2626';
                } else if (this.type === 'email' && !isValidEmail(this.value)) {
                    this.style.borderColor = '#dc2626';
                } else {
                    this.style.borderColor = '#dc2626';
                    this.style.borderWidth = '1px';
                }
            });
        });
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Form submitted');
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            console.log('Form data:', { name, email, subject, message });
            
            // Validate form
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                highlightEmptyFields(inputs);
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                const emailInput = contactForm.querySelector('input[name="email"]');
                if (emailInput) emailInput.style.borderColor = '#dc2626';
                return;
            }
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending Message...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showNotification(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon at ${email}.`, 'success');
                    contactForm.reset();
                    
                    // Reset field borders
                    inputs.forEach(input => {
                        input.style.borderColor = '';
                    });
                    
                    // Add success animation to form
                    contactForm.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        contactForm.style.transform = 'scale(1)';
                        contactForm.style.transition = 'transform 0.3s ease';
                    }, 100);
                    
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showNotification('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
            } finally {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }
        });
    }
}

// FIXED: Download Resume functionality
function downloadResume() {
    console.log('Download resume function called');
    
    // Create a more detailed resume content
    const resumeContent = `SHIVAM SHARMA
AI & Data Science Graduate | Frontend Developer

Contact Information:
Email: shivamsharma4c@gmail.com
Phone: +91 90637 03256
Location: IDA Bollaram, Hyderabad, Telangana
LinkedIn: https://www.linkedin.com/in/shivam-sharma1203
GitHub: https://github.com/shivamsharma-3
Instagram: https://www.instagram.com/shivam._s3/

EDUCATION:
B.Tech – Artificial Intelligence & Data Science
St. Peter's Engineering College (2021-2025)
CGPA: 6.7

Intermediate (MPC)
Sri Chaitanya Junior College, Hyderabad (2019-2021)
Percentage: 94.4%

EXPERIENCE:
Prompt Engineering - LLM Technologies (2024 - Present)
• Designed and optimized prompts for large language models
• Implemented advanced prompting techniques including few-shot learning
• Analyzed LLM behavior patterns and developed strategies for consistent performance
• Created comprehensive prompt libraries and documentation for team collaboration

AI Marketing Intern - CodTech IT Solutions (2024)
• Developed AI-driven marketing strategies using machine learning algorithms
• Automated SEO workflows using Python scripts integrated with Google Analytics
• Conducted audience segmentation using NLP techniques to boost engagement rates
• Generated comprehensive performance dashboards and optimization recommendations

Web Development Intern - Various Organizations (2023-2024)
• Developed responsive web applications using modern frontend technologies
• Applied NLP tools for content optimization and intelligent targeting systems
• Monitored and analyzed campaign performance metrics using advanced analytics
• Collaborated with cross-functional teams to implement UI/UX improvements

SKILLS:
Frontend Development: HTML5, CSS3, JavaScript, React, Vue.js, Responsive Design, CSS Grid & Flexbox, Web Accessibility
Backend & Database: Python, Node.js, Flask, Django, MongoDB, PostgreSQL, Redis, REST APIs
Tools & Technologies: VS Code, Git & GitHub, Docker, AWS, Chrome DevTools, Figma, Postman, GitHub Pages
Soft Skills: Problem-solving, Creativity, Collaboration, Leadership, Fast Learner, Attention to Detail

PROJECTS:
Restaurant Management & Booking Platform
• Full-stack web application for restaurant management with comprehensive booking system
• Real-time table booking system with availability tracking
• Integrated payment processing and billing management
• Customer loyalty programs and personalized recommendations
• Admin dashboard with analytics and reporting tools
Technologies: React, Node.js, MongoDB, Express, JavaScript
Tools: Git, Docker, Apache, Postman

Start-Up Success Predictor
• Machine learning model designed to predict startup success potential
• Interactive frontend interface for seamless user data input
• Advanced ML algorithms for accurate success prediction
• Comprehensive data visualization and insights dashboard
• API endpoints for integration with external systems
Technologies: Python, Scikit-learn, Pandas, Flask, JavaScript
Purpose: Supporting entrepreneurs with data-driven decision making

CERTIFICATIONS:
• IBM AI Engineering Professional Certificate
• Google Cloud Associate Cloud Engineer
• HackerRank Problem Solving Certificate
• AWS Cloud Practitioner
• Web Development – CodTech
• Google Analytics for Beginners`;
    
    try {
        // Create a blob and download link
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Shivam_Sharma_Resume.txt';
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        // Show success message
        showNotification('Resume downloaded successfully! 📄', 'success');
        
        // Add download animation
        const downloadBtn = document.querySelector('.download-btn');
        if (downloadBtn) {
            downloadBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                downloadBtn.style.transform = 'scale(1)';
                downloadBtn.style.transition = 'transform 0.2s ease';
            }, 150);
        }
        
        console.log('Resume download completed successfully');
        
    } catch (error) {
        console.error('Download error:', error);
        showNotification('Error downloading resume. Please try again.', 'error');
    }
}

// Make downloadResume available globally
window.downloadResume = downloadResume;

function highlightEmptyFields(inputs) {
    inputs.forEach(input => {
        if (input && input.value.trim() === '') {
            input.style.borderColor = '#dc2626';
            input.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                input.style.animation = '';
            }, 500);
        }
    });
}

function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;
        const scrollPercent = scrolled / heroHeight;
        
        if (scrollPercent <= 1) {
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrolled * 0.05}px)`;
            }
        }
    });
}

function initHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.background = 'rgba(220, 38, 38, 0.15)';
            item.style.color = '#dc2626';
            item.style.transform = 'translateY(-3px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.background = '';
            item.style.color = '';
            item.style.transform = 'translateY(0)';
        });
    });
    
    const certificationCards = document.querySelectorAll('.certification-card');
    certificationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.certification-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'all 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.certification-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    const timelineItems = document.querySelectorAll('.timeline-content');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const marker = item.parentElement.querySelector('.timeline-marker');
            if (marker) {
                marker.style.transform = 'scale(1.2)';
                marker.style.transition = 'all 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            const marker = item.parentElement.querySelector('.timeline-marker');
            if (marker) {
                marker.style.transform = 'scale(1)';
            }
        });
    });
    
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.transition = 'all 0.2s ease';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });
    
    const educationItems = document.querySelectorAll('.education-item');
    educationItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.borderColor = '#ef4444';
            item.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.borderColor = '#dc2626';
            item.style.transform = 'translateX(0)';
        });
    });
}

function initLoadingAnimations() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
                heroContent.style.transition = 'all 1s ease';
            }, 300);
        }
        
        const nav = document.querySelector('.nav');
        if (nav) {
            nav.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                nav.style.transform = 'translateY(0)';
                nav.style.transition = 'all 0.6s ease';
            }, 500);
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const iconMap = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️'
    };
    
    notification.innerHTML = `
        <div style="display: flex; align-items: flex-start; gap: 12px;">
            <div style="font-size: 20px; flex-shrink: 0; margin-top: 2px;">
                ${iconMap[type] || iconMap.info}
            </div>
            <div style="line-height: 1.4;">${message}</div>
            <button class="notification-close" style="
                background: none; 
                border: none; 
                color: white; 
                font-size: 18px; 
                cursor: pointer; 
                padding: 0; 
                margin-left: auto;
                flex-shrink: 0;
            ">×</button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #1f1f1f;
        color: white;
        border: 2px solid #dc2626;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.8);
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-weight: 500;
        font-size: 14px;
    `;
    
    document.body.appendChild(notification);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    const autoRemoveDelay = type === 'success' ? 6000 : 5000;
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, autoRemoveDelay);
}

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

const debouncedScrollHandler = debounce(() => {
    // Heavy scroll operations
}, 16);

window.addEventListener('scroll', debouncedScrollHandler);

window.addEventListener('resize', debounce(() => {
    const heroContent = document.querySelector('.hero-content');
    if (window.innerWidth <= 768 && heroContent) {
        heroContent.style.textAlign = 'center';
    }
    
    if (window.innerWidth > 480 && !document.querySelector('.cursor-trail')) {
        initCursorAnimations();
    }
}, 250));

function initAccessibility() {
    const skipLink = document.createElement('a');
    skipLink.href = '#about';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #dc2626;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        border-radius: 4px;
        transition: top 0.3s;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            const offsetTop = aboutSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            aboutSection.focus();
        }
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    const nav = document.querySelector('.nav');
    if (nav) {
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Main navigation');
    }
    
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.setAttribute('role', 'banner');
    }
    
    const sections = document.querySelectorAll('section[id]:not(#home)');
    sections.forEach(section => {
        section.setAttribute('role', 'region');
        const title = section.querySelector('.section-title');
        if (title) {
            section.setAttribute('aria-labelledby', title.id || `section-${section.id}`);
            if (!title.id) {
                title.id = `section-${section.id}`;
            }
        }
    });

    const focusableElements = document.querySelectorAll('a, button, input, textarea, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #dc2626';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

const revealSections = () => {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionVisible = 150;
        
        if (sectionTop < windowHeight - sectionVisible) {
            section.classList.add('loading-animation');
        }
    });
};

window.addEventListener('scroll', revealSections);
revealSections();

const shakeCSS = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = shakeCSS;
document.head.appendChild(styleSheet);

// Easter egg
document.addEventListener('keydown', (e) => {
    const sequence = ['s', 'h', 'i', 'v', 'a', 'm'];
    if (!window.easterEggSequence) window.easterEggSequence = [];
    
    window.easterEggSequence.push(e.key.toLowerCase());
    
    if (window.easterEggSequence.length > sequence.length) {
        window.easterEggSequence.shift();
    }
    
    if (window.easterEggSequence.join('') === sequence.join('')) {
        showNotification('🎉 Hello! You found the easter egg! Welcome to Shivam\'s portfolio!', 'success');
        window.easterEggSequence = [];
        
        const heroTitle = document.querySelector('.hero-title');
        const cursorGlow = document.querySelector('.cursor-glow');
        if (heroTitle) {
            heroTitle.style.animation = 'bounce 1s ease-in-out 3';
        }
        if (cursorGlow) {
            cursorGlow.style.background = 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%)';
            
            setTimeout(() => {
                cursorGlow.style.background = 'radial-gradient(circle, rgba(220, 38, 38, 0.1) 0%, transparent 70%)';
            }, 3000);
        }
    }
});

window.addEventListener('beforeunload', () => {
    const cursorElements = document.querySelectorAll('.cursor-trail, .cursor-glow, .cursor-ripple, .cursor-particle');
    cursorElements.forEach(element => {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    });
});

console.log(`
🚀 Welcome to Shivam Sharma's Portfolio with Advanced Cursor Animations!
📧 Contact: shivamsharma4c@gmail.com
📱 Phone: +91 90637 03256
📍 Location: IDA Bollaram, Hyderabad, Telangana

🔗 Social Links:
LinkedIn: https://www.linkedin.com/in/shivam-sharma1203
Instagram: https://www.instagram.com/shivam._s3/
GitHub: https://github.com/shivamsharma-3

✅ FIXED ISSUES:
- Navigation links now work with smooth scrolling
- Contact form is fully functional with Formspree integration
- Download resume button works and creates a detailed text file
- All form inputs accept text properly
- Hero section buttons navigate correctly

This portfolio features:
- Cursor trail animations (no large circle)
- Magnetic hover effects
- Click ripple effects
- Working contact form with Formspree
- Download resume functionality
- Premium black/white/red theme
- Responsive design for all devices
- Performance optimized animations

Built with pure HTML5, CSS3, and JavaScript
No external frameworks - just pure performance!

Cursor Features:
🌟 Dynamic trail following
💫 Click ripple animations
🎯 Magnetic attraction to interactive elements
🎨 Context-sensitive glow effects
🔥 Particle effects on interaction
✨ Works alongside default cursor

Feel free to explore the code and animations! 
`);