document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileNav.hidden = isExpanded;
      const bar1 = menuBtn.querySelector('.menu-bar-1');
      const bar2 = menuBtn.querySelector('.menu-bar-2');
      if (bar1 && bar2) {
        if (!isExpanded) {
          bar1.classList.add('translate-y-[3.5px]', 'rotate-45');
          bar2.classList.add('-translate-y-[3.5px]', '-rotate-45');
        } else {
          bar1.classList.remove('translate-y-[3.5px]', 'rotate-45');
          bar2.classList.remove('-translate-y-[3.5px]', '-rotate-45');
        }
      }
    });
  }

  // 2. Reveal on Scroll Animation
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-in'));
  }

  // 3. Services Directory Accordion
  const serviceButtons = document.querySelectorAll('[data-service-toggle]');
  const serviceIndexButtons = document.querySelectorAll('[data-service-index]');
  
  function openService(id) {
    document.querySelectorAll('[data-service-panel]').forEach(panel => {
      const isTarget = panel.getAttribute('data-service-panel') === id;
      panel.hidden = !isTarget;
    });

    serviceButtons.forEach(btn => {
      const isTarget = btn.getAttribute('data-service-toggle') === id;
      btn.setAttribute('aria-expanded', isTarget);
      const icon = btn.querySelector('.service-expand-icon');
      if (icon) {
        if (isTarget) {
          icon.classList.add('rotate-45');
        } else {
          icon.classList.remove('rotate-45');
        }
      }
    });

    serviceIndexButtons.forEach(btn => {
      const isTarget = btn.getAttribute('data-service-index') === id;
      if (isTarget) {
        btn.classList.add('bg-secondary', 'font-medium', 'text-foreground');
        btn.classList.remove('text-muted-foreground');
      } else {
        btn.classList.remove('bg-secondary', 'font-medium', 'text-foreground');
        btn.classList.add('text-muted-foreground');
      }
    });
  }

  serviceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-service-toggle');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        // Toggle close
        const panel = document.querySelector(`[data-service-panel="${id}"]`);
        if (panel) panel.hidden = true;
        btn.setAttribute('aria-expanded', 'false');
        const icon = btn.querySelector('.service-expand-icon');
        if (icon) icon.classList.remove('rotate-45');
      } else {
        openService(id);
      }
    });
  });

  serviceIndexButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-service-index');
      openService(id);
      const section = document.getElementById(`service-${id}`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  // Handle URL hash on page load (e.g. #service-03)
  if (window.location.hash && window.location.hash.startsWith('#service-')) {
    const hashId = window.location.hash.replace('#service-', '');
    setTimeout(() => {
      openService(hashId);
      const target = document.getElementById(`service-${hashId}`);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);
  }

  // 4. Contact Form Handler
  const contactForm = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');
  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]').value.trim();
      const email = contactForm.querySelector('[name="email"]').value.trim();
      const message = contactForm.querySelector('[name="message"]').value.trim();

      let valid = true;
      if (!name) {
        showError('name', 'Please enter your name.');
        valid = false;
      } else {
        clearError('name');
      }

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        showError('email', 'Please enter a valid email address.');
        valid = false;
      } else {
        clearError('email');
      }

      if (!message || message.length < 10) {
        showError('message', 'Please add a few more details (at least 10 characters).');
        valid = false;
      } else {
        clearError('message');
      }

      if (valid) {
        const btn = contactForm.querySelector('button[type="submit"]');
        if (btn) {
          btn.disabled = true;
          btn.textContent = 'Submitting…';
        }

        setTimeout(() => {
          const refCode = 'REF-' + Math.random().toString(36).substring(2, 8).toUpperCase();
          const refSpan = document.getElementById('contact-ref-code');
          const nameSpan = document.getElementById('contact-client-name');
          if (refSpan) refSpan.textContent = refCode;
          if (nameSpan) nameSpan.textContent = name.split(' ')[0];

          contactForm.classList.add('hidden');
          contactSuccess.classList.remove('hidden');
        }, 500);
      }
    });

    const resetContactBtn = document.getElementById('reset-contact-btn');
    if (resetContactBtn) {
      resetContactBtn.addEventListener('click', () => {
        contactForm.reset();
        const btn = contactForm.querySelector('button[type="submit"]');
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Submit enquiry';
        }
        contactSuccess.classList.add('hidden');
        contactForm.classList.remove('hidden');
      });
    }
  }

  // 5. Book Call Form Handler
  const bookCallForm = document.getElementById('book-call-form');
  const bookCallSuccess = document.getElementById('book-call-success');
  if (bookCallForm && bookCallSuccess) {
    bookCallForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = bookCallForm.querySelector('[name="call-name"]').value.trim();
      const phone = bookCallForm.querySelector('[name="call-phone"]').value.trim();
      const date = bookCallForm.querySelector('[name="call-date"]').value.trim();
      const time = bookCallForm.querySelector('[name="call-time"]').value.trim();

      let valid = true;
      if (!name) {
        showError('call-name', 'Please enter your name.');
        valid = false;
      } else {
        clearError('call-name');
      }

      if (!phone || phone.length < 8) {
        showError('call-phone', 'Please enter a valid contact number.');
        valid = false;
      } else {
        clearError('call-phone');
      }

      if (!date) {
        showError('call-date', 'Please choose a preferred consultation date.');
        valid = false;
      } else {
        clearError('call-date');
      }

      if (!time) {
        showError('call-time', 'Please select a preferred time slot.');
        valid = false;
      } else {
        clearError('call-time');
      }

      if (valid) {
        const btn = bookCallForm.querySelector('button[type="submit"]');
        if (btn) {
          btn.disabled = true;
          btn.textContent = 'Booking Consultation…';
        }

        setTimeout(() => {
          const bookingRef = 'CALL-' + Math.random().toString(36).substring(2, 8).toUpperCase();
          const refEl = document.getElementById('book-call-ref');
          const summaryEl = document.getElementById('book-call-summary');
          if (refEl) refEl.textContent = bookingRef;
          if (summaryEl) {
            summaryEl.textContent = `Scheduled for ${date} during ${time}. We will call you at ${phone}.`;
          }

          bookCallForm.classList.add('hidden');
          bookCallSuccess.classList.remove('hidden');
        }, 550);
      }
    });

    const resetCallBtn = document.getElementById('reset-call-btn');
    if (resetCallBtn) {
      resetCallBtn.addEventListener('click', () => {
        bookCallForm.reset();
        const btn = bookCallForm.querySelector('button[type="submit"]');
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Confirm Call Booking';
        }
        bookCallSuccess.classList.add('hidden');
        bookCallForm.classList.remove('hidden');
      });
    }
  }

  function showError(fieldId, msg) {
    const errEl = document.getElementById(`${fieldId}-error`);
    const inputEl = document.getElementById(fieldId);
    if (errEl) {
      errEl.textContent = msg;
      errEl.classList.remove('hidden');
    }
    if (inputEl) {
      inputEl.setAttribute('aria-invalid', 'true');
      inputEl.classList.add('border-destructive');
    }
  }

  function clearError(fieldId) {
    const errEl = document.getElementById(`${fieldId}-error`);
    const inputEl = document.getElementById(fieldId);
    if (errEl) {
      errEl.textContent = '';
      errEl.classList.add('hidden');
    }
    if (inputEl) {
      inputEl.setAttribute('aria-invalid', 'false');
      inputEl.classList.remove('border-destructive');
    }
  }
});
