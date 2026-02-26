const initMobileNav = () => {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  navToggle?.addEventListener('click', () => navMenu?.classList.toggle('hidden'));
  document.querySelectorAll('.mobile-nav-link').forEach(el => {
    el.addEventListener('click', () => navMenu?.classList.add('hidden'));
  });
};

const initDrawers = () => {
  let currentDrawer = null;

  const openDrawer = (id) => {
    if (currentDrawer) currentDrawer.classList.remove('open');
    const drawer = document.getElementById(`drawer-${id}`);
    if (!drawer) return;
    drawer.classList.add('open');
    document.getElementById('backdrop')?.classList.remove('opacity-0', 'pointer-events-none');
    document.getElementById('backdrop')?.classList.add('opacity-100');
    document.body.style.overflow = 'hidden';
    currentDrawer = drawer;
  };

  const closeDrawer = () => {
    currentDrawer?.classList.remove('open');
    currentDrawer = null;
    const backdrop = document.getElementById('backdrop');
    backdrop?.classList.add('opacity-0', 'pointer-events-none');
    backdrop?.classList.remove('opacity-100');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-drawer]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.drawer;
      if (id) openDrawer(id);
    });
  });
  document.querySelectorAll('[data-close-drawer]').forEach(btn => {
    btn.addEventListener('click', closeDrawer);
  });
  document.getElementById('backdrop')?.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
};

const initTabs = () => {
  document.querySelectorAll('[data-tabs]').forEach(tabContainer => {
    tabContainer.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        if (!target) return;
        tabContainer.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle('active', b === btn));
        const drawer = btn.closest('aside');
        drawer?.querySelectorAll('.tab-panel').forEach(panel => {
          panel.classList.toggle('active', panel.id === `tab-${target}`);
        });
      });
    });
  });
};

const initReveal = () => {
  if (!('IntersectionObserver' in window)) return;
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
};

const initHeaderBackground = () => {
  const header = document.getElementById('site-header');
  if (!header) return;

  const update = () => {
    if (window.scrollY > 0) {
      header.classList.add('header-solid');
      document.getElementById('nav-logo')?.classList.add('opacity-100');
    } else {
      header.classList.remove('header-solid');
      document.getElementById('nav-logo')?.classList.remove('opacity-100');
    }
  };

  window.addEventListener('scroll', update, { passive: true });
  setTimeout(update, 0);
};

const initContactForm = () => {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('contact-status');
  if (!form || !status) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent = 'Senden...';

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('https://sidefyn-contact.divine-fog-e3e4.workers.dev/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('request_failed');
      status.textContent = 'Danke! Wir melden uns schnell bei dir.';
      form.reset();
    } catch {
      status.textContent = 'Ups, das Senden hat nicht geklappt. Bitte versuch es erneut.';
    }
  });
};

const initTyping = () => {
  const nodes = Array.from(document.querySelectorAll('[data-typing]'));
  if (nodes.length === 0) return;

  const ordered = nodes
    .map(node => ({ node, order: Number(node.getAttribute('data-typing-order') || 0) }))
    .sort((a, b) => a.order - b.order);

  const typeNode = (entry) => new Promise((resolve) => {
    const targetType = entry.node.getAttribute('data-typing-target');

    if (targetType === 'reveal') {
      setTimeout(() => {
        entry.node.style.opacity = '1';
        setTimeout(resolve, 450);
      }, 150);
      return;
    }

    const text = entry.node.getAttribute('data-text') || '';
    const caretEl = targetType === 'button'
      ? entry.node.querySelector('.typing-caret')
      : entry.node;

    if (!caretEl) {
      resolve();
      return;
    }

    caretEl.textContent = '';
    caretEl.classList.add('typing-caret');
    const speed = 35;
    let i = 0;

    const tick = () => {
      caretEl.textContent = text.slice(0, i + 1);
      i += 1;
      if (i < text.length) {
        setTimeout(tick, speed);
      } else {
        entry.node.classList.remove('typing-caret');
        caretEl.classList.remove('typing-caret');
        if (targetType === 'button') {
          entry.node.classList.remove('cta-border-pending');
          entry.node.classList.add('cta-border-ready');
          setTimeout(() => {
            entry.node.removeAttribute('disabled');
            entry.node.removeAttribute('aria-disabled');
          }, 180);
        }
        resolve();
      }
    };

    setTimeout(tick, 150);
  });

  ordered.reduce((p, entry) => p.then(() => typeNode(entry)), Promise.resolve());
};

const init = () => {
  initMobileNav();
  initDrawers();
  initTabs();
  initReveal();
  initHeaderBackground();
  initContactForm();
  initTyping();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
