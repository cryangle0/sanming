import { PLAY_ENTRY } from '../config.js';
import { PLAY_SCREENS, VIEWPORTS } from '../data/screens.js';
import { loadPrefs, savePlay } from '../utils/storage.js';
import { buildPlayUrl } from '../utils/url.js';
import { el } from '../utils/dom.js';

export function createPlayFrame({ onReady } = {}) {
  const prefs = loadPrefs().play;
  const frame = el('iframe', {
    class: 'play-frame',
    title: '三命无常玩家前端',
    allow: 'autoplay'
  });

  const setSource = (next) => {
    const play = { ...loadPrefs().play, ...next };
    savePlay(play);
    frame.src = buildPlayUrl({ entry: PLAY_ENTRY, ...play }).href;
  };

  const goScreen = (screen) => {
    const needsReload = screen === 'battle' || screen === 'select' || screen === 'loading';
    if (needsReload || !frame.contentWindow) {
      setSource({ screen });
      return;
    }
    savePlay({ ...loadPrefs().play, screen });
    frame.contentWindow.postMessage({ type: 'sanming:go', screen }, '*');
  };

  window.addEventListener('message', (event) => {
    if (event.source !== frame.contentWindow) return;
    if (event.data?.type === 'sanming:ready') onReady?.(event.data);
    if (event.data?.type === 'sanming:error') onReady?.({ error: event.data.message });
  });

  frame.src = buildPlayUrl({ entry: PLAY_ENTRY, ...prefs }).href;

  const dock = el('div', { class: 'play-dock', role: 'toolbar', 'aria-label': '试玩控制' }, [
    el('div', { class: 'play-dock__screens' }, PLAY_SCREENS.map((screen) =>
      el('button', {
        type: 'button',
        class: 'chip',
        dataset: { screen: screen.id },
        text: screen.label,
        onclick: () => {
          highlight(screen.id);
          goScreen(screen.id);
        }
      })
    )),
    el('div', { class: 'play-dock__tools' }, [
      ...VIEWPORTS.map((item) => el('button', {
        type: 'button',
        class: `chip chip--ghost${prefs.platform === item.platform ? ' is-on' : ''}`,
        text: item.label,
        onclick: (event) => {
          event.currentTarget.parentElement.querySelectorAll('[data-platform]').forEach((node) => node.classList.remove('is-on'));
          event.currentTarget.classList.add('is-on');
          setSource({ platform: item.platform, screen: loadPrefs().play.screen });
        },
        dataset: { platform: item.platform }
      })),
      el('a', {
        class: 'chip chip--ghost',
        href: buildPlayUrl({ entry: PLAY_ENTRY, ...prefs }).href,
        target: '_blank',
        rel: 'noreferrer',
        text: '新标签打开',
        onclick: (event) => {
          event.currentTarget.href = buildPlayUrl({ entry: PLAY_ENTRY, ...loadPrefs().play }).href;
        }
      })
    ])
  ]);

  function highlight(id) {
    dock.querySelectorAll('[data-screen]').forEach((node) => {
      node.classList.toggle('is-on', node.dataset.screen === id);
    });
  }

  highlight(prefs.screen);
  return { frame, dock, goScreen, setSource };
}
