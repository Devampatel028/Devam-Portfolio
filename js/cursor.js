/* ═══════════════════════════════════════════
   CUSTOM CURSOR
   Dot + ring following cursor with hover states
   ═══════════════════════════════════════════ */

(function () {
    // Skip on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot follows immediately
        dot.style.left = mouseX - 3 + 'px';
        dot.style.top = mouseY - 3 + 'px';
    });

    // Ring follows with smooth lag
    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        ring.style.left = ringX - 18 + 'px';
        ring.style.top = ringY - 18 + 'px';

        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .btn, .glass-card, .skill-tags span, .social-btn');

    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => ring.classList.add('hover'));
        target.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
})();
