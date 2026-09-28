export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** স্টক অনুযায়ী বার্তা */
export function stockLabel(stock: number): {
  text: string;
  tone: "in" | "low" | "out";
} {
  if (stock <= 0) return { text: "স্টকে নেই", tone: "out" };
  if (stock <= 5) return { text: "সীমিত স্টক", tone: "low" };
  return { text: "স্টকে আছে", tone: "in" };
}

/** অ্যারে থেকে ইউনিক ভ্যালু */
export function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u0980-\u09FF]+/g, "-")
    .replace(/^-|-$/g, "");
}
