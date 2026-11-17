const MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

/** "2026-05" → "mai 2026"; "2026-11-16" → "16 nov 2026"; "2025" → "2025" */
export function formatDate(value: string): string {
  const [y, m, d] = value.split("-");
  if (!m) return y;
  const month = MONTHS[Number(m) - 1] ?? m;
  return d ? `${Number(d)} ${month} ${y}` : `${month} ${y}`;
}

export function formatPeriod(start: string, end?: string, label?: string): string {
  if (label) return label;
  return `${formatDate(start)} — ${end ? formatDate(end) : "atual"}`;
}
