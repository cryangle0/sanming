import { el } from '../utils/dom.js';
import { PLAY_SCREENS } from '../data/screens.js';

const GROUPS = [...new Set(PLAY_SCREENS.map((item) => item.group))];

export function render(view) {
  view.append(
    el('header', { class: 'page-head' }, [
      el('div', {}, [
        el('p', { class: 'eyebrow', text: '屏幕地图' }),
        el('h1', { text: '全部界面' })
      ])
    ])
  );

  for (const group of GROUPS) {
    view.append(
      el('section', { class: 'screen-group' }, [
        el('h2', { text: group }),
        el('div', { class: 'screen-grid' }, PLAY_SCREENS.filter((item) => item.group === group).map((item) =>
          el('a', { class: 'screen-card', href: `#/play?screen=${item.id}` }, [
            el('b', { text: item.label }),
            el('small', { text: item.id }),
            el('p', { text: item.desc })
          ])
        ))
      ])
    );
  }
}
