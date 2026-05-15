/**
 * Parse `nameWithCode` produced by the backend: `"{name} [{autoGenCode}]"`.
 * @returns `{ name, autoGenCode }` — autoGenCode is `undefined` if not present
 */
export function parseNameWithCode(nameWithCode: string): { name: string; autoGenCode?: string } {
  const match = nameWithCode.match(/^(.+?)\s*\[(.+)]$/);
  if (match) {
    return { name: match[1].trim(), autoGenCode: match[2].trim() };
  }
  return { name: nameWithCode.trim() };
}

/** Build a `nameWithCode` display string */
export function buildNameWithCode(name: string, autoGenCode?: string): string {
  return autoGenCode ? `${name} [${autoGenCode}]` : name;
}

/** Truncate a string to `maxLength`, appending `…` when truncated */
export function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return value.slice(0, maxLength - 1) + '…';
}

/** Convert camelCase or PascalCase to Title Case with spaces */
export function camelToTitle(value: string): string {
  return value
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

/** Slug: lowercase + spaces replaced by dashes */
export function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
