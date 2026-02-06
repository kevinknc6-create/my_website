// ============================================
// NAVIGATION & SMOOTH SCROLL
// ============================================

const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Mobile nav toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Navbar scroll state
window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const targetId = anchor.getAttribute('href') || '';
        if (targetId.length < 2) return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// ============================================
// PORTFOLIO FILTERING
// ============================================

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter') || 'all';

        // Active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter items
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category') || '';
            const show = filterValue === 'all' || category === filterValue;
            item.style.display = show ? 'block' : 'none';
        });
    });
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px',
    }
);

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
});

// ============================================
// CONTACT FORM WITH EMAILJS
// ============================================

// Icyitonderwa: Nakuyeho za "spaces" zari mu mpera za Keys zawe
const EMAILJS_PUBLIC_KEY = 'aIQXCqq_72diZf-dp'; 
const EMAILJS_SERVICE_ID = 'service_8x5z18r'; 
const EMAILJS_TEMPLATE_ID = 'template_c2syf7h'; 

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    console.log('EmailJS initialized successfully.');
} else {
    console.error('EmailJS SDK not loaded. Check your script tag in index.html.');
}

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

if (contactForm && formMessage) {
    contactForm.addEventListener('submit', async e => {
        e.preventDefault();

        // Gufata amakuru mu ifishi
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const phone = contactForm.phone.value.trim();
        const service = contactForm.service.value;
        const date = contactForm.date.value;
        const budget = contactForm.budget.value.trim();
        const message = contactForm.message.value.trim();

        // Validation y'ibanze
        if (!name || !email || !phone || !message) {
            formMessage.textContent = 'Mwandike amakuru yose asabwa.';
            formMessage.style.color = '#fca5a5';
            formMessage.style.display = 'block';
            return;
        }

        // Kwerekana ko ubutumwa buri kugenda
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        const templateParams = {
            from_name: name,
            from_email: email,
            reply_to: email,
            user_phone: phone,
            service: service || 'Not specified',
            wedding_date: date || 'Not specified',
            budget: budget || 'Not specified',
            message: message,
        };

        try {
            // Kohereza ubutumwa
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

            // Niba bigenze neza
            formMessage.textContent = `Murakoze ${name}! Ubutumwa bwanyu bwageze kwa Mahit Studios. Turabuvugisha vuba.`;
            formMessage.style.color = '#bbf7d0';
            formMessage.style.display = 'block';
            contactForm.reset();

        } catch (error) {
            console.error('EmailJS Error:', error);
            formMessage.textContent = 'Hari ikibazo cyabayeyo. Mwagerageza nanone cyangwa mukatwandikira kuri mahitstudios4@gmail.com';
            formMessage.style.color = '#fca5a5';
            formMessage.style.display = 'block';
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Inquiry';
            }
        }
    });
}
