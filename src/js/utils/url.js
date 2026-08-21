export function buildPlayUrl({ entry, screen, platform, qa }) {
  const url = new URL(entry.href);
  if (screen) url.searchParams.set('screen', screen);
  if (platform) url.searchParams.set('platform', platform);
  if (qa) url.searchParams.set('qa', '1');
  else url.searchParams.delete('qa');
  return url;
}
