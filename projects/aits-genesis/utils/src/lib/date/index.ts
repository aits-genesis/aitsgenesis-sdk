/**
 * Format an ISO date string to a human-readable date.
 * @param isoDate - ISO 8601 date string
 * @param locale - BCP 47 locale (default `'en-GB'`)
 */
export function formatDate(isoDate: string | null | undefined, locale = 'en-GB'): string {
  if (!isoDate) return '--';
  const d = new Date(isoDate);
  if (isNaN(d.getTime())) return '--';
  return d.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: '2-digit' });
}

/** Format as datetime */
export function formatDateTime(isoDate: string | null | undefined, locale = 'en-GB'): string {
  if (!isoDate) return '--';
  const d = new Date(isoDate);
  if (isNaN(d.getTime())) return '--';
  return d.toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Convert a `Date` to ISO date string `YYYY-MM-DD` */
export function toIsoDateString(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Number of days between two ISO date strings */
export function daysBetween(from: string, to: string): number {
  const a = new Date(from).getTime();
  const b = new Date(to).getTime();
  return Math.round(Math.abs(b - a) / 86_400_000);
}
