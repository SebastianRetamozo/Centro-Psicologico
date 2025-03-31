// Set min date for appointment to today
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
    
    const form = document.getElementById('appointmentForm');
    
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        // Check form validity
        if (!form.checkValidity()) {
            event.stopPropagation();
            
            // Trigger validation classes for each input field
            Array.from(form.elements).forEach(input => {
                if (input.checkValidity() === false) {
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                }
                
                input.addEventListener('input', function() {
                    if (this.checkValidity()) {
                        this.classList.remove('is-invalid');
                        this.classList.add('is-valid');
                    } else {
                        this.classList.remove('is-valid');
                        this.classList.add('is-invalid');
                    }
                });
            });
        } else {
            // Build data payload for ApptSchedAPI Loop
            const payload = {
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                patientName: document.getElementById('name').value,
                contact: document.getElementById('email').value,
                service: document.getElementById('service').value
            };
            
            try {
                // Call the ApptSchedAPI Magic Loop
                const response = await fetch('https://magicloops.dev/api/loop/9027eb89-ac33-4ab3-9b7f-f88354d40437/run', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                
                // The API responds with no output as expected.
                // Show success modal
                const successModal = new bootstrap.Modal(document.getElementById('successModal'));
                successModal.show();
                
                // Reset form and remove validation classes
                form.reset();
                Array.from(form.elements).forEach(input => {
                    input.classList.remove('is-valid');
                });
            } catch (error) {
                console.error('Error scheduling appointment:', error);
                // Optionally handle errors (e.g., show an error message)
            }
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
    
    // Reveal animations on scroll
    window.addEventListener('scroll', reveal);
    
    function reveal() {
        var reveals = document.querySelectorAll('.reveal');
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var revealTop = reveals[i].getBoundingClientRect().top;
            var revealPoint = 150;
            if (revealTop < windowHeight - revealPoint) {
                reveals[i].classList.add('active');
            }
        }
    }
    // Initial reveal check
    reveal();
});
