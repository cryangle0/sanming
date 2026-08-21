import { ROUTES } from '../data/routes.js';
import { PLAY_SCREENS } from '../data/screens.js';
import { HEROES } from '../data/heroes.js';
import { el, qs, clear, escapeHtml } from '../utils/dom.js';

function entries() {
  return [
    ...ROUTES.map((route) => ({
      id: `route-${route.id}`,
      label: route.label,
      hint: route.hint,
      href: route.path
    })),
    ...PLAY_SCREENS.map((screen) => ({
      id: `screen-${screen.id}`,
      label: screen.label,
      hint: `打开试玩 · ${screen.desc}`,
      href: `#/play?screen=${screen.id}`
    })),
    ...HEROES.map((hero) => ({
      id: hero.id,
      label: `${hero.name} ${hero.id}`,
      hint: `${hero.element} · 资源库`,
      href: `#/gallery?hero=${hero.id}`
    }))
  ];
}

export function mountPalette(root) {
  const dialog = el('dialog', { class: 'palette', id: 'command-palette' }, [
    el('form', { method: 'dialog', class: 'palette__form' }, [
      el('input', {
        class: 'palette__input',
        type: 'search',
        name: 'q',
        placeholder: '跳到页面、界面或英雄',
        autocomplete: 'off',
        'aria-label': '快速跳转'
      }),
      el('ul', { class: 'palette__list', role: 'listbox' })
    ])
  ]);
  root.append(dialog);

  const input = qs('.palette__input', dialog);
  const list = qs('.palette__list', dialog);
  let active = 0;
  let shown = [];

  const paint = () => {
    const q = input.value.trim().toLowerCase();
    shown = entries().filter((item) =>
      !q || `${item.label} ${item.hint} ${item.id}`.toLowerCase().includes(q)
    ).slice(0, 12);
    active = 0;
    clear(list);
    shown.forEach((item, index) => {
      list.append(el('li', {
        class: `palette__item${index === 0 ? ' is-active' : ''}`,
        html: `<b>${escapeHtml(item.label)}</b><small>${escapeHtml(item.hint)}</small>`,
        onclick: () => choose(item)
      }));
    });
  };

  const choose = (item) => {
    dialog.close();
    location.hash = item.href.startsWith('#') ? item.href.slice(1) : item.href;
  };

  const open = () => {
    paint();
    if (!dialog.open) dialog.showModal();
    input.focus();
    input.select();
  };

  input.addEventListener('input', paint);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      active = Math.min(shown.length - 1, active + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      active = Math.max(0, active - 1);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (shown[active]) choose(shown[active]);
    } else return;
    qsaItems().forEach((node, index) => node.classList.toggle('is-active', index === active));
  });

  function qsaItems() {
    return [...list.children];
  }

  document.addEventListener('sanming:palette', open);
  window.addEventListener('keydown', (event) => {
    const typing = event.target.closest('input, textarea, select, [contenteditable="true"]');
    if (event.key === '/' && !event.ctrlKey && !event.metaKey && !typing) {
      event.preventDefault();
      open();
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      open();
    }
  });
}
