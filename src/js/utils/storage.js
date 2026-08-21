import { STORAGE_KEY, DEFAULT_PLAY } from '../config.js';

function read() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function write(next) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function loadPrefs() {
  const data = read();
  return {
    route: data.route || 'home',
    play: { ...DEFAULT_PLAY, ...(data.play || {}) }
  };
}

export function saveRoute(route) {
  write({ ...read(), route });
}

export function savePlay(play) {
  write({ ...read(), play: { ...DEFAULT_PLAY, ...read().play, ...play } });
}
