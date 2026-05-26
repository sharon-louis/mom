/* ===================================================================
   MAMA, OUR STAR — Mother's Day 2026
   Interactions + animations 3D
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ============ PRELOADER ============ */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('is-hidden'), 1200);
  });

  /* ============ SCROLL PROGRESS ============ */
  const progress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    progress.style.transform = `scaleX(${scrolled})`;
  }, { passive: true });

  /* ============ AUDIO ============ */
  const audio = document.getElementById('bgAudio');
  const toggle = document.getElementById('audioToggle');
  let isPlaying = false;
  toggle.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      toggle.classList.remove('is-playing');
    } else {
      audio.volume = 0.3;
      audio.play().catch(() => {});
      toggle.classList.add('is-playing');
    }
    isPlaying = !isPlaying;
  });

  /* ============ SMOOTH SCROLL NAV ============ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ============ TIMELINE REVEAL (IntersectionObserver) ============ */
  const items = document.querySelectorAll('.timeline__item');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  items.forEach(i => io.observe(i));

  /* ============ CARDS FLIP ============ */
  document.querySelectorAll('.card').forEach(card => {
    const flip = () => card.classList.toggle('is-flipped');
    card.addEventListener('click', flip);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flip();
      }
    });
  });

  /* ============ TILT 3D (subtle on hover, disabled on touch) ============ */
  const isTouch = matchMedia('(hover: none)').matches;
  if (!isTouch) {
    document.querySelectorAll('[data-tilt]').forEach(el => {
      const max = 8;  // degrés max
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rx = -y * max;
        const ry = x * max;
        el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  /* ============ LIGHTBOX (POLAROIDS) ============ */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeLB = document.getElementById('lightboxClose');

  document.querySelectorAll('.polaroid').forEach(p => {
    p.addEventListener('click', () => {
      const img = p.querySelector('img');
      const cap = p.querySelector('figcaption');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = cap ? cap.textContent : '';
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
  });
  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };
  closeLB.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  /* ============ CONSTELLATION INTERACTIVE ============ */
  const stars = document.querySelectorAll('.constellation__star');
  const readout = document.getElementById('constellationReadout');
  const nameEl = readout.querySelector('.constellation__readout-name');
  const traitEl = readout.querySelector('.constellation__readout-trait');

  const showStar = (star) => {
    nameEl.textContent = star.dataset.name;
    traitEl.textContent = star.dataset.trait;
    readout.style.opacity = '0';
    setTimeout(() => { readout.style.opacity = '1'; }, 100);
  };
  stars.forEach(s => {
    s.setAttribute('tabindex', '0');
    s.addEventListener('click', () => showStar(s));
    s.addEventListener('mouseenter', () => showStar(s));
    s.addEventListener('focus', () => showStar(s));
  });

  /* ============ BOOK FLIPBOOK ============ */
  const bookFrame = document.querySelector('.book__frame');
  const pages = document.querySelectorAll('.book__page');
  const bookCurrent = document.getElementById('bookCurrent');
  const bookTotal = document.getElementById('bookTotal');
  const totalPages = pages.length;
  let currentPage = 1;

  if (bookTotal) bookTotal.textContent = totalPages;

  const goToPage = (n) => {
    if (n < 1 || n > totalPages) return;
    pages.forEach((page) => {
      const p = parseInt(page.dataset.page, 10);
      if (p < n) {
        page.classList.add('is-flipped');
        page.classList.remove('is-hidden');
        page.style.zIndex = totalPages - p;
      } else if (p === n) {
        page.classList.remove('is-flipped', 'is-hidden');
        page.style.zIndex = totalPages;
      } else {
        page.classList.remove('is-flipped');
        page.classList.add('is-hidden');
        page.style.zIndex = totalPages - p;
      }
    });
    if (bookCurrent) bookCurrent.textContent = n;
    currentPage = n;
    bookFrame.dataset.current = n;
  };

  document.querySelector('[data-action="prev"]').addEventListener('click', () => goToPage(currentPage - 1));
  document.querySelector('[data-action="next"]').addEventListener('click', () => goToPage(currentPage + 1));

  // Touch swipe on book
  let touchStartX = 0;
  bookFrame.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  bookFrame.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) goToPage(currentPage + (dx < 0 ? 1 : -1));
  });

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (document.activeElement.closest('.book')) {
      if (e.key === 'ArrowLeft') goToPage(currentPage - 1);
      if (e.key === 'ArrowRight') goToPage(currentPage + 1);
    }
  });

  goToPage(1);

  /* ============ PETALS (FINALE) ============ */
  const petalsContainer = document.getElementById('petalsContainer');
  const petalColors = ['#c45a6b', '#e89248', '#82a96f', '#e6c98a'];

  const dropPetal = () => {
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.background = petalColors[Math.floor(Math.random() * petalColors.length)];
    petal.style.setProperty('--dx', (Math.random() * 200 - 100) + 'px');
    petal.style.width = petal.style.height = (8 + Math.random() * 8) + 'px';
    petal.style.animationDuration = (5 + Math.random() * 4) + 's';
    petal.style.opacity = (0.5 + Math.random() * 0.4);
    petalsContainer.appendChild(petal);
    setTimeout(() => petal.remove(), 9000);
  };

  // Burst au scroll dans la finale + flux continu
  const finale = document.getElementById('finale');
  let petalInterval = null;
  const finaleObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        // Burst initial
        for (let i = 0; i < 15; i++) {
          setTimeout(dropPetal, i * 80);
        }
        // Flux continu
        if (!petalInterval) {
          petalInterval = setInterval(dropPetal, 700);
        }
      } else {
        if (petalInterval) {
          clearInterval(petalInterval);
          petalInterval = null;
        }
      }
    });
  }, { threshold: 0.2 });
  finaleObserver.observe(finale);

  // Burst au clic sur le cœur
  document.getElementById('heartBtn').addEventListener('click', () => {
    for (let i = 0; i < 30; i++) {
      setTimeout(dropPetal, i * 40);
    }
  });

  /* ============ GSAP SCROLL ANIMATIONS ============ */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax hero portrait
    gsap.to('.hero__portrait-wrap', {
      y: -80,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    // Section heads stagger
    gsap.utils.toArray('.section-head').forEach(head => {
      gsap.from(head.children, {
        y: 40, opacity: 0, stagger: 0.15, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: head, start: 'top 80%', once: true }
      });
    });

    // Cards stagger
    gsap.from('.card', {
      y: 60, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.messages__grid', start: 'top 75%', once: true }
    });

    // Polaroids stagger
    gsap.from('.polaroid', {
      y: 50, opacity: 0, stagger: 0.08, duration: 1, ease: 'power2.out',
      scrollTrigger: { trigger: '.gallery__board', start: 'top 75%', once: true }
    });

    // Finale title
    gsap.from('.finale__title span', {
      y: 60, opacity: 0, stagger: 0.2, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.finale', start: 'top 70%', once: true }
    });

    // Finale signatures (les vrais noms)
    gsap.from('.finale__signatures span', {
      y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: '.finale__signatures', start: 'top 85%', once: true }
    });
  }

});
