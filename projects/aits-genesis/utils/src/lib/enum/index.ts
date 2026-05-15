/**
 * Get the label for a numeric enum value using the enum map.
 * Useful for rendering enum values in templates.
 */
export function enumLabel<T extends Record<string, string | number>>(
  enumObj: T,
  value: number | string,
): string {
  const entry = Object.entries(enumObj).find(([, v]) => v === value);
  return entry ? entry[0] : String(value);
}

/**
 * Convert a TypeScript enum to an array of `{ value, label }` pairs.
 * Filters out reverse-mapping keys (numeric enum keys).
 */
export function enumToOptions<T extends Record<string, string | number>>(
  enumObj: T,
): { value: number; label: string }[] {
  return Object.entries(enumObj)
    .filter(([, v]) => typeof v === 'number')
    .map(([label, value]) => ({ label, value: value as number }));
}
