document.addEventListener('DOMContentLoaded', () => {

    // =========================================
    // 1. STICKY NAVBAR + ACTIVE NAV LINKS
    // =========================================

    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {

        // Navbar background on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section highlight
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');

            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });


    // =========================================
    // 2. MOBILE MENU
    // =========================================

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    if (mobileMenuBtn) {

        mobileMenuBtn.addEventListener('click', () => {

            mobileMenu.classList.toggle('active');

            const icon = mobileMenuBtn.querySelector('i');

            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }

        });

    }

    // Close mobile menu after clicking link
    mobileLinks.forEach(link => {

        link.addEventListener('click', () => {

            mobileMenu.classList.remove('active');

            const icon = mobileMenuBtn.querySelector('i');

            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');

        });

    });


    // =========================================
    // 3. SMOOTH SCROLLING
    // =========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function (e) {

            const targetId = this.getAttribute('href');

            if (targetId.length > 1) {

                e.preventDefault();

                const targetElement = document.querySelector(targetId);

                if (targetElement) {

                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });

                }

            }

        });

    });


    // =========================================
    // 4. SCROLL ANIMATIONS
    // =========================================

    const faders = document.querySelectorAll('.fade-in-up');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add('appear');

            observer.unobserve(entry.target);

        });

    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });


    // =========================================
    // 5. PORTFOLIO FILTERING
    // =========================================

    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {

        btn.addEventListener('click', () => {

            filterBtns.forEach(b => b.classList.remove('active'));

            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {

                if (
                    filterValue === 'all' ||
                    item.classList.contains(filterValue)
                ) {

                    item.style.display = 'block';

                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);

                } else {

                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';

                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);

                }

            });

        });

    });


    // =========================================
    // 6. WHATSAPP BOOKING FORM
    // =========================================

    const bookingForm = document.getElementById('bookingForm');

    if (bookingForm) {

        bookingForm.addEventListener('submit', (e) => {

            e.preventDefault();

            const name =
                document.getElementById('name').value;

            const phone =
                document.getElementById('phone').value;

            const service =
                document.getElementById('service').value;

            const date =
                document.getElementById('date').value;

            const message =
`🌸 Hello Manha Beauty Salon & Academy

I would like to book an appointment.

👤 Name: ${name}
📞 Phone: ${phone}
💄 Service: ${service}
📅 Preferred Date: ${date}

Please confirm my appointment. Thank you!`;

            const whatsappUrl =
`https://wa.me/916300950342?text=${encodeURIComponent(message)}`;

            window.open(whatsappUrl, '_blank');

            bookingForm.reset();

        });

    }


    // =========================================
    // 7. GOOGLE MAP REDIRECT
    // =========================================

    window.openMap = function () {

        window.open(
            "https://www.google.com/maps/dir/?api=1&destination=Manha+Beauty+Salon+Academy+Hyderabad",
            "_blank"
        );

    };


    // =========================================
    // 8. SOCIAL LINKS SAFETY
    // =========================================

    const socialLinks = document.querySelectorAll('.social-links a');

    socialLinks.forEach(link => {

        link.setAttribute('target', '_blank');

    });


});