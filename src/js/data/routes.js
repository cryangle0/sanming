export const ROUTES = Object.freeze([
  { id: 'home', path: '#/home', label: '总览', hint: '工作台首页', life: 'first' },
  { id: 'play', path: '#/play', label: '试玩', hint: '完整玩家前端', life: 'first' },
  { id: 'flow', path: '#/flow', label: '流程', hint: '从开机到结算', life: 'second' },
  { id: 'screens', path: '#/screens', label: '界面', hint: '全部屏幕入口', life: 'second' },
  { id: 'gallery', path: '#/gallery', label: '资源', hint: '英雄与卡面', life: 'third' },
  { id: 'art', path: '#/art', label: '视觉', hint: '支柱与色板', life: 'third' },
  { id: 'handbook', path: '#/handbook', label: '手册', hint: '美术总监工作手册', life: 'third' }
]);

export const DEFAULT_ROUTE = 'home';

export function routeById(id) {
  return ROUTES.find((route) => route.id === id) || ROUTES[0];
}

export function routeFromHash(hash) {
  const raw = (hash || '#/home').replace(/^#\/?/, '').split('?')[0];
  const id = raw || DEFAULT_ROUTE;
  return routeById(id);
}
