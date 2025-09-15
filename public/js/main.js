// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const angebotForm = document.getElementById('angebot-form');
const angebotMessage = document.getElementById('angebot-message');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class for styling
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

function updateActiveNav() {
    const scrollPosition = window.pageYOffset + navbar.offsetHeight + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Angebot form handling
angebotForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(angebotForm);
    const data = {};

    // Regular form fields
    for (let [key, value] of formData.entries()) {
        if (key === 'services') {
            if (!data.services) data.services = [];
            data.services.push(value);
        } else {
            data[key] = value;
        }
    }

    // Basic client-side validation
    if (!data.name || !data.email) {
        showAngebotMessage('Bitte füllen Sie alle Pflichtfelder aus.', 'error');
        return;
    }

    if (!isValidEmail(data.email)) {
        showAngebotMessage('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
        return;
    }

    if (!data.services || data.services.length === 0) {
        showAngebotMessage('Bitte wählen Sie mindestens eine gewünschte Leistung aus.', 'error');
        return;
    }

    // Show loading state
    const submitButton = angebotForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Angebot wird erstellt...';
    submitButton.disabled = true;

    try {
        const response = await fetch('/api/angebot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok && result.success) {
            showAngebotMessage('Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt. Sie erhalten binnen 24 Stunden ein unverbindliches Angebot von uns.', 'success');
            angebotForm.reset();

            // Uncheck all checkboxes
            document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        } else {
            showAngebotMessage(result.error || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.', 'error');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showAngebotMessage('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt unter 0251 / 123 456.', 'error');
    } finally {
        // Restore button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }
});

// Show angebot form message
function showAngebotMessage(message, type) {
    angebotMessage.textContent = message;
    angebotMessage.className = `form-message ${type}`;
    angebotMessage.style.display = 'block';

    // Scroll to message
    angebotMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Auto-hide success messages after 8 seconds
    if (type === 'success') {
        setTimeout(() => {
            angebotMessage.style.display = 'none';
        }, 8000);
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .feature, .contact-item');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation for service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.style.animation = 'fadeInUp 0.6s ease forwards';
});

// CSS Animation keyframes (add to CSS via JavaScript)
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .nav-link.active {
        color: var(--primary-color);
        background-color: var(--bg-light);
    }

    /* Smooth scroll behavior */
    html {
        scroll-behavior: smooth;
    }

    /* Focus styles for accessibility */
    .btn:focus,
    input:focus,
    select:focus,
    textarea:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }

    /* Loading spinner for form submission */
    .fa-spinner {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Enhanced service card interactions
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'var(--shadow)';
    });
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.startsWith('49')) {
            value = '+49 ' + value.substring(2);
        } else if (value.startsWith('0')) {
            value = '+49 ' + value.substring(1);
        }
        // Format: +49 XXX XXXXXXX
        if (value.length > 3) {
            value = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
        }
        e.target.value = value;
    });
}

// Add click tracking for analytics (placeholder)
document.querySelectorAll('.service-btn, .btn').forEach(button => {
    button.addEventListener('click', function () {
        const buttonText = this.textContent.trim();
        const section = this.closest('section')?.id || 'unknown';

        // Analytics tracking would go here
        console.log(`Button clicked: ${buttonText} in section: ${section}`);

        // For phone links, track separately
        if (this.href && this.href.includes('tel:')) {
            console.log('Phone call initiated');
        }
    });
});

// Initialize tooltips or additional features
document.addEventListener('DOMContentLoaded', () => {
    // Add current year to footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }

    // Add loading class removal after page load
    document.body.classList.remove('loading');

    // Initialize any additional features
    console.log('🚀 KK-Facility-Management Website loaded successfully!');
});
