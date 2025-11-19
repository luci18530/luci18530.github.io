// Configuration
const CONFIG = {
    contactEmail: 'lu12345pe@gmail.com',
    messages: {
        success: 'Mensagem enviada com sucesso! Obrigado — vou responder em breve.',
        error: 'Por favor, preencha todos os campos!'
    }
};


const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnnwvggv';

// Utility function for throttling scroll events
function throttle(func, wait) {
    let timeout;
    let lastRan;
    
    return function executedFunction(...args) {
        const context = this;
        
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                if ((Date.now() - lastRan) >= wait) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, wait - (Date.now() - lastRan));
        }
    };
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link on scroll
    const sections = document.querySelectorAll('section');
    
    // Consolidated scroll handler with throttling
    const handleScroll = throttle(function() {
        // Update active nav link
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Update navbar background
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(15, 15, 15, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.backgroundColor = 'rgba(15, 15, 15, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
        }
        
        // Update back to top button
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
        
        // Animate skills when in view
        animateSkills();
    }, 100);
    
    window.addEventListener('scroll', handleScroll);

    // Get references
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTop');
    
    // Back to top button
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;
    
    function animateSkills() {
        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;
        
        const skillsSectionTop = skillsSection.offsetTop;
        const skillsSectionHeight = skillsSection.clientHeight;
        const windowHeight = window.innerHeight;
        
        if (window.scrollY > skillsSectionTop - windowHeight + 100 && !skillsAnimated) {
            skillBars.forEach(bar => {
                // Get the target width from inline style
                const targetWidth = bar.style.width || bar.getAttribute('data-width') || '0%';
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
            });
            skillsAnimated = true;
        }
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification(CONFIG.messages.error, 'error');
            return;
        }

        // If user hasn't set the Formspree endpoint, fallback to mailto (useful for local testing)
        if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
            const mailtoLink = `mailto:${CONFIG.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`)}`;
            showNotification(CONFIG.messages.success, 'success');
            setTimeout(() => { window.location.href = mailtoLink; }, 1500);
            contactForm.reset();
            return;
        }

        // Send data to Formspree
        const payload = { name, email, subject, message };
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) submitButton.disabled = true;

        fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(async response => {
            if (response.ok) {
                showNotification(CONFIG.messages.success, 'success');
                contactForm.reset();
            } else {
                let errorMsg = 'Erro ao enviar a mensagem. Tente novamente.';
                try {
                    const data = await response.json();
                    if (data && data.error) errorMsg = data.error;
                } catch (err) {}
                showNotification(errorMsg, 'error');
            }
        })
        .catch(err => {
            showNotification('Erro de rede. Verifique sua conexão e tente novamente.', 'error');
        })
        .finally(() => {
            if (submitButton) submitButton.disabled = false;
        });
    });

    // Notification function
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: ${type === 'success' ? '#ff6b35' : '#d94e23'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add CSS for notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(category);
    });

    // Typing effect for hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < originalText.length) {
                // Check if we're at a tag opening
                if (originalText.charAt(charIndex) === '<') {
                    let closingIndex = originalText.indexOf('>', charIndex);
                    heroTitle.innerHTML += originalText.substring(charIndex, closingIndex + 1);
                    charIndex = closingIndex + 1;
                } else {
                    heroTitle.innerHTML += originalText.charAt(charIndex);
                    charIndex++;
                }
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }


    // Set the copyright year dynamically
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        const now = new Date();
        yearSpan.textContent = now.getFullYear();
    }
});
