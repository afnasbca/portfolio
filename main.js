document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Portfolio filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Lucide Icons Initialization
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Skill progress animation
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.skill-progress');
                bars.forEach(bar => {
                    const targetWidth = bar.getAttribute('style').match(/width:\s*(\d+)%/)[1];
                    bar.style.width = targetWidth + '%';
                });
            }
        });
    }, { threshold: 0.2 });

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        // Reset widths for animation
        skillsSection.querySelectorAll('.skill-progress').forEach(bar => {
            bar.style.width = '0%';
        });
        skillObserver.observe(skillsSection);
    }

    // Magnetic Buttons
    const magneticBtns = document.querySelectorAll('.btn, .btn-contact');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

    // Form handling
    const contactForm = document.getElementById('contact-form');
    const toastContainer = document.getElementById('toast-container');

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
      <div class="toast-icon">
        <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}"></i>
      </div>
      <div class="toast-message">${message}</div>
    `;

        toastContainer.appendChild(toast);
        if (window.lucide) window.lucide.createIcons();

        // Trigger animation
        setTimeout(() => toast.classList.add('visible'), 100);

        // Remove toast
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => toast.remove(), 600);
        }, 4000);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = 'Sending...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                contactForm.reset();

                showToast('Message sent successfully! I will get back to you soon.');
            }, 1500);
        });
    }
});
