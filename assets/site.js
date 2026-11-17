(function () {
  if (window.__ficor_site_initialized) return;
  window.__ficor_site_initialized = true;

  function init() {
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
    const expandAllBtn = document.getElementById('expand-all-services');
    const collapseAllBtn = document.getElementById('collapse-all-services');

    function setServiceState(id, isOpen) {
      const panel = document.querySelector(`[data-service-panel="${id}"]`);
      const btn = document.querySelector(`[data-service-toggle="${id}"]`);
      const indexBtn = document.querySelector(`[data-service-index="${id}"]`);

      if (panel) {
        panel.hidden = !isOpen;
      }

      if (btn) {
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        const icon = btn.querySelector('.service-expand-icon');
        if (icon) {
          if (isOpen) {
            icon.classList.add('rotate-45');
          } else {
            icon.classList.remove('rotate-45');
          }
        }
      }

      if (indexBtn) {
        if (isOpen) {
          indexBtn.classList.add('bg-secondary', 'font-medium', 'text-foreground');
          indexBtn.classList.remove('text-muted-foreground');
        } else {
          indexBtn.classList.remove('bg-secondary', 'font-medium', 'text-foreground');
          indexBtn.classList.add('text-muted-foreground');
        }
      }
    }

    function toggleService(id) {
      const btn = document.querySelector(`[data-service-toggle="${id}"]`);
      const isExpanded = btn ? btn.getAttribute('aria-expanded') === 'true' : false;
      setServiceState(id, !isExpanded);
    }

    function openService(id, scrollIntoView = true) {
      setServiceState(id, true);
      if (scrollIntoView) {
        const section = document.getElementById(`service-${id}`);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    }

    // Right-hand heading clicks: toggle open/close cleanly
    serviceButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-service-toggle');
        toggleService(id);
      });
    });

    // Left-hand Practice Index clicks: toggle or open and scroll into view
    serviceIndexButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-service-index');
        const panel = document.querySelector(`[data-service-panel="${id}"]`);
        const isCurrentlyOpen = panel && !panel.hidden;
        if (isCurrentlyOpen) {
          // If already open, smooth scroll to it
          const section = document.getElementById(`service-${id}`);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        } else {
          // Open it and smooth scroll to it
          openService(id, true);
        }
      });
    });

    // Expand All / Collapse All actions
    if (expandAllBtn) {
      expandAllBtn.addEventListener('click', (e) => {
        e.preventDefault();
        serviceButtons.forEach(btn => {
          const id = btn.getAttribute('data-service-toggle');
          setServiceState(id, true);
        });
      });
    }

    if (collapseAllBtn) {
      collapseAllBtn.addEventListener('click', (e) => {
        e.preventDefault();
        serviceButtons.forEach(btn => {
          const id = btn.getAttribute('data-service-toggle');
          setServiceState(id, false);
        });
      });
    }

    // Handle URL hash on page load (e.g. #service-03)
    if (window.location.hash && window.location.hash.startsWith('#service-')) {
      const hashId = window.location.hash.replace('#service-', '');
      setTimeout(() => {
        openService(hashId, true);
      }, 150);
    }

    // 4. Contact Form Handler (Direct Delivery to mail@ficoradvisors.in)
    const contactForm = document.getElementById('contact-form');
    const contactSuccess = document.getElementById('contact-success');
    if (contactForm && contactSuccess) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = (contactForm.querySelector('[name="name"]')?.value || '').trim();
        const email = (contactForm.querySelector('[name="email"]')?.value || '').trim();
        const phone = (contactForm.querySelector('[name="phone"]')?.value || '').trim();
        const topic = (contactForm.querySelector('[name="topic"]')?.value || '').trim();
        const message = (contactForm.querySelector('[name="message"]')?.value || '').trim();

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
            btn.textContent = 'Routing Enquiry to mail@ficoradvisors.in…';
          }

          const refCode = 'REF-' + Math.random().toString(36).substring(2, 8).toUpperCase();
          const targetEmail = 'mail@ficoradvisors.in';
          const mailSubject = `Enquiry: ${topic || 'Corporate Secretarial'} — ${name} [${refCode}]`;
          const mailBody = `Dear FICOR Advisors Team,

I would like to submit an enquiry via your website:

• Full Name: ${name}
• Email: ${email}
• Phone: ${phone || 'Not provided'}
• Area of Enquiry: ${topic || 'General enquiry'}
• Reference ID: ${refCode}

Message / Requirement:
${message}

---
Sent via FICOR Advisors LLP Website (https://ficoradvisors.in)`;

          const mailtoUrl = `mailto:${encodeURIComponent(targetEmail)}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

          // 1. Background cloud relay via FormSubmit API
          try {
            fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                _subject: mailSubject,
                _template: 'table',
                _captcha: 'false',
                name: name,
                email: email,
                phone: phone || 'Not provided',
                topic: topic || 'General enquiry',
                message: message,
                reference: refCode
              })
            }).catch(() => {});
          } catch (err) {}

          // 2. Open email client pre-filled
          try {
            const tempLink = document.createElement('a');
            tempLink.href = mailtoUrl;
            tempLink.click();
          } catch (err) {}

          setTimeout(() => {
            const refSpan = document.getElementById('contact-ref-code');
            const nameSpan = document.getElementById('contact-client-name');
            const mailtoBtn = document.getElementById('contact-mailto-btn');
            const whatsappBtn = document.getElementById('contact-whatsapp-btn');

            if (refSpan) refSpan.textContent = refCode;
            if (nameSpan) nameSpan.textContent = name.split(' ')[0];
            if (mailtoBtn) mailtoBtn.href = mailtoUrl;
            if (whatsappBtn) {
              const waText = `Hello FICOR Advisors, my name is ${name}. I submitted an enquiry regarding ${topic || 'Corporate Compliance'} [Ref: ${refCode}]: ${message}`;
              whatsappBtn.href = `https://wa.me/918147588559?text=${encodeURIComponent(waText)}`;
            }

            contactForm.classList.add('hidden');
            contactSuccess.classList.remove('hidden');
          }, 350);
        }
      });

      const resetContactBtn = document.getElementById('reset-contact-btn');
      if (resetContactBtn) {
        resetContactBtn.addEventListener('click', () => {
          contactForm.reset();
          const btn = contactForm.querySelector('button[type="submit"]');
          if (btn) {
            btn.disabled = false;
            btn.textContent = 'Send enquiry to mail@ficoradvisors.in';
          }
          contactSuccess.classList.add('hidden');
          contactForm.classList.remove('hidden');
        });
      }
    }

    // 5. Book Call Form Handler (Direct Delivery to mail@ficoradvisors.in)
    const bookCallForm = document.getElementById('book-call-form');
    const bookCallSuccess = document.getElementById('book-call-success');
    if (bookCallForm && bookCallSuccess) {
      bookCallForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = (bookCallForm.querySelector('[name="call-name"]')?.value || '').trim();
        const phone = (bookCallForm.querySelector('[name="call-phone"]')?.value || '').trim();
        const email = (bookCallForm.querySelector('[name="call-email"]')?.value || '').trim();
        const topic = (bookCallForm.querySelector('[name="call-topic"]')?.value || '').trim();
        const date = (bookCallForm.querySelector('[name="call-date"]')?.value || '').trim();
        const time = (bookCallForm.querySelector('[name="call-time"]')?.value || '').trim();

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

          const bookingRef = 'CALL-' + Math.random().toString(36).substring(2, 8).toUpperCase();
          const targetEmail = 'mail@ficoradvisors.in';
          const mailSubject = `Consultation Call Booking: ${name} [${bookingRef}]`;
          const mailBody = `Dear FICOR Advisors Team,

A consultation call appointment has been booked via the website:

• Full Name: ${name}
• Contact Number: ${phone}
• Work Email: ${email || 'Not provided'}
• Consultation Topic: ${topic || 'General Secretarial Advisory'}
• Preferred Date: ${date}
• Preferred Slot: ${time}
• Booking Reference: ${bookingRef}

Please confirm and connect at the scheduled time.

---
Sent via FICOR Advisors LLP Website (https://ficoradvisors.in)`;

          const mailtoUrl = `mailto:${encodeURIComponent(targetEmail)}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

          // 1. Background cloud relay via FormSubmit API
          try {
            fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                _subject: mailSubject,
                _template: 'table',
                _captcha: 'false',
                name: name,
                phone: phone,
                email: email || 'Not provided',
                topic: topic || 'General Secretarial Advisory',
                date: date,
                time: time,
                reference: bookingRef
              })
            }).catch(() => {});
          } catch (err) {}

          // 2. Open email client pre-filled
          try {
            const tempLink = document.createElement('a');
            tempLink.href = mailtoUrl;
            tempLink.click();
          } catch (err) {}

          setTimeout(() => {
            const refEl = document.getElementById('book-call-ref');
            const summaryEl = document.getElementById('book-call-summary');
            const mailtoBtn = document.getElementById('book-call-mailto-btn');
            const whatsappBtn = document.getElementById('book-call-whatsapp-btn');

            if (refEl) refEl.textContent = bookingRef;
            if (summaryEl) {
              summaryEl.textContent = `Scheduled for ${date} during ${time}. We will call you at ${phone}. Details routed to ${targetEmail}.`;
            }
            if (mailtoBtn) mailtoBtn.href = mailtoUrl;
            if (whatsappBtn) {
              const waText = `Hello FICOR Advisors, I booked a consultation call for ${date} at ${time}. Name: ${name}, Phone: ${phone} [Ref: ${bookingRef}]`;
              whatsappBtn.href = `https://wa.me/918147588559?text=${encodeURIComponent(waText)}`;
            }

            bookCallForm.classList.add('hidden');
            bookCallSuccess.classList.remove('hidden');
          }, 350);
        }
      });

      const resetCallBtn = document.getElementById('reset-call-btn');
      if (resetCallBtn) {
        resetCallBtn.addEventListener('click', () => {
          bookCallForm.reset();
          const btn = bookCallForm.querySelector('button[type="submit"]');
          if (btn) {
            btn.disabled = false;
            btn.textContent = 'Confirm Call Booking & Route to mail@ficoradvisors.in';
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
