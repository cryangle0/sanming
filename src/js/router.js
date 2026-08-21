import { ROUTES, routeFromHash } from './data/routes.js';
import { saveRoute } from './utils/storage.js';
import { clear, qs } from './utils/dom.js';

const pages = {
  home: () => import('./pages/home.js'),
  play: () => import('./pages/play.js'),
  flow: () => import('./pages/flow.js'),
  screens: () => import('./pages/screens.js'),
  gallery: () => import('./pages/gallery.js'),
  art: () => import('./pages/art.js'),
  handbook: () => import('./pages/handbook.js')
};

let currentId = '';
let seq = 0;

export async function renderRoute(hash) {
  const route = routeFromHash(hash);
  const view = qs('#view');
  const token = ++seq;
  currentId = route.id;
  document.body.dataset.route = route.id;
  qsaNav(route.id);
  saveRoute(route.id);
  view.setAttribute('aria-busy', 'true');
  const mod = await pages[route.id]();
  if (token !== seq) return;
  clear(view);
  await mod.render(view);
  view.setAttribute('aria-busy', 'false');
  view.focus({ preventScroll: true });
}

function qsaNav(id) {
  for (const link of document.querySelectorAll('[data-nav]')) {
    const active = link.dataset.nav === id;
    link.classList.toggle('is-active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
}

export function startRouter() {
  const onChange = () => renderRoute(location.hash);
  window.addEventListener('hashchange', onChange);
  if (!location.hash) location.replace(ROUTES[0].path);
  else onChange();
}

export function go(id) {
  const route = ROUTES.find((item) => item.id === id);
  if (route) location.hash = route.path.slice(1);
}

export function currentRoute() {
  return currentId;
}
