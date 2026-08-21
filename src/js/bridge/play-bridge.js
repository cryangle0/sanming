(function playBridge() {
  const allowed = new Set([
    'boot', 'lobby', 'select', 'loading', 'battle',
    'growth', 'profile', 'ranking', 'settings', 'account', 'store'
  ]);

  function apply(data) {
    const screen = data.screen;
    if (data.reload || data.platform) {
      const url = new URL(location.href);
      if (screen) url.searchParams.set('screen', screen);
      if (data.platform) url.searchParams.set('platform', data.platform);
      if (data.qa === false) url.searchParams.delete('qa');
      else url.searchParams.set('qa', '1');
      location.replace(url);
      return;
    }
    if (screen && allowed.has(screen) && window.SanmingStudio?.go) {
      window.SanmingStudio.go(screen);
      window.parent?.postMessage({ type: 'sanming:screen', screen }, '*');
    }
  }

  window.addEventListener('message', (event) => {
    const data = event.data;
    if (!data || typeof data !== 'object') return;
    if (data.type === 'sanming:go' || data.type === 'sanming:reload') apply(data);
  });
})();
