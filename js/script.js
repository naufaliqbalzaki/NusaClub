document.addEventListener('DOMContentLoaded', () => {
  initFAQToggle();
  initFadeInAnimation();
  initCounterAnimation();
  initMobileNavToggle();
  initGallerySlider(); // Tambahkan fungsi untuk slider galeri
});

/* === 1. Toggle FAQ (Accordion Style) === */
function initFAQToggle() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      faqItems.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question')?.classList.remove('active');
      });

      if (!isOpen) {
        item.classList.add('open');
        question.classList.add('active');
      }
    });
  });
}

/* === 2. Animasi Fade-In Saat Scroll === */
function initFadeInAnimation() {
  const elements = document.querySelectorAll('.fade-in');

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

/* === 3. Statistik Count-Up Animation === */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.counter');

  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10) || 0;
        let current = 0;
        const step = Math.ceil(target / 100);

        const update = () => {
          current += step;
          el.textContent = current >= target ? target : current;
          if (current < target) requestAnimationFrame(update);
        };

        update();
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/* === 4. Toggle Menu Navigasi Mobile === */
function initMobileNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-links');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('show');
    toggle.classList.toggle('open'); // opsional: bisa ubah ikon jadi "X"
  });

  // Tutup menu saat klik link (untuk pengalaman mobile yang baik)
  nav.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {
      nav.classList.remove('show');
      toggle.classList.remove('open');
    })
  );

  // Opsional: klik di luar area nav akan menutup menu
  document.addEventListener('click', e => {
    const isClickInside = nav.contains(e.target) || toggle.contains(e.target);
    if (!isClickInside) {
      nav.classList.remove('show');
      toggle.classList.remove('open');
    }
  });
}

/* === 5. Galeri Foto Geser Kiri dan Kanan === */
let currentIndex = 0;

function initGallerySlider() {
  const leftButton = document.querySelector('.left-btn');
  const rightButton = document.querySelector('.right-btn');
  const slides = document.querySelectorAll('.galeri-card');
  const totalSlides = slides.length;

  leftButton?.addEventListener('click', () => moveSlide(-1, slides, totalSlides));
  rightButton?.addEventListener('click', () => moveSlide(1, slides, totalSlides));
}

function moveSlide(direction, slides, totalSlides) {
  const galeriGrid = document.querySelector('.galeri-grid');
  currentIndex = (currentIndex + direction + totalSlides) % totalSlides;

  const newTransformValue = -currentIndex * 270; // 250px for each card plus gap
  galeriGrid.style.transform = `translateX(${newTransformValue}px)`;
}
