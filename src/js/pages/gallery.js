import { el, escapeHtml } from '../utils/dom.js';
import { HEROES, ELEMENTS } from '../data/heroes.js';

export function render(view) {
  const params = new URLSearchParams(location.hash.split('?')[1] || '');
  const wanted = params.get('hero');
  const filters = el('div', { class: 'filter-row', role: 'tablist', 'aria-label': '按五行筛选' }, [
    chip('全部', 'all', true),
    ...ELEMENTS.map((element) => chip(element, element, false))
  ]);
  const grid = el('div', { class: 'hero-grid' });
  const paint = (element) => {
    grid.replaceChildren();
    const list = HEROES.filter((hero) => element === 'all' || hero.element === element);
    for (const hero of list) {
      const card = hero.files.includes('card-v3.png') ? 'card-v3.png' : hero.files[0];
      const node = el('article', {
        class: `hero-tile${hero.id === wanted ? ' is-target' : ''}`,
        id: hero.id
      }, [
        el('img', {
          src: `./prototype/assets/entity/${hero.id}/${card}`,
          alt: `${hero.name} 卡面`,
          loading: 'lazy',
          width: '240',
          height: '320'
        }),
        el('footer', {}, [
          el('b', { text: hero.name }),
          el('small', { html: `${escapeHtml(hero.id)} · ${escapeHtml(hero.element)}` })
        ])
      ]);
      grid.append(node);
    }
  };

  view.append(
    el('header', { class: 'page-head' }, [
      el('div', {}, [
        el('p', { class: 'eyebrow', text: `${HEROES.length} 名英雄` }),
        el('h1', { text: '资源库' })
      ])
    ]),
    filters,
    grid
  );

  filters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-element]');
    if (!button) return;
    filters.querySelectorAll('.chip').forEach((node) => node.classList.toggle('is-on', node === button));
    paint(button.dataset.element);
  });

  paint('all');
  if (wanted) document.getElementById(wanted)?.scrollIntoView({ block: 'center' });
}

function chip(label, value, on) {
  return el('button', {
    type: 'button',
    class: `chip${on ? ' is-on' : ''}`,
    dataset: { element: value },
    text: label
  });
}
