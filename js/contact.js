/* ═══════════════════════════════════════════
   CONTACT FORM HANDLER
   Opens mailto: with pre-filled name, subject & message
   ═══════════════════════════════════════════ */

(function () {
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('senderName').value.trim();
        const email = document.getElementById('senderEmail').value.trim();
        const subject = document.getElementById('subject').value.trim() || 'Portfolio Contact';
        const message = document.getElementById('message').value.trim();

        // Use FormSubmit.co AJAX endpoint to send silently
        const btn = form.querySelector('button[type="submit"]');
        const originalBtnText = btn.innerHTML;
        
        if (btn.disabled) return; // Prevent double submit
        
        btn.innerHTML = '<span>Sending...</span>';
        btn.disabled = true;

        fetch("https://formsubmit.co/ajax/pateldevam2006@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message: message
            })
        })
        .then(response => response.json())
        .then(data => {
            // Show success message
            form.style.display = 'none';
            successMsg.classList.add('show');
            btn.innerHTML = originalBtnText;
            btn.disabled = false;

            // Reset after 5 seconds so they can send another
            setTimeout(() => {
                form.reset();
                form.style.display = 'flex';
                successMsg.classList.remove('show');
            }, 5000);
        })
        .catch(error => {
            console.log(error);
            alert("Oops! Something went wrong. Please try again later.");
            btn.innerHTML = originalBtnText;
            btn.disabled = false;
        });
    });

    // ── Input focus animations ──
    const inputs = form.querySelectorAll('.form-input');

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
})();
