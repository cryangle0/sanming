import { el } from '../utils/dom.js';
import { COLOR_TOKENS, TYPE_TOKENS, SHAPE_TOKENS } from '../data/tokens.js';
import { NORTH_STAR, PILLARS } from '../data/pillars.js';

export function render(view) {
  view.append(
    el('header', { class: 'page-head' }, [
      el('div', {}, [
        el('p', { class: 'eyebrow', text: '视觉系统' }),
        el('h1', { text: '支柱与令牌' })
      ])
    ]),
    el('blockquote', { class: 'north-star', text: NORTH_STAR }),
    el('section', { class: 'pillar-grid' }, PILLARS.map((pillar) =>
      el('article', { class: 'pillar-card' }, [
        el('h2', { text: pillar.title }),
        el('p', { text: pillar.copy })
      ])
    )),
    el('section', {}, [
      el('h2', { class: 'section-title', text: '色彩角色' }),
      el('div', { class: 'swatch-grid' }, COLOR_TOKENS.map((token) =>
        el('button', {
          type: 'button',
          class: 'swatch',
          style: `--swatch:${token.hex}`,
          onclick: async (event) => {
            await navigator.clipboard?.writeText(token.hex);
            const label = event.currentTarget.querySelector('small');
            if (label) label.textContent = '已复制';
          }
        }, [
          el('i', { 'aria-hidden': 'true' }),
          el('b', { text: token.name }),
          el('code', { text: token.hex }),
          el('small', { text: token.role })
        ])
      ))
    ]),
    el('section', { class: 'type-list' }, [
      el('h2', { class: 'section-title', text: '字体层级' }),
      ...TYPE_TOKENS.map((item) => el('p', { html: `<b>${item.role}</b> · ${item.stack}<br><small>${item.use}</small>` })),
      el('h2', { class: 'section-title', text: '形状语言' }),
      ...SHAPE_TOKENS.map((item) => el('p', { text: item }))
    ])
  );
}
