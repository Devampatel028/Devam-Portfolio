/* ═══════════════════════════════════════════
   MAIN — Initialization & Utilities
   ═══════════════════════════════════════════ */

(function () {
    // ── Smooth scroll for anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = 80;
                const offset = 50; // pull the section up to reduce excess padding space
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight + offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ── Tilt effect on project cards (desktop only) ──
    if (!('ontouchstart' in window)) {
        const cards = document.querySelectorAll('.project-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // ── Remove loading class after page load ──
    window.addEventListener('load', () => {
        document.body.classList.remove('loading');
    });

    // ── Log a nice console message ──
    console.log(
        '%c👋 Hello! Built by Devam Patel',
        'color: #d4a017; font-size: 16px; font-weight: bold; padding: 8px;'
    );

    // ── Certificates Toggle Logic ──
    const showAllBtn = document.getElementById('showAllCertsBtn');
    const hiddenCerts = document.querySelectorAll('.hidden-cert');
    let isShowingAll = false;

    if (showAllBtn && hiddenCerts.length > 0) {
        showAllBtn.addEventListener('click', () => {
            isShowingAll = !isShowingAll;
            hiddenCerts.forEach(cert => {
                if (isShowingAll) {
                    cert.classList.add('show');
                } else {
                    cert.classList.remove('show');
                }
            });
            showAllBtn.querySelector('span').textContent = isShowingAll ? 'Show Less' : 'Show All Certificates';
        });
    }
})();
