document.addEventListener('DOMContentLoaded', function () {

    // 1. Initial Fade In for Hero Elements on Load
    const heroElements = document.querySelectorAll('.hero-section h1, .hero-section p, .hero-section a');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 + (index * 200)); // Staggered delay
    });

    // 2. Navbar Scroll Effect (Glassmorphism trigger)
    const navbar = document.getElementById('mainNav');
    function checkScroll() {
        if (window.scrollY > 30) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }
    }
    if (navbar) {
        window.addEventListener('scroll', checkScroll);
        checkScroll();
    }

    // 3. Scroll Reveal Animation (Intersection Observer)
    // Automatically target typical content sections
    const targetSelectors = '.card, .service-item, .process-step, .section-padding h2, .section-padding p, .highlight-card, .row > div';

    // Add the 'animate-ready' class to all targets initially
    const elementsToAnimate = document.querySelectorAll(targetSelectors);
    elementsToAnimate.forEach(el => {
        // Only if it's not already in the hero (avoid double animating)
        if (!el.closest('.hero-section')) {
            el.classList.add('animate-ready');
        }
    });

    const observerOptions = {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -50px 0px' // Offset slightly so it triggers before bottom
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach(el => {
        if (!el.closest('.hero-section')) {
            observer.observe(el);
        }
    });
});
