const initMobileNav = () => {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  navToggle?.addEventListener('click', () => navMenu?.classList.toggle('hidden'));
  document.querySelectorAll('.mobile-nav-link').forEach(el => {
    el.addEventListener('click', () => navMenu?.classList.add('hidden'));
  });
};

const initDrawers = () => {
  let currentDrawer: HTMLElement | null = null;

  const openDrawer = (id: string) => {
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

  document.querySelectorAll<HTMLElement>('[data-drawer]').forEach(btn => {
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
  document.querySelectorAll<HTMLElement>('[data-tabs]').forEach(tabContainer => {
    tabContainer.querySelectorAll<HTMLElement>('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        if (!target) return;
        tabContainer.querySelectorAll<HTMLElement>('[data-tab]').forEach(b => b.classList.toggle('active', b === btn));
        const drawer = btn.closest('aside');
        drawer?.querySelectorAll<HTMLElement>('.tab-panel').forEach(panel => {
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
  const form = document.getElementById('contact-form') as HTMLFormElement | null;
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

const init = () => {
  initMobileNav();
  initDrawers();
  initTabs();
  initReveal();
  initHeaderBackground();
  initContactForm();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
