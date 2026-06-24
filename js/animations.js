/* ═══════════════════════════════════════════
   SCROLL ANIMATIONS
   Reveal on scroll, counter animation, GPA bar
   ═══════════════════════════════════════════ */

(function () {
    // ── Intersection Observer for reveals ──
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // ── Counter Animation ──
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'), 10);
        const duration = 2000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    document.querySelectorAll('[data-count]').forEach(el => {
        counterObserver.observe(el);
    });

    // ── GPA Bar Animation ──
    const gpaObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target;
                    const gpa = fill.getAttribute('data-gpa');
                    fill.style.width = gpa + '%';
                    gpaObserver.unobserve(fill);
                }
            });
        },
        { threshold: 0.5 }
    );

    document.querySelectorAll('.gpa-fill').forEach(el => {
        gpaObserver.observe(el);
    });
})();
