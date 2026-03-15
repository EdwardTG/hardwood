(function () {
    var header    = document.getElementById('header');
    var nav       = document.getElementById('nav');
    var hamburger = document.getElementById('hamburger');

    if (!header) return;

    // ── Header state: transparent → solid on scroll ──────────────────────
    function updateHeader() {
        var scrolled = window.scrollY > 60;
        header.classList.toggle('is-top',      !scrolled);
        header.classList.toggle('is-scrolled',  scrolled);

        // Mobile only: hide header when scrolling away from top
        if (window.innerWidth <= 768) {
            if (window.scrollY > 80) {
                header.classList.add('is-hidden');
                closeNav();
            } else {
                header.classList.remove('is-hidden');
            }
        } else {
            header.classList.remove('is-hidden');
        }
    }

    window.addEventListener('scroll',  updateHeader, { passive: true });
    window.addEventListener('resize',  function () {
        updateHeader();
        if (window.innerWidth > 768) closeNav();
    });

    updateHeader(); // set correct state on load

    // ── Hamburger / mobile nav ───────────────────────────────────────────
    function closeNav() {
        nav.classList.remove('is-open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    hamburger.addEventListener('click', function () {
        var isOpen = nav.classList.toggle('is-open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close nav when any nav link is tapped
    nav.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', closeNav);
    });

    // ── Smooth scroll (offset for fixed header) ──────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var id     = this.getAttribute('href');
            var target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            var offset = header.offsetHeight + 8;
            var top    = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });
})();
