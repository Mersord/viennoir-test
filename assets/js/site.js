(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js');

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const language = (document.documentElement.lang || 'de').toLowerCase();
  const isEnglish = language.startsWith('en');
  const uiText = isEnglish ? {
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    formSubject: 'Enquiry via viennoir.com',
    notProvided: 'not provided',
    newsletterSubject: 'Newsletter sign-up',
    newsletterBody: 'Please add the following address to the Vien.noir newsletter:'
  } : {
    menuOpen: 'Menü öffnen',
    menuClose: 'Menü schließen',
    formSubject: 'Anfrage über viennoir.com',
    notProvided: 'nicht angegeben',
    newsletterSubject: 'Newsletter-Anmeldung',
    newsletterBody: 'Bitte nehmen Sie folgende Adresse in den Vien.noir Newsletter auf:'
  };
  const header = document.querySelector('[data-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  const setHeaderState = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  const setMenu = (open) => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? uiText.menuClose : uiText.menuOpen);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') !== 'true';
      setMenu(open);
    });

    mobileMenu.addEventListener('click', (event) => {
      if (event.target.closest('a') || event.target.matches('[data-menu-close]')) {
        setMenu(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenu(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1080) setMenu(false);
    });
  }

  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  if (revealItems.length) {
    if (reducedMotion || !('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    } else {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.13, rootMargin: '0px 0px -8% 0px' });
      revealItems.forEach((item) => observer.observe(item));
    }
  }

  // Background videos must remain muted so browsers allow autoplay.
  // Calling play() explicitly also restarts them after tab changes, page restore,
  // or browsers that do not immediately honour the autoplay attribute.
  document.querySelectorAll('[data-background-video]').forEach((video) => {
    video.muted = true;
    video.defaultMuted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;

    const startBackgroundVideo = () => {
      if (!video.paused) return;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        // Some browsers postpone autoplay until the first user interaction.
        playPromise.catch(() => {});
      }
    };

    if (video.readyState >= 2) {
      startBackgroundVideo();
    } else {
      video.addEventListener('canplay', startBackgroundVideo, { once: true });
      video.addEventListener('loadeddata', startBackgroundVideo, { once: true });
    }

    window.addEventListener('pageshow', startBackgroundVideo);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) startBackgroundVideo();
    });

    ['pointerdown', 'touchstart', 'keydown'].forEach((eventName) => {
      document.addEventListener(eventName, startBackgroundVideo, { once: true, passive: true });
    });
  });

  document.querySelectorAll('[data-hero]').forEach((hero) => {
    const slides = [...hero.querySelectorAll('[data-hero-slide]')];
    const dots = [...hero.querySelectorAll('[data-hero-dot]')];
    if (slides.length < 2) return;

    let active = 0;
    let timer = null;

    const showSlide = (index) => {
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const isActive = i === active;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === active);
        dot.setAttribute('aria-current', i === active ? 'true' : 'false');
      });
    };

    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = null;
    };

    const start = () => {
      if (reducedMotion) return;
      stop();
      timer = window.setInterval(() => showSlide(active + 1), 6400);
    };

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showSlide(i);
        start();
      });
    });

    hero.addEventListener('mouseenter', stop);
    hero.addEventListener('mouseleave', start);
    hero.addEventListener('focusin', stop);
    hero.addEventListener('focusout', start);
    showSlide(0);
    start();
  });

  document.querySelectorAll('[data-mailto-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const recipient = form.dataset.recipient || 'office@viennoir.com';
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const subject = String(data.get('subject') || uiText.formSubject).trim();
      const message = String(data.get('message') || '').trim();
      const body = [
        message,
        '',
        '—',
        `Name: ${name || uiText.notProvided}`,
        `${isEnglish ? 'Email' : 'E-Mail'}: ${email || uiText.notProvided}`
      ].join('\n');
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  });

  document.querySelectorAll('[data-newsletter-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = String(new FormData(form).get('email') || '').trim();
      const subject = uiText.newsletterSubject;
      const body = `${uiText.newsletterBody}\n\n${email}`;
      window.location.href = `mailto:office@viennoir.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  });

  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  const pointerCards = document.querySelectorAll('[data-tilt]');
  if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {
    pointerCards.forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        card.style.setProperty('--mx', `${x * 8}px`);
        card.style.setProperty('--my', `${y * 8}px`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--mx', '0px');
        card.style.setProperty('--my', '0px');
      });
    });
  }
})();
