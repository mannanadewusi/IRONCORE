// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
        });

        // Close mobile menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    // --- Fade-in Animation Observer ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // --- Modal Logic ---
    const openModalBtns = document.querySelectorAll('[data-modal-target]');
    const closeBtns = document.querySelectorAll('.modal-close');
    const overlays = document.querySelectorAll('.modal-overlay');

    function openModal(modalId) {
        const modal = document.querySelector(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
            
            // Optionally reset form state if it was successful previously
            setTimeout(() => {
                const successMsg = modal.querySelector('.form-success');
                const formEl = modal.querySelector('form');
                if (successMsg && formEl) {
                    successMsg.style.display = 'none';
                    formEl.style.display = 'block';
                    formEl.reset();
                }
            }, 300);
        }
    }

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // If it's a link, prevent default jump
            if (btn.tagName === 'A' && btn.getAttribute('href').startsWith('#')) {
                e.preventDefault();
            }
            
            const target = btn.getAttribute('data-modal-target');
            
            // Prefill logic for membership plan
            if (target === '#membership-modal') {
                const planInput = document.getElementById('membership-plan');
                const planName = btn.getAttribute('data-plan-name');
                if (planInput && planName) {
                    planInput.value = planName;
                    
                    // Also attempt to select it in the dropdown if we use a select field
                    const selectField = document.getElementById('plan-select');
                    if (selectField) {
                       for(let i=0; i<selectField.options.length; i++) {
                           if(selectField.options[i].value === planName) {
                               selectField.selectedIndex = i;
                               break;
                           }
                       }
                    }
                }
            }
            
            openModal(target);
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            closeModal(modal);
        });
    });

    overlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay);
            }
        });
    });

    // --- Form Submission Logic ---
    const forms = document.querySelectorAll('.ajax-form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            
            // Simulate processing
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Show success message
                form.style.display = 'none';
                
                let successContainer = form.parentElement.querySelector('.form-success');
                if (!successContainer) {
                    successContainer = document.createElement('div');
                    successContainer.className = 'form-success fade-in visible';
                    successContainer.innerHTML = `
                        <div class="success-icon"><i class="fa-solid fa-circle-check"></i></div>
                        <h3>Request Received!</h3>
                        <p>We'll be in touch with you shortly.</p>
                    `;
                    form.parentElement.appendChild(successContainer);
                } else {
                    successContainer.style.display = 'flex';
                }
                
                // reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    });
});
