const ATX = /^(#{1,3})\s+(.*)$/;

export function renderMarkdown(source) {
  const lines = String(source).replace(/\r\n/g, '\n').split('\n');
  const html = [];
  let inList = false;
  let inCode = false;
  let code = [];

  const closeList = () => {
    if (inList) {
      html.push('</ul>');
      inList = false;
    }
  };

  for (const raw of lines) {
    if (raw.startsWith('```')) {
      if (inCode) {
        html.push(`<pre><code>${escape(code.join('\n'))}</code></pre>`);
        code = [];
        inCode = false;
      } else {
        closeList();
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      code.push(raw);
      continue;
    }
    if (!raw.trim()) {
      closeList();
      continue;
    }
    if (raw.startsWith('> ')) {
      closeList();
      html.push(`<blockquote>${inline(raw.slice(2))}</blockquote>`);
      continue;
    }
    if (raw.startsWith('- ')) {
      if (!inList) {
        html.push('<ul>');
        inList = true;
      }
      html.push(`<li>${inline(raw.slice(2))}</li>`);
      continue;
    }
    const heading = raw.match(ATX);
    if (heading) {
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }
    closeList();
    html.push(`<p>${inline(raw)}</p>`);
  }
  closeList();
  return html.join('\n');
}

function inline(text) {
  return escape(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function escape(value) {
  return String(value).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}
