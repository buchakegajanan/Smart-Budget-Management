/* ==========================================================================
   GULLAK SMART BUDGET TRACKING - APPLICATION CONTROLLER
   Form Orchestrations, Left Panel Particle Canvas, Dynamic Indicators & HUD Toasts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Showcase Left Panel - Golden Dust Floating Particle System
    initShowcaseParticles();

    // 2. Showcase Left Panel - Auto Rotating Quote Carousel
    initQuoteCarousel();

    // 3. Right Panel Form Box Toggle (Login <-> Register)
    initFormToggling();

    // 4. Form Validation, Password Strength Validator & Toast Alerts
    initFormValidationAndToasts();
});

/**
 * Programmatic HTML5 Canvas particle system for the left branding showcase panel.
 * Draws subtle, elegant glowing golden dust embers floating over the terracotta gullak image.
 */
function initShowcaseParticles() {
    const canvas = document.getElementById('showcase-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w = 0, h = 0;
    const particles = [];

    const resize = () => {
        w = canvas.width = canvas.parentElement.clientWidth;
        h = canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class ShowcaseEmber {
        constructor() {
            this.reset(true);
        }

        reset(initial = false) {
            this.x = Math.random() * w;
            this.y = initial ? Math.random() * h : h + 20;
            this.size = 0.8 + Math.random() * 2.2;
            this.speedY = -(0.2 + Math.random() * 0.6);
            this.speedX = (Math.random() * 2 - 1) * 0.2;
            this.alpha = 0.08 + Math.random() * 0.55;
            this.decay = 0.001 + Math.random() * 0.003;
            this.orbitWidth = Math.random() * 30;
            this.orbitSpeed = 0.005 + Math.random() * 0.01;
            this.angle = Math.random() * Math.PI * 2;
        }

        update() {
            this.angle += this.orbitSpeed;
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.angle) * 0.15;
            this.alpha -= this.decay;

            if (this.alpha <= 0 || this.y < -20) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.beginPath();
            const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3.5);
            grad.addColorStop(0, `rgba(241, 196, 15, ${this.alpha})`); // Gold core
            grad.addColorStop(0.4, `rgba(230, 126, 34, ${this.alpha * 0.5})`); // Terracotta outer glow
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.fillStyle = grad;
            ctx.arc(this.x, this.y, this.size * 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // Initialize embers
    for (let i = 0; i < 40; i++) {
        particles.push(new ShowcaseEmber());
    }

    // Particle loop
    const animate = () => {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    };
    animate();
}

/**
 * Quote and features carousel rotation orchestration
 */
function initQuoteCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    let activeIdx = 0;
    let timer = null;

    const switchSlide = (targetIdx) => {
        if (targetIdx === activeIdx) return;
        
        // Remove active class
        slides[activeIdx].classList.remove('active');
        indicators[activeIdx].classList.remove('active');

        // Set target active
        activeIdx = targetIdx;
        slides[activeIdx].classList.add('active');
        indicators[activeIdx].classList.add('active');
    };

    const startTimer = () => {
        timer = setInterval(() => {
            const next = (activeIdx + 1) % slides.length;
            switchSlide(next);
        }, 5000);
    };

    // Indicator clicks
    indicators.forEach(ind => {
        ind.addEventListener('click', (e) => {
            clearInterval(timer);
            const target = parseInt(e.target.getAttribute('data-slide'));
            switchSlide(target);
            startTimer();
        });
    });

    startTimer();
}

/**
 * Handle form toggle sliding animations between Sign In and Registration boxes.
 */
function initFormToggling() {
    const loginBox = document.getElementById('login-box');
    const registerBox = document.getElementById('register-box');
    const btnToRegister = document.getElementById('btn-switch-to-register');
    const btnToLogin = document.getElementById('btn-switch-to-login');

    const showBox = (show, hide) => {
        hide.style.opacity = '0';
        hide.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            hide.classList.remove('active');
            hide.style.opacity = '';
            hide.style.transform = '';
            show.classList.add('active');
        }, 250);
    };

    btnToRegister && btnToRegister.addEventListener('click', () => showBox(registerBox, loginBox));
    btnToLogin && btnToLogin.addEventListener('click', () => showBox(loginBox, registerBox));
}

/**
 * Polish Form inputs floating interactions, Password strength validation,
 * custom Tooltip errors, and Toast notification triggers.
 */
