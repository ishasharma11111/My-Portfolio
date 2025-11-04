// Basic interactions: mobile nav, animate skill fills, smooth scroll, contact demo

document.addEventListener('DOMContentLoaded', () => {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle?.addEventListener('click', () => {
    if (mainNav.style.display === 'flex') {
      mainNav.style.display = '';
    } else {
      mainNav.style.display = 'flex';
      mainNav.style.flexDirection = 'column';
      mainNav.style.gap = '10px';
      mainNav.style.position = 'absolute';
      mainNav.style.right = '18px';
      mainNav.style.top = '64px';
      mainNav.style.background = 'transparent';
      mainNav.style.zIndex = '99';
    }
  });

  // Smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Animate progress bars when .skill-scales enters viewport
  const fills = document.querySelectorAll('.progress-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fills.forEach(f => {
          const v = f.getAttribute('data-value') || '0';
          f.style.width = v + '%';
        });
      }
    });
  }, { threshold: 0.25 });
  const skillsSection = document.getElementById('skills');
  if (skillsSection) observer.observe(skillsSection);

  // Fade-in sections
  const faders = document.querySelectorAll('.section, .card, .project');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'opacity 600ms ease, transform 600ms ease';
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  faders.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(10px)';
    fadeObserver.observe(el);
  });

  // Contact form demo (client-side)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      status.textContent = 'Sending...';
      setTimeout(() => {
        status.textContent = 'Message sent — thank you! (Demo only)';
        form.reset();
      }, 900);
    });
  }

  // Download CV button (if present)
  const dl = document.getElementById('downloadCV');
  if (dl) {
    dl.addEventListener('click', () => {
      const a = document.createElement('a');
      a.href = 'resume.pdf';
      a.download = 'Isha-Sharma-Resume.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  }
});
