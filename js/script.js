document.addEventListener('DOMContentLoaded', () => {
  initFAQToggle();
  initFadeInAnimation();
  initCounterAnimation();
  initMobileNavToggle();
  initTestimoniModal(); // Menambahkan fungsi testimoni modal
  initAddTestimoni();   // Menambahkan fungsi untuk menambah testimoni
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

/* === 5. Testimoni Modal === */
function initTestimoniModal() {
  const addTestimoniBtn = document.getElementById('addTestimoniBtn');
  const modal = document.getElementById('testimoniModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (!addTestimoniBtn || !modal || !closeModalBtn) return;

  // Show the modal when "Tambah Testimoni" button is clicked
  addTestimoniBtn.addEventListener('click', () => {
    modal.style.display = "block";
  });

  // Close the modal when close button is clicked
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = "none";
  });

  // Close the modal when clicking outside the modal
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

/* === 6. Add Testimoni to Section === */
function initAddTestimoni() {
  const testimoniForm = document.getElementById('testimoniForm');
  const testimoniCards = document.querySelector('.testimoni-cards');
  const stars = document.querySelectorAll('.rating .star');
  let selectedRating = 0; // variable to hold the rating value

  if (!testimoniForm || !testimoniCards) return;

  // Add click event for stars to capture the rating
  stars.forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.getAttribute('data-value'));
      stars.forEach(star => {
        star.classList.remove('active'); // remove active class from all stars
      });
      // Add active class to the clicked star and previous stars
      for (let i = 0; i < selectedRating; i++) {
        stars[i].classList.add('active');
      }
    });
  });

  // Submit the form to add new testimoni
  testimoniForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const testimoniText = document.getElementById('testimoniText').value;

    // Create a new testimoni card
    const newTestimoniCard = document.createElement('div');
    newTestimoniCard.classList.add('testimoni-card');
    
    // Rating stars to display
    let ratingStars = '';
    for (let i = 0; i < selectedRating; i++) {
      ratingStars += '★'; // full stars for rating
    }
    for (let i = selectedRating; i < 5; i++) {
      ratingStars += '☆'; // empty stars for remaining rating
    }

    newTestimoniCard.innerHTML = `
      <p class="testimoni-text">"${testimoniText}"</p>
      <p class="testimoni-author">- ${name}</p>
      <p class="testimoni-rating">Rating: ${ratingStars}</p>
    `;

    // Append the new testimoni card to the container
    testimoniCards.appendChild(newTestimoniCard);

    // Close the modal and reset the form
    document.getElementById('testimoniModal').style.display = "none";
    testimoniForm.reset();
    stars.forEach(star => star.classList.remove('active')); // Reset stars after submission
    selectedRating = 0; // Reset selected rating
  });
}