function initFormValidationAndToasts() {
    // Selection
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    
    const loginEmail = document.getElementById('login-email');
    const loginPass = document.getElementById('login-pass');
    
    const regName = document.getElementById('reg-name');
    const regEmail = document.getElementById('reg-email');
    const regPhone = document.getElementById('reg-phone');
    const regPass = document.getElementById('reg-pass');
    const regTerms = document.getElementById('reg-terms');

    // Password visibility toggles
    setupPasswordVisibilityToggle('btn-toggle-login-pass', 'login-pass');
    setupPasswordVisibilityToggle('btn-toggle-reg-pass', 'reg-pass');

    // Email pattern matcher
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password validation & indicator bindings
    const strengthIndicator = document.querySelector('.pass-strength-indicator');
    const strengthBar = document.getElementById('strength-bar');
    const strengthLabel = document.getElementById('strength-label');

    regPass.addEventListener('input', (e) => {
        const val = e.target.value;
        if (!val) {
            strengthIndicator.classList.remove('visible');
            return;
        }

        strengthIndicator.classList.add('visible');
        const score = checkPasswordStrengthScore(val);
        
        strengthBar.className = "strength-bar"; // reset
        if (score <= 2) {
            strengthBar.classList.add('strength-weak');
            strengthLabel.innerText = "Password strength: Weak (Try adding symbols/digits)";
            strengthLabel.style.color = "#e74c3c";
        } else if (score === 3) {
            strengthBar.classList.add('strength-medium');
            strengthLabel.innerText = "Password strength: Medium (Add uppercase/caps)";
            strengthLabel.style.color = "#f1c40f";
        } else {
            strengthBar.classList.add('strength-strong');
            strengthLabel.innerText = "Password strength: High-Security (Gullak Secured)";
            strengthLabel.style.color = "#2ecc71";
        }
    });

    // Login submit
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        resetError(loginEmail);
        resetError(loginPass);

        if (!loginEmail.value.trim()) {
            triggerError(loginEmail);
            valid = false;
        }
        if (!loginPass.value.trim()) {
            triggerError(loginPass);
            valid = false;
        }

        if (valid) {
            // Save email-based name as fallback
            const emailName = loginEmail.value.split('@')[0];
            const displayName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
            // Only set if no name already stored from registration
            if (!localStorage.getItem('gullak_user_name')) {
                localStorage.setItem('gullak_user_name', displayName);
            }
            showToast("Welcome Back!", "Redirecting to your dashboard...", "success");
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        }
    });

    // Register submit
    formRegister.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        resetError(regName);
        resetError(regEmail);
        resetError(regPhone);
        resetError(regPass);

        const termsErrText = document.getElementById('error-reg-terms');
        termsErrText.style.display = 'none';

        if (!regName.value.trim()) { triggerError(regName); valid = false; }
        if (!regEmail.value.trim()) { triggerError(regEmail); valid = false; }
        if (!regPhone.value.trim()) { triggerError(regPhone); valid = false; }
        if (!regPass.value.trim()) { triggerError(regPass); valid = false; }
        if (!regTerms.checked) { termsErrText.style.display = 'block'; valid = false; }

        if (valid) {
            // Save user info to localStorage
            const firstName = regName.value.trim().split(' ')[0];
            localStorage.setItem('gullak_user_name', regName.value.trim());
            localStorage.setItem('gullak_user_first', firstName);
            localStorage.setItem('gullak_user_email', regEmail.value.trim());
            localStorage.setItem('gullak_user_phone', regPhone.value.trim());
            showToast("Account Created!", "Redirecting to your dashboard...", "success");
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        }
    });

    // Input wiggles reset on input typed
    [loginEmail, loginPass, regName, regEmail, regPass].forEach(input => {
        input.addEventListener('input', () => resetError(input));
    });
}

function setupPasswordVisibilityToggle(btnId, inputId) {
    const btn = document.getElementById(btnId);
    const input = document.getElementById(inputId);
    if (!btn || !input) return;

    btn.addEventListener('click', () => {
        if (input.type === 'password') {
            input.type = 'text';
            btn.classList.add('visible');
            btn.innerHTML = `<svg class="eye-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
        } else {
            input.type = 'password';
            btn.classList.remove('visible');
            btn.innerHTML = `<svg class="eye-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
        }
    });
}

function checkPasswordStrengthScore(pass) {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
}

function triggerError(input) {
    input.classList.add('invalid');
}

function resetError(input) {
    input.classList.remove('invalid');
}

/**
 * Toast notifications HUD controller method
 */
function showToast(title, message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    // Build DOM elements
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = "✓";
    if (type === 'error') icon = "✕";
    else if (type === 'info') icon = "⚙";

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <div class="toast-content">
            <span class="toast-title">${title}</span>
            <span class="toast-message">${message}</span>
        </div>
    `;

    container.appendChild(toast);

    // Slide in
    setTimeout(() => {
        toast.classList.add('show');
    }, 50);

    // Slide out and remove
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 550);
    }, 4000);
}
