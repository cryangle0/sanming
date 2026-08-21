import { el } from '../utils/dom.js';
import { createPlayFrame } from '../components/play-frame.js';
import { PLAY_SCREENS } from '../data/screens.js';
import { savePlay } from '../utils/storage.js';

export function render(view) {
  const params = new URLSearchParams(location.hash.split('?')[1] || '');
  const requested = params.get('screen');
  if (requested) savePlay({ screen: requested });
  const status = el('p', { class: 'play-status', text: '正在载入玩家前端…' });
  const stage = el('div', { class: 'play-stage' });
  const { frame, dock } = createPlayFrame({
    onReady: (payload) => {
      if (payload?.error) status.textContent = `载入失败：${payload.error}`;
      else status.textContent = `已就绪 · ${labelOf(payload.screen || requested || 'lobby')}`;
    }
  });

  view.append(
    el('header', { class: 'page-head' }, [
      el('div', {}, [
        el('p', { class: 'eyebrow', text: '完整玩家前端' }),
        el('h1', { text: '试玩' })
      ]),
      status
    ]),
    stage,
    dock
  );
  stage.append(frame);
}

function labelOf(id) {
  return PLAY_SCREENS.find((item) => item.id === id)?.label || id;
}
