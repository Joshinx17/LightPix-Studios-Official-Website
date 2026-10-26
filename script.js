/* LightPix Studios — shared site interactions */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.copyright-year').forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    const nav = document.getElementById('main-nav');
    const menuButton = document.getElementById('hamburger');
    const menu = document.getElementById('nav-links');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function setMenuOpen(open) {
        menu.classList.toggle('open', open);
        menuButton.classList.toggle('active', open);
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        menu.inert = !open && window.innerWidth <= 1024;
    }
    setMenuOpen(false);
    menuButton.addEventListener('click', () => setMenuOpen(!menu.classList.contains('open')));
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
    document.addEventListener('click', event => {
        if (!nav.contains(event.target)) setMenuOpen(false);
    });
    window.addEventListener('resize', () => setMenuOpen(false));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            setMenuOpen(false);
            menuButton.focus();
        }
    });

    const sections = [...document.querySelectorAll('main section[id]')];
    function updateNav() {
        nav.classList.toggle('scrolled', window.scrollY > 60);
        if (!sections.length) return;
        const position = window.scrollY + nav.offsetHeight + 48;
        let current = '';
        sections.forEach(section => {
            if (position >= section.offsetTop) current = section.id;
        });
        menu.querySelectorAll('a[href^="#"]').forEach(link => {
            link.classList.toggle('active-link', link.getAttribute('href') === '#' + current);
        });
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', event => {
            const href = link.getAttribute('href');
            const target = href.length > 1 ? document.getElementById(href.slice(1)) : null;
            if (!target) return;
            event.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight - 20;
            window.scrollTo({ top, behavior: reducedMotion ? 'instant' : 'smooth' });
        });
    });

    const particles = document.getElementById('hero-particles');
    if (particles && !reducedMotion) {
        for (let i = 0; i < 28; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 3 + 1;
            particle.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' +
                Math.random() * 100 + '%;animation-duration:' + (Math.random() * 12 + 8) +
                's;animation-delay:' + Math.random() * 10 + 's;opacity:' + (Math.random() * 0.5 + 0.1);
            particles.appendChild(particle);
        }
    }

    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !reducedMotion) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });
        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('visible'));
    }

    // Keep the inquiry preview inactive until a working inbox is confirmed.
    // After verification, set this address to enable the email-draft workflow.
    const inquiryEmail = '';
    const form = document.getElementById('contact-form');
    if (form) {
        const note = document.querySelector('.contact-note');
        const submitButton = form.querySelector('button[type="submit"]');
        if (inquiryEmail) {
            form.querySelectorAll('input, select, textarea, button').forEach(control => {
                control.disabled = false;
            });
            submitButton.textContent = 'Open Email Draft →';
            note.textContent = 'Submitting this form opens a prepared message in your email app. Send it there to complete your inquiry.';
        }
        form.addEventListener('submit', event => {
            event.preventDefault();
            if (!inquiryEmail || !form.reportValidity()) return;
            const name = form.elements.name.value.trim();
            const email = form.elements.email.value.trim();
            const service = form.elements.service;
            const serviceName = service.options[service.selectedIndex].text;
            const message = form.elements.message.value.trim();
            if (!name || !email || !message) return;
            const subject = 'LightPix project inquiry: ' + serviceName;
            const body = 'Name: ' + name + '\nEmail: ' + email + '\nProject type: ' +
                serviceName + '\n\n' + message;
            window.location.href = 'mailto:' + inquiryEmail + '?subject=' +
                encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        });
    }
});
