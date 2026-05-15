/** Returns true if the string is a valid UUID v4 */
export function isGuid(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

/** Empty/nil UUID — used as a sentinel for "no selection" */
export const EMPTY_GUID = '00000000-0000-0000-0000-000000000000';

/** Returns true if the GUID is null, empty, or the nil UUID */
export function isEmptyGuid(value: string | null | undefined): boolean {
  return !value || value === EMPTY_GUID;
}
