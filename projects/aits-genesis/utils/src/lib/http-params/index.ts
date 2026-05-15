/** Remove null/undefined values before building query params */
export function cleanParams(params: Record<string, unknown>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [k, v] of Object.entries(params)) {
    if (v !== null && v !== undefined && v !== '') {
      result[k] = String(v);
    }
  }
  return result;
}
