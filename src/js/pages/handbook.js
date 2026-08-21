import { HANDBOOK_URL } from '../config.js';
import { el, escapeHtml } from '../utils/dom.js';
import { renderMarkdown } from '../utils/markdown.js';

export async function render(view) {
  const article = el('article', { class: 'handbook' });
  view.append(
    el('header', { class: 'page-head' }, [
      el('div', {}, [
        el('p', { class: 'eyebrow', text: '真源文档' }),
        el('h1', { text: '美术总监工作手册' })
      ]),
      el('a', { class: 'chip chip--ghost', href: HANDBOOK_URL.href, target: '_blank', rel: 'noreferrer', text: '打开原文' })
    ]),
    article
  );
  article.innerHTML = '<p>正在载入手册…</p>';
  try {
    const response = await fetch(HANDBOOK_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    article.innerHTML = renderMarkdown(await response.text());
  } catch (error) {
    article.innerHTML = `<p>手册无法载入：${escapeHtml(error.message)}。请确认使用本地服务或 GitHub Pages，而不是直接打开文件。</p>`;
  }
}
