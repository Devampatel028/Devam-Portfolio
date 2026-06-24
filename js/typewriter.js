/* ═══════════════════════════════════════════
   TYPEWRITER EFFECT
   Cycles through role descriptions in the hero
   ═══════════════════════════════════════════ */

(function () {
    const element = document.getElementById('typewriter');
    if (!element) return;

    const phrases = [
        'full-stack web apps.',
        'REST APIs & backends.',
        'AI-powered platforms.',
        'responsive interfaces.',
        'scalable solutions.',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            element.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            element.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        // Finished typing the phrase
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause before deleting
        }

        // Finished deleting
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before next phrase
        }

        setTimeout(type, typingSpeed);
    }

    // Start after a short delay
    setTimeout(type, 1500);
})();
