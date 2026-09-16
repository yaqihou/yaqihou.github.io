(() => {
  const root = document.documentElement;
  root.classList.add('js');
  let theme = 'light';
  try {
    if (localStorage.getItem('yaqihou-theme') === 'dark') theme = 'dark';
  } catch (_) { /* Light remains usable when browser storage is unavailable. */ }
  root.dataset.theme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme === 'dark' ? '#211b28' : '#f8f7fb';
})();
