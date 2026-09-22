document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            const icon = hamburger.querySelector('i');

            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');

                const icon = hamburger.querySelector('i');

                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }


    // 2. Sticky Navbar Effect
    const navbar = document.getElementById('navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
                navbar.style.padding = '0.5rem 0';
            } else {
                navbar.style.boxShadow = 'none';
                navbar.style.padding = '0';
            }
        });
    }


    // 3. Scroll Reveal Animation
    const fadeUpElements = document.querySelectorAll('.fade-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeUpElements.forEach(el => {
        observer.observe(el);
    });


    // 4. Modal System (Case Studies)
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('.modal-overlay');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Open Modal
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();

            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);

            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close Modal via button
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });

            document.body.style.overflow = 'auto';
        });
    });

    // Close Modal by clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });


    // 5. Formspree Contact Form
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {

        contactForm.addEventListener('submit', async (e) => {

            e.preventDefault();

            const submitButton = contactForm.querySelector(
                'button[type="submit"]'
            );

            const originalText = submitButton.innerText;

            // Show sending status
            submitButton.innerText = 'Sending...';
            submitButton.disabled = true;

            try {

                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {

                    // Clear form fields
                    contactForm.reset();
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                    event: "generate_lead"
                });

                    // Success message
                    submitButton.innerText = 'Message Sent Successfully!';

                    // Return button to normal after 3 seconds
                    setTimeout(() => {
                        submitButton.innerText = originalText;
                        submitButton.disabled = false;
                    }, 7000);

                } else {

                    // Error message
                    submitButton.innerText = 'Failed to Send';

                    setTimeout(() => {
                        submitButton.innerText = originalText;
                        submitButton.disabled = false;
                    }, 3000);
                }

            } catch (error) {

                // Network error
                submitButton.innerText = 'Error! Try Again';

                setTimeout(() => {
                    submitButton.innerText = originalText;
                    submitButton.disabled = false;
                }, 3000);
            }
        });
    }

});
