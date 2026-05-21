/* =============================================
   LIGHTPIX STUDIOS — MAIN JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ─── NAVBAR SCROLL EFFECT ─────────────────── */
    const nav = document.getElementById('main-nav');
    const handleScroll = () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
        highlightNavLink();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    /* ─── MOBILE HAMBURGER ──────────────────────── */
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
    });
    // Close menu when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });

    /* ─── ACTIVE NAV LINK ON SCROLL ─────────────── */
    const sections = document.querySelectorAll('section[id]');
    function highlightNavLink() {
        const scrollY = window.scrollY + 120;
        let current = '';
        sections.forEach(s => {
            if (scrollY >= s.offsetTop) current = s.id;
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active-link', link.getAttribute('href') === `#${current}`);
        });
    }

    /* ─── HERO PARTICLES ─────────────────────────── */
    const particleContainer = document.getElementById('hero-particles');
    if (particleContainer) {
        for (let i = 0; i < 28; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 3 + 1;
            p.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${Math.random() * 100}%;
                animation-duration: ${Math.random() * 12 + 8}s;
                animation-delay: ${Math.random() * 10}s;
                opacity: ${Math.random() * 0.5 + 0.1};
            `;
            particleContainer.appendChild(p);
        }
    }

    /* ─── REVEAL ON SCROLL (INTERSECTION OBSERVER) ─ */
    const revealEls = document.querySelectorAll('.reveal, .stat-card, .book-card, .film-card, .photo-item, .edit-feature');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 80);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealEls.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    /* ─── ANIMATED STATS COUNTER ─────────────────── */
    const statNums = document.querySelectorAll('.stat-num');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statNums.forEach(el => statsObserver.observe(el));

    function animateCounter(el) {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = Math.floor(current);
        }, 16);
    }

    /* ─── PHOTOGRAPHY FILTER ─────────────────────── */
    const filterBtns = document.querySelectorAll('.photo-filter');
    const photoItems = document.querySelectorAll('.photo-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            photoItems.forEach(item => {
                const match = filter === 'all' || item.dataset.category === filter;
                item.style.opacity = '0';
                item.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    item.style.display = match ? 'block' : 'none';
                    if (match) {
                        requestAnimationFrame(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        });
                    }
                }, 200);
            });
        });
    });

    /* ─── CONTACT FORM ───────────────────────────── */
    const form       = document.getElementById('contact-form');
    const submitBtn  = document.getElementById('submit-btn');
    const successMsg = document.getElementById('form-success');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name    = document.getElementById('cf-name').value.trim();
            const email   = document.getElementById('cf-email').value.trim();
            const message = document.getElementById('cf-message').value.trim();

            if (!name || !email || !message) {
                shakeForm(form);
                return;
            }
            if (!isValidEmail(email)) {
                shakeForm(document.getElementById('cf-email').parentElement);
                return;
            }

            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled  = true;

            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = '<span>Send Message</span><span class="btn-arrow">→</span>';
                submitBtn.disabled  = false;
                successMsg.classList.add('show');
                setTimeout(() => successMsg.classList.remove('show'), 5000);
            }, 1400);
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    function shakeForm(el) {
        el.style.animation = 'none';
        el.offsetHeight; // reflow
        el.style.animation = 'shake 0.4s ease';
        setTimeout(() => el.style.animation = '', 400);
    }

    /* ─── SMOOTH SCROLL FOR ANCHOR LINKS ─────────── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = nav.offsetHeight + 20;
                const top    = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* ─── LIGHTBOX ───────────────────────────────── */
    let lightboxImages = [];
    let currentLbIndex = 0;

    function buildLightboxGallery() {
        lightboxImages = [...document.querySelectorAll('.photo-item img')].map(img => ({
            src: img.src,
            alt: img.alt
        }));
    }
    buildLightboxGallery();

    document.getElementById('lb-prev')?.addEventListener('click', (e) => {
        e.stopPropagation();
        currentLbIndex = (currentLbIndex - 1 + lightboxImages.length) % lightboxImages.length;
        setLightboxImage(currentLbIndex);
    });
    document.getElementById('lb-next')?.addEventListener('click', (e) => {
        e.stopPropagation();
        currentLbIndex = (currentLbIndex + 1) % lightboxImages.length;
        setLightboxImage(currentLbIndex);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const lb = document.getElementById('lightbox');
        if (!lb.classList.contains('active')) return;
        if (e.key === 'Escape')      closeLightbox();
        if (e.key === 'ArrowLeft')   { currentLbIndex = (currentLbIndex - 1 + lightboxImages.length) % lightboxImages.length; setLightboxImage(currentLbIndex); }
        if (e.key === 'ArrowRight')  { currentLbIndex = (currentLbIndex + 1) % lightboxImages.length; setLightboxImage(currentLbIndex); }
    });

    // Close lightbox on backdrop click
    document.getElementById('lightbox')?.addEventListener('click', (e) => {
        if (e.target === document.getElementById('lightbox')) closeLightbox();
    });

    function setLightboxImage(index) {
        const lbImg = document.getElementById('lightbox-img');
        const lbCap = document.getElementById('lightbox-caption');
        lbImg.style.opacity = '0';
        setTimeout(() => {
            lbImg.src = lightboxImages[index].src;
            lbImg.alt = lightboxImages[index].alt;
            if (lbCap) lbCap.textContent = lightboxImages[index].alt;
            lbImg.style.opacity = '1';
        }, 180);
    }

    // Inject smooth transition on lightbox image
    const lbImg = document.getElementById('lightbox-img');
    if (lbImg) lbImg.style.transition = 'opacity 0.18s ease';

});

/* ─── LIGHTBOX GLOBAL FUNCTIONS ──────────────────── */
function openLightbox(element) {
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbCap = document.getElementById('lightbox-caption');
    const clickedImg = element.querySelector('img');

    lbImg.src = clickedImg.src;
    lbImg.alt = clickedImg.alt;
    if (lbCap) lbCap.textContent = clickedImg.alt;

    // Find current index
    const allImgs = [...document.querySelectorAll('.photo-item img')];
    const idx = allImgs.findIndex(img => img.src === clickedImg.src);
    if (idx !== -1) { /* update currentLbIndex via closure — we use a data attr */ }
    lb.setAttribute('data-index', idx >= 0 ? idx : 0);

    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

/* ─── PDF READER GLOBAL FUNCTIONS ───────────────── */
function openBook(url) {
    const reader = document.getElementById('pdf-reader');
    const frame  = document.getElementById('pdf-frame');
    frame.src    = url;
    reader.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBook() {
    const reader = document.getElementById('pdf-reader');
    const frame  = document.getElementById('pdf-frame');
    reader.classList.remove('active');
    frame.src = '';
    document.body.style.overflow = '';
}

/* ─── CSS SHAKE ANIMATION (injected) ─────────────── */
(function injectKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%,100% { transform: translateX(0); }
            20%      { transform: translateX(-8px); }
            40%      { transform: translateX(8px); }
            60%      { transform: translateX(-5px); }
            80%      { transform: translateX(5px); }
        }
        .active-link { color: var(--gold) !important; }
        .active-link::after { left: 0.85rem !important; right: 0.85rem !important; }
    `;
    document.head.appendChild(style);
})();