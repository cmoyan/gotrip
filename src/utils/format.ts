export function formatCurrency(value: number, options?: { prefix?: string }): string {
  const prefix = options?.prefix ?? "¥";
  return `${prefix}${value.toLocaleString("zh-CN")}`;
}

export function formatCompact(value: number): string {
  if (value >= 10000) {
    return `${(value / 10000).toFixed(value >= 100000 ? 1 : 0)}万`;
  }
  return value.toString();
}

export function joinWithDot(items: string[]): string {
  return items.join(" · ");
}
