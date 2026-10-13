(() => {
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

  // Envio do pedido de visita para a planilha da secretaria.
  const form = document.getElementById('visit-form');
  const error = document.getElementById('form-error');
  const success = document.getElementById('form-success');
  const submitButton = document.getElementById('visit-submit');
  const endpoint = document.querySelector('meta[name="soma-form-endpoint"]')?.content?.trim();
  if (form && error && success && submitButton) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        error.textContent = 'Revise os campos obrigatórios antes de continuar.';
        error.hidden = false;
        form.reportValidity();
        return;
      }

      if (!endpoint) {
        error.textContent = 'O envio online está temporariamente indisponível. Fale com a secretaria pelo WhatsApp.';
        error.hidden = false;
        return;
      }

      error.hidden = true;
      submitButton.disabled = true;
      submitButton.textContent = 'Enviando…';

      const data = new FormData(form);
      const payload = {
        responsavel: data.get('responsavel'),
        whatsapp: data.get('whatsapp'),
        email: data.get('email'),
        segmento: data.get('segmento'),
        unidade: data.get('unidade'),
        periodo: data.get('periodo'),
        consentimento: data.get('consentimento') === 'on',
        website: data.get('website'),
      };

      try {
        await fetch(endpoint, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        });
        form.hidden = true;
        success.hidden = false;
        success.focus();
      } catch (requestError) {
        error.textContent = 'Não foi possível enviar agora. Tente novamente ou fale com a secretaria pelo WhatsApp.';
        error.hidden = false;
        submitButton.disabled = false;
        submitButton.textContent = 'Quero agendar uma visita';
      }
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
