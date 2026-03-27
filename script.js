// 1. Loader & Inisialisasi
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// 2. Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 3. Parallax Effect Hero
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    heroBg.style.transform = `translateY(${scroll * 0.5}px)`;
});

// 4. Scroll Reveal Animation (Intersection Observer)
const revealElements = document.querySelectorAll('[class*="reveal"]');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// 5. Counter Stats Animation
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const updateCount = () => {
                const target = +entry.target.getAttribute('data-target');
                const count = +entry.target.innerText;
                const speed = 200; 
                const inc = target / speed;

                if (count < target) {
                    entry.target.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    entry.target.innerText = target;
                }
            };
            updateCount();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 1.0 });

counters.forEach(counter => counterObserver.observe(counter));

// 6. Lightbox Gallery
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const triggers = document.querySelectorAll('.lightbox-trigger');
const closeBtn = document.querySelector('.close-lightbox');

triggers.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) lightbox.style.display = 'none';
});

// 7. Form Contact Placeholder (Simulasi)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda telah terkirim (Simulasi).');
    contactForm.reset();
});

// 8. Smooth Scroll untuk Link Internal
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// --- Fungsi Klik Menu Hamburger ---
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    // Menambah/menghapus class 'nav-active' saat diklik
    navLinks.classList.toggle('nav-active');
    
    // Opsional: Animasi ganti ikon dari garis ke silang (X)
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('nav-active')) {
        icon.classList.replace('fa-bars', 'fa-times');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
    }
});

// Tutup menu otomatis saat salah satu link diklik (untuk mobile)
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
    });
});