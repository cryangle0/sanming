import { APP_NAME, APP_SUBTITLE } from '../config.js';
import { ROUTES } from '../data/routes.js';
import { el, qs } from '../utils/dom.js';
import { mountPalette } from './command-palette.js';

export function mountShell(root) {
  const nav = el('nav', { class: 'life-nav', 'aria-label': '工作台栏目' }, ROUTES.map((route) =>
    el('a', {
      class: `life-nav__item life-${route.life}`,
      href: route.path,
      dataset: { nav: route.id },
      title: route.hint
    }, [
      el('i', { 'aria-hidden': 'true' }),
      el('b', { text: route.label }),
      el('small', { text: route.hint })
    ])
  ));

  root.append(
    el('a', { class: 'skip-link', href: '#view', text: '跳到内容' }),
    el('aside', { class: 'life-rail' }, [
      el('a', { class: 'brand', href: '#/home' }, [
        el('span', { class: 'brand__seal', 'aria-hidden': 'true', text: '命' }),
        el('span', { class: 'brand__copy' }, [
          el('strong', { text: APP_NAME }),
          el('small', { text: APP_SUBTITLE })
        ])
      ]),
      nav,
      el('div', { class: 'life-rail__tools' }, [
        el('button', {
          class: 'ghost-btn',
          type: 'button',
          'aria-label': '打开快速跳转',
          text: '跳转',
          onclick: () => document.dispatchEvent(new CustomEvent('sanming:palette'))
        }),
        el('p', { class: 'life-rail__hint', text: '/ 或 Ctrl+K' })
      ])
    ]),
    el('main', { id: 'view', class: 'view', tabindex: '-1' })
  );

  mountPalette(qs('body'));
}
