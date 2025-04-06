 // Theme toggle functionality
        document.addEventListener('DOMContentLoaded', function() {
            const themeToggle = document.getElementById('themeToggle');
            const mobileThemeToggle = document.getElementById('mobileThemeToggle');
            const body = document.body;
            
            // Check for saved theme preference or use preferred color scheme
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                body.className = savedTheme;
                updateThemeIcon(savedTheme === 'dark-theme');
            } else {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (prefersDark) {
                    body.className = 'dark-theme';
                    updateThemeIcon(true);
                }
            }
            
            // Function to toggle theme
            function toggleTheme() {
                if (body.className === 'light-theme') {
                    body.className = 'dark-theme';
                    localStorage.setItem('theme', 'dark-theme');
                    updateThemeIcon(true);
                } else {
                    body.className = 'light-theme';
                    localStorage.setItem('theme', 'light-theme');
                    updateThemeIcon(false);
                }
            }
            
            // Update moon/sun icon
            function updateThemeIcon(isDark) {
                const icon = isDark ? '☀️' : '🌙';
                themeToggle.textContent = icon;
                mobileThemeToggle.textContent = icon;
            }
            
            // Add event listeners
            themeToggle.addEventListener('click', toggleTheme);
            mobileThemeToggle.addEventListener('click', toggleTheme);
            
            // Mobile menu functionality
            const mobileMenu = document.getElementById('mobileMenu');
            const closeMenu = document.getElementById('closeMenu');
            const mobileNav = document.getElementById('mobileNav');
            const mobileNavLinks = mobileNav.querySelectorAll('a');
            
            mobileMenu.addEventListener('click', function() {
                mobileNav.classList.add('active');
            });
            
            closeMenu.addEventListener('click', function() {
                mobileNav.classList.remove('active');
            });
            
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileNav.classList.remove('active');
                });
            });
            
            // Form submission (prevent default for demo)
            const contactForm = document.querySelector('.contact-form');
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for your message! In a real application, this would be sent to our servers.');
                contactForm.reset();
            });
            
            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
        
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
        
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });  // This was missing in your original code
        });
            
            // Testimonial slider auto-scroll
            const testimonialSlider = document.querySelector('.testimonial-slider');
            let isDown = false;
            let startX;
            let scrollLeft;

            testimonialSlider.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - testimonialSlider.offsetLeft;
                scrollLeft = testimonialSlider.scrollLeft;
            });

            testimonialSlider.addEventListener('mouseleave', () => {
                isDown = false;
            });

            testimonialSlider.addEventListener('mouseup', () => {
                isDown = false;
            });

            testimonialSlider.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - testimonialSlider.offsetLeft;
                const walk = (x - startX) * 2;
                testimonialSlider.scrollLeft = scrollLeft - walk;
            });
            
            // Add scroll event listener for header styling
            window.addEventListener('scroll', function() {
                const header = document.querySelector('header');
                if (window.scrollY > 50) {
                    header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                } else {
                    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                }
            });
            
            // Feature card animations on scroll
            const featureCards = document.querySelectorAll('.feature-card');
            
            const observerOptions = {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            featureCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                observer.observe(card);
            });
            
            // Initialize pricing card animations
            const pricingCards = document.querySelectorAll('.pricing-card');
            pricingCards.forEach(card => {
                observer.observe(card);
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });
        });