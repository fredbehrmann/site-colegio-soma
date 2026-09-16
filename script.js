(() => {
  const pushEvent = (event, extra = {}) => {
    const payload = { event, ...extra };
    if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
    console.info('[SOMA analytics]', payload);
  };

  // Menu móvel
  const menuButton = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (menuButton && mainNav) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      mainNav.classList.toggle('is-open', !open);
    });
    mainNav.addEventListener('click', (e) => {
      if (e.target.matches('a')) {
        mainNav.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Tabs acessíveis genéricas
  const initTabs = (rootSelector) => {
    document.querySelectorAll(rootSelector).forEach((root) => {
      const tabs = [...root.querySelectorAll('[role="tab"]')];
      const panels = [...root.querySelectorAll('[role="tabpanel"]')];
      const activate = (tab) => {
        tabs.forEach((t) => {
          const active = t === tab;
          t.setAttribute('aria-selected', String(active));
          t.tabIndex = active ? 0 : -1;
        });
        panels.forEach((panel) => { panel.hidden = panel.id !== tab.getAttribute('aria-controls'); });
      };
      tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => activate(tab));
        tab.addEventListener('keydown', (e) => {
          if (!['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) return;
          e.preventDefault();
          let nextIndex = index;
          if (e.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
          if (e.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
          if (e.key === 'Home') nextIndex = 0;
          if (e.key === 'End') nextIndex = tabs.length - 1;
          tabs[nextIndex].focus(); activate(tabs[nextIndex]);
        });
      });
      if (tabs[0]) activate(tabs[0]);
    });
  };
  initTabs('[data-tabs]');
  initTabs('[data-segment-tabs]');

  // Eventos preparados para GA4/GTM
  document.querySelectorAll('[data-event]').forEach((el) => {
    el.addEventListener('click', () => pushEvent(el.dataset.event, { label: el.textContent.trim().slice(0, 80) }));
  });

  document.querySelectorAll('[data-segment-tabs] [role="tab"]').forEach((tab) => {
    tab.addEventListener('click', () => pushEvent('selecao_segmento', { segmento: tab.textContent.trim() }));
  });

  // Captura UTMs somente em memória/sessionStorage, sem dados pessoais.
  const params = new URLSearchParams(location.search);
  const utms = {};
  ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach((key) => {
    if (params.get(key)) utms[key] = params.get(key);
  });
  if (Object.keys(utms).length) sessionStorage.setItem('soma_utms', JSON.stringify(utms));

  // Protótipo de validação de formulário. Não envia dados a nenhum servidor.
  const form = document.getElementById('visit-form');
  const error = document.getElementById('form-error');
  const success = document.getElementById('form-success');
  if (form && error && success) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      pushEvent('envio_formulario');
      if (!form.checkValidity()) {
        error.hidden = false;
        form.reportValidity();
        return;
      }
      error.hidden = true;
      form.hidden = true;
      success.hidden = false;
      success.focus();
      pushEvent('formulario_sucesso', {
        segmento: form.elements.segmento.value,
        unidade: form.elements.unidade.value,
        ...JSON.parse(sessionStorage.getItem('soma_utms') || '{}')
      });
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
