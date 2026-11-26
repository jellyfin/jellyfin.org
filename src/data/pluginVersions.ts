const MINIMUM_JELLYFIN_MAJOR = 12;

export function targetsCurrentJellyfin(target?: string) {
  return (
    typeof target === 'string' &&
    /^\d+(?:\.\d+){0,3}$/.test(target) &&
    Number(target.split('.')[0]) >= MINIMUM_JELLYFIN_MAJOR
  );
}

export function getHttpsUrl(value?: string) {
  if (typeof value !== 'string') return undefined;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url : undefined;
  } catch {
    return undefined;
  }
}
