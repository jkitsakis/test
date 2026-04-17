/* =========================
   ELEMENTS
========================= */

const header = document.querySelector('.site-header');
const progress = document.querySelector('.scroll-progress');
const floatingCTA = document.querySelector('.floating-cta');

const nav = document.querySelector('.nav-list');
const indicator = document.querySelector('.nav-indicator');

const magneticElements = document.querySelectorAll('.btn, .cta-link, .magnetic');


/* =========================
   SCROLL (HEADER + PROGRESS + CTA)
========================= */

let lastScroll = 0;

window.addEventListener('scroll', () => {

    const currentScroll = window.scrollY;

    /* ===== HEADER SHRINK ===== */
    if (currentScroll > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    /* ===== HIDE / SHOW HEADER ===== */
    if (currentScroll > lastScroll && currentScroll > 120) {
        header.classList.add('hidden');
        floatingCTA?.classList.add('visible');
    } else {
        header.classList.remove('hidden');
        floatingCTA?.classList.remove('visible');
    }

    lastScroll = currentScroll;

    /* ===== SCROLL PROGRESS ===== */
    if (progress) {
        const height = document.body.scrollHeight - window.innerHeight;
        const percent = (currentScroll / height) * 100;
        progress.style.width = percent + '%';
    }
});


/* =========================
   NAV INDICATOR (SLIDING)
========================= */

if (nav && indicator) {

    const moveIndicator = (el) => {
        const rect = el.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();

        indicator.style.width = rect.width + 'px';
        indicator.style.transform =
            `translateX(${rect.left - navRect.left}px)`;
    };

    nav.querySelectorAll('a').forEach(link => {

        link.addEventListener('mouseenter', (e) => {
            moveIndicator(e.target);
        });

        link.addEventListener('focus', (e) => {
            moveIndicator(e.target);
        });

    });

    /* set active on load */
    const active = nav.querySelector('a.active');
    if (active) {
        setTimeout(() => moveIndicator(active), 100);
    }
}


/* =========================
   MAGNETIC BUTTON EFFECT
========================= */

magneticElements.forEach(el => {

    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const moveX = (x - rect.width / 2) * 0.15;
        const moveY = (y - rect.height / 2) * 0.15;

        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0,0)';
    });

});


/* =========================
   MOBILE MENU (optional safe toggle)
========================= */

const toggle = document.querySelector('.mobile-toggle');
const menu = document.querySelector('.mobile-menu');

toggle?.addEventListener('click', () => {
    const isOpen = menu.hasAttribute('hidden');

    if (isOpen) {
        menu.removeAttribute('hidden');
    } else {
        menu.setAttribute('hidden', '');
    }
});