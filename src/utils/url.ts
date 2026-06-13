// Prefix an absolute-style path (e.g. "timeline/" or "/lore/foo/") with the
// site's configured `base` from astro.config.mjs, regardless of whether
// BASE_URL ends with a trailing slash.
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL;
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${normalizedBase}${normalizedPath}`;
}
