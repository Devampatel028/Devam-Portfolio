/* ═══════════════════════════════════════════
   PARTICLE BACKGROUND
   Interactive floating particles with connections
   ═══════════════════════════════════════════ */

(function () {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };
    let animationId;

    const CONFIG = {
        particleCount: 60,
        maxDistance: 120,
        particleSize: { min: 1, max: 2.5 },
        speed: { min: 0.15, max: 0.5 },
        color: { r: 212, g: 160, b: 23 },
        mouseRadius: 150,
    };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * (CONFIG.particleSize.max - CONFIG.particleSize.min) + CONFIG.particleSize.min;
            this.speedX = (Math.random() - 0.5) * CONFIG.speed.max;
            this.speedY = (Math.random() - 0.5) * CONFIG.speed.max;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            // Mouse interaction — subtle attraction
            if (mouse.x !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONFIG.mouseRadius) {
                    const force = (CONFIG.mouseRadius - dist) / CONFIG.mouseRadius;
                    this.x += dx * force * 0.01;
                    this.y += dy * force * 0.01;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${CONFIG.color.r}, ${CONFIG.color.g}, ${CONFIG.color.b}, ${this.opacity})`;
            ctx.fill();
        }
    }

    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONFIG.maxDistance) {
                    const opacity = (1 - dist / CONFIG.maxDistance) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${CONFIG.color.r}, ${CONFIG.color.g}, ${CONFIG.color.b}, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        drawConnections();
        animationId = requestAnimationFrame(animate);
    }

    function init() {
        resize();
        particles = [];

        // Adjust particle count for mobile
        const count = window.innerWidth < 768
            ? Math.floor(CONFIG.particleCount * 0.4)
            : CONFIG.particleCount;

        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }

        if (animationId) cancelAnimationFrame(animationId);
        animate();
    }

    // Events
    window.addEventListener('resize', () => {
        resize();
        // Reset particles on resize
        particles.forEach(p => {
            if (p.x > canvas.width) p.x = Math.random() * canvas.width;
            if (p.y > canvas.height) p.y = Math.random() * canvas.height;
        });
    });

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Reduce animation when tab not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });

    init();
})();
