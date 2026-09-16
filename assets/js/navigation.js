(() => {
  const root = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const themeButton = document.querySelector('.theme-toggle');
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#site-nav');
  const meta = document.querySelector('meta[name="theme-color"]');

  function updateTheme(theme) {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    if (themeButton) {
      themeButton.setAttribute('aria-pressed', String(dark));
      themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
      themeButton.querySelector('.theme-label').textContent = dark ? 'Light' : 'Dark';
    }
    if (meta) meta.content = dark ? '#211b28' : '#f8f7fb';
    document.dispatchEvent(new Event('themechange'));
  }
  updateTheme(root.dataset.theme);
  if (themeButton) {
    themeButton.hidden = false;
    themeButton.addEventListener('click', () => {
      const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      const apply = () => {
        updateTheme(theme);
        try { localStorage.setItem('yaqihou-theme', theme); } catch (_) { /* Session still works. */ }
      };
      if (!reducedMotion.matches && document.startViewTransition) {
        themeButton.disabled = true;
        root.classList.add('theme-switching');
        const transition = document.startViewTransition(apply);
        transition.finished.catch(() => {}).finally(() => {
          themeButton.disabled = false;
          root.classList.remove('theme-switching');
        });
      } else {
        if (!reducedMotion.matches) root.classList.add('theme-changing');
        apply();
        setTimeout(() => root.classList.remove('theme-changing'), 420);
      }
    });
  }
  addEventListener('storage', (event) => {
    if (event.key === 'yaqihou-theme') updateTheme(event.newValue === 'dark' ? 'dark' : 'light');
  });

  function setMenu(open, restoreFocus = false) {
    if (!menu || !menuButton) return;
    menu.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menuButton.querySelector('span').textContent = open ? 'Close' : 'Menu';
    if (restoreFocus) menuButton.focus();
  }
  if (menuButton && menu) {
    menuButton.hidden = false;
    menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false, true);
    });
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.site-header')) setMenu(false);
    });
    matchMedia('(min-width: 721px)').addEventListener('change', (event) => { if (event.matches) setMenu(false); });
  }

  const details = [...document.querySelectorAll('main details')];
  const disclosureButton = document.querySelector('.disclosure-control');
  function updateDisclosures() {
    if (disclosureButton) disclosureButton.textContent = details.every((node) => node.open) ? 'Collapse all details' : 'Expand all details';
  }
  if (disclosureButton && details.length) {
    disclosureButton.hidden = false;
    disclosureButton.addEventListener('click', () => {
      const open = !details.every((node) => node.open);
      details.forEach((node) => { node.open = open; });
      updateDisclosures();
    });
    details.forEach((node) => node.addEventListener('toggle', updateDisclosures));
  }
  function revealHash() {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    let parent = target.parentElement;
    let opened = false;
    while (parent) {
      if (parent.tagName === 'DETAILS' && !parent.open) { parent.open = true; opened = true; }
      parent = parent.parentElement;
    }
    if (opened) requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }));
  }
  revealHash();
  addEventListener('hashchange', revealHash);
  let printState = [];
  addEventListener('beforeprint', () => { printState = details.map((node) => node.open); details.forEach((node) => { node.open = true; }); });
  addEventListener('afterprint', () => { details.forEach((node, index) => { node.open = printState[index]; }); });

  const pageTitle = document.querySelector('.page-heading h1');
  const contents = document.querySelector('.contents');
  const contentsHeading = contents?.querySelector('nav > p');
  const siteHeader = document.querySelector('.site-header');
  if (pageTitle && contentsHeading && siteHeader) {
    const label = document.createElement('span');
    label.className = 'contents-label';
    label.textContent = contentsHeading.textContent;
    const titleLink = document.createElement('a');
    titleLink.className = 'contents-page-title';
    titleLink.textContent = pageTitle.textContent;
    titleLink.href = pageTitle.id ? `#${pageTitle.id}` : '#top';
    titleLink.setAttribute('aria-label', `Back to ${pageTitle.textContent} heading`);
    contentsHeading.replaceChildren(label, titleLink);
    contentsHeading.classList.add('contents-heading');
    const wideLayout = matchMedia('(min-width: 721px)');
    let scrollFrame = 0;
    const clamp = value => Math.max(0, Math.min(1, value));
    const updateTitle = () => {
      scrollFrame = 0;
      if (!wideLayout.matches) {
        contents.style.removeProperty('--title-progress');
        pageTitle.style.removeProperty('--heading-progress');
        contents.classList.remove('has-page-title');
        titleLink.tabIndex = -1;
        titleLink.setAttribute('aria-hidden', 'true');
        label.setAttribute('aria-hidden', 'false');
        return;
      }
      // Read stable layout boxes before writing styles. No timer or threshold-based transition.
      const headerHeight = siteHeader.getBoundingClientRect().height;
      const stickyTop = parseFloat(getComputedStyle(contents).top);
      const headingBox = pageTitle.parentElement.getBoundingClientRect();
      const originalTop = headingBox.top + pageTitle.offsetTop;
      const source = clamp((headerHeight + 40 - originalTop) / (pageTitle.offsetHeight + 40));
      const remaining = contentsHeading.getBoundingClientRect().top - stickyTop;
      const approach = clamp(1 - remaining / 180);
      const progress = reducedMotion.matches ? (approach >= .5 ? 1 : 0) : approach;
      contents.style.setProperty('--title-progress', progress.toFixed(4));
      pageTitle.style.setProperty('--heading-progress', reducedMotion.matches ? 0 : source.toFixed(4));
      contents.classList.toggle('has-page-title', progress > 0);
      titleLink.tabIndex = progress >= .5 ? 0 : -1;
      titleLink.setAttribute('aria-hidden', String(progress < .5));
      label.setAttribute('aria-hidden', String(progress >= .5));
    };
    const scheduleTitle = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateTitle); };
    addEventListener('scroll', scheduleTitle, { passive: true });
    addEventListener('resize', scheduleTitle);
    addEventListener('pageshow', scheduleTitle);
    new ResizeObserver(scheduleTitle).observe(document.querySelector('main'));
    new ResizeObserver(scheduleTitle).observe(siteHeader);
    wideLayout.addEventListener('change', scheduleTitle);
    reducedMotion.addEventListener('change', scheduleTitle);
    document.fonts.ready.then(scheduleTitle);
    scheduleTitle();
  }

  const currentRoleDot = document.querySelector('.timeline-current .timeline-node');
  if (currentRoleDot) {
    let inView = false;
    const syncRipple = () => currentRoleDot.classList.toggle('is-in-view', inView && !document.hidden);
    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncRipple();
    }).observe(currentRoleDot);
    document.addEventListener('visibilitychange', syncRipple);
  }
})();
