import { el } from '../utils/dom.js';
import { HEROES } from '../data/heroes.js';
import { NORTH_STAR } from '../data/pillars.js';

const featured = HEROES.find((hero) => hero.id === 'H009') || HEROES[0];

export function render(view) {
  view.append(
    el('section', { class: 'hero-stage' }, [
      el('div', { class: 'hero-stage__mist', 'aria-hidden': 'true' }),
      el('img', {
        class: 'hero-stage__portrait',
        src: `./prototype/assets/entity/${featured.id}/foreground-v2.png`,
        alt: featured.name,
        width: '640',
        height: '800'
      }),
      el('div', { class: 'hero-stage__copy' }, [
        el('p', { class: 'eyebrow', text: '设计评审入口 · V1 最小交付初始化' }),
        el('h1', { text: '三命无常' }),
        el('p', { class: 'lede', text: NORTH_STAR }),
        el('div', { class: 'fate-threads', 'aria-hidden': 'true' }, [
          el('i', { class: 'fate fate--first' }),
          el('i', { class: 'fate fate--second' }),
          el('i', { class: 'fate fate--third' })
        ]),
        el('div', { class: 'cta-row' }, [
          el('a', { class: 'cta cta--primary', href: '#/play', text: '进入试玩' }),
          el('a', { class: 'cta cta--ghost', href: '#/handbook', text: '打开美术手册' })
        ]),
        el('p', { class: 'fine', text: '本地请用 npm start。GitHub Pages 打开即可评审，无需构建。' })
      ])
    ]),
    el('section', { class: 'home-grid' }, [
      card('#/flow', '流程画板', '从开机到百眼迷城的玩家路径，点节点直接进对应界面。'),
      card('#/screens', '界面清单', '大厅、三选一、战斗 HUD、成长、设置——按设计验收顺序打开。'),
      card('#/gallery', '英雄与资源', `${HEROES.length} 名英雄卡面与头像，按五行筛选。`),
      card('#/art', '视觉令牌', '青玉、暖金、初命/续命/绝命。先对色板，再评像素。')
    ])
  );
}

function card(href, title, copy) {
  return el('a', { class: 'launch-card', href }, [
    el('h2', { text: title }),
    el('p', { text: copy })
  ]);
}
