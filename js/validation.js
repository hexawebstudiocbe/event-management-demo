/* validation.js */
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        // Reset errors
        document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.form-control').forEach(el => el.style.borderColor = '');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                showError(field, 'This field is required');
            } else if (field.type === 'email' && !isValidEmail(field.value)) {
                isValid = false;
                showError(field, 'Please enter a valid email');
            } else if (field.type === 'tel' && !isValidPhone(field.value)) {
                isValid = false;
                showError(field, 'Please enter a valid phone number');
            }
        });

        if (isValid) {
            // Handle success (e.g., fetch API call)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerText = 'Message Sent Successfully!';
                submitBtn.style.backgroundColor = 'var(--clr-success)';
                submitBtn.style.color = '#fff';
                
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        }
    });

    function showError(input, message) {
        input.style.borderColor = '#e74c3c';
        const errorEl = input.nextElementSibling;
        if (errorEl && errorEl.classList.contains('error-message')) {
            errorEl.innerText = message;
            errorEl.style.display = 'block';
        } else {
            const error = document.createElement('div');
            error.className = 'error-message';
            error.innerText = message;
            error.style.display = 'block';
            input.parentNode.insertBefore(error, input.nextSibling);
        }
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function isValidPhone(phone) {
        const re = /^[0-9\-\+\s\(\)]{10,15}$/;
        return re.test(String(phone));
    }
});
