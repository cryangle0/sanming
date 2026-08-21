import { el } from '../utils/dom.js';
import { PLAYER_FLOW, REVIEW_ORDER } from '../data/flows.js';

export function render(view) {
  view.append(
    el('header', { class: 'page-head' }, [
      el('div', {}, [
        el('p', { class: 'eyebrow', text: '玩家路径' }),
        el('h1', { text: '从开机到结算' })
      ])
    ]),
    el('ol', { class: 'flow-rail' }, PLAYER_FLOW.map((step, index) =>
      el('li', { class: 'flow-node' }, [
        el('span', { class: 'flow-node__index', text: String(index + 1).padStart(2, '0') }),
        el('div', {}, [
          el('h2', { text: step.title }),
          el('p', { text: step.copy })
        ]),
        el('a', { class: 'chip', href: `#/play?screen=${step.screen}`, text: '打开界面' })
      ])
    )),
    el('section', { class: 'review-card' }, [
      el('h2', { text: '评审顺序' }),
      el('ol', {}, REVIEW_ORDER.map((item) => el('li', { text: item })))
    ])
  );
}
