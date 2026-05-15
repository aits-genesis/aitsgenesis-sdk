/**
 * Format a number as BDT currency (Bangladeshi Taka).
 * e.g., `1234567.5` → `৳1,23,567.50`
 */
export function formatBDT(amount: number | null | undefined): string {
  if (amount == null) return '--';
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 2,
  }).format(amount);
}

/** Generic currency formatter */
export function formatCurrency(
  amount: number | null | undefined,
  currency = 'USD',
  locale = 'en-US',
): string {
  if (amount == null) return '--';
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}

/** Format file size to human-readable string: `1.23 MB` */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1_048_576) return `${(bytes / 1024).toFixed(2)} KB`;
  if (bytes < 1_073_741_824) return `${(bytes / 1_048_576).toFixed(2)} MB`;
  return `${(bytes / 1_073_741_824).toFixed(2)} GB`;
}

/** Validate a Bangladeshi phone number */
export function isBDPhoneNumber(value: string): boolean {
  return /^(?:\+?88)?01[3-9]\d{8}$/.test(value.replace(/\s+/g, ''));
}

/** Format a BD phone number to international format: `+8801XXXXXXXXX` */
export function formatBDPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.startsWith('88')) return `+${digits}`;
  if (digits.startsWith('0')) return `+88${digits}`;
  return `+88${digits}`;
}
