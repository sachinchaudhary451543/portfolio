document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav_toogle');
    const navList = document.querySelector('.nav_list');
    const navLinks = document.querySelectorAll('.nav_link');

    navToggle.addEventListener('click', () => {
        navList.classList.toggle('show');
        navToggle.querySelector('i').classList.toggle('fa-xmark');
        navToggle.querySelector('i').classList.toggle('fa-bars');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navList.classList.toggle('show');
                navToggle.querySelector('i').classList.toggle('fa-xmark');
                navToggle.querySelector('i').classList.toggle('fa-bars');
            }
        });
    });

    // Function to check if an element is in the viewport
    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    // Function to add animation class
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.animated');
        animatedElements.forEach(el => {
            if (isInViewport(el)) {
                const animation = el.dataset.animation || 'fadeInUp';
                el.classList.add(animation); // Add the second class (e.g., fadeInUp)
                el.style.visibility = 'visible'; // Ensure element is visible
            }
        });
    }

    // Event listeners for scroll and load
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    // Function to update the greeting based on the time of day
    function updateGreeting() {
        const hour = new Date().getHours();
        let greeting = "Hello!";
        
        if (hour < 12) greeting = "Good Morning! ☀️";
        else if (hour < 18) greeting = "Good Afternoon! 🌤";
        else greeting = "Good Evening! 🌙";

        document.getElementById("greeting-text").innerText = greeting;
    }

    // Update the greeting when the page loads
    window.onload = updateGreeting;

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Apply theme on page load
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    const images = document.querySelectorAll('.work-item img');
    const lightboxContainer = document.querySelector('.lightbox-container');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close'); // FIXED: Selecting existing close button
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentIndex = 0; // Declare currentIndex here

    // Function to show the lightbox
    const showLightbox = (index) => {
        currentIndex = index;
        lightboxImage.src = images[currentIndex].src;
        lightboxContainer.style.display = 'flex';
    };

    // Function to close the lightbox
    const closeLightbox = () => {
        lightboxContainer.style.display = 'none';
    };

    // Navigate images in lightbox
    const navigateLightbox = (direction) => {
        currentIndex = (currentIndex + direction + images.length) % images.length;
        lightboxImage.src = images[currentIndex].src;
    };

    // Click event on each image to open lightbox
    images.forEach((image, index) => {
        image.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevents the event from bubbling up
            showLightbox(index);
        });
    });

    // Close lightbox when clicking the close button
    lightboxClose.addEventListener('click', closeLightbox);

    // Navigate images with prev/next buttons
    lightboxPrev.addEventListener('click', (event) => {
        event.stopPropagation();
        navigateLightbox(-1);
    });

    lightboxNext.addEventListener('click', (event) => {
        event.stopPropagation();
        navigateLightbox(1);
    });

    // Close lightbox when clicking outside the image
    lightboxContainer.addEventListener('click', (event) => {
        if (!lightboxImage.contains(event.target)) { // FIXED: Proper detection
            closeLightbox();
        }
    });

    // Keyboard navigation (Escape to close, Left/Right to navigate)
    document.addEventListener('keydown', (e) => {
        if (lightboxContainer.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        }
    });

    // Carousel functionality
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    // Declare currentIndex here to avoid redeclaration
    currentIndex = 0;

    const updateSlidePosition = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    };

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlidePosition();
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlidePosition();
    });

    // Auto-slide effect
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlidePosition();
    }, 3000);

    const skillBars = document.querySelectorAll(".progress-bar");
    skillBars.forEach((bar) => {
        let width = bar.getAttribute("data-width");
        bar.style.setProperty('--progress-width', width);
        bar.style.width = width;
    });

    // Scroll effect for navbar
    window.addEventListener("scroll", () => {
        let navbar = document.querySelector(".nav");
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        const animatedElements = document.querySelectorAll('.animated');

        animatedElements.forEach(el => {
            if (isInViewport(el)) {
                if (st > lastScrollTop) {
                    // Scroll down
                    el.classList.remove('pop-up');
                    el.classList.add('reverse-pop');
                } else {
                    // Scroll up
                    el.classList.remove('reverse-pop');
                    el.classList.add('pop-up');
                }
            }
        });

        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    });

    // Function to reset the contact form after submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Submit the form data using Fetch API
        fetch(contactForm.action, {
            method: contactForm.method,
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Thank you for your message!');
                contactForm.reset(); // Reset the form fields
            } else {
                alert('Oops! There was a problem submitting your form.');
            }
        }).catch(error => {
            alert('Oops! There was a problem submitting your form.');
        });
    });
});
