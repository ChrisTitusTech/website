import site from "../data/site.json" with { type: "json" };

export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function taxonomySlug(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9_+-]/g, "")
    .replace(/^-|-$/g, "");
}

function zonedDate(instant: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(instant);
  const value = Object.fromEntries(
    parts.map((part) => [part.type, part.value]),
  );
  return `${value.year}-${value.month}-${value.day}`;
}

export function isEligibleData(
  data: { date: string; draft?: boolean },
  instant: Date,
  preview = false,
  timeZone = site.timeZone,
): boolean {
  if (preview) return true;
  if (data.draft === true) return false;
  if (/^\d{4}-\d{2}-\d{2}$/.test(data.date))
    return data.date <= zonedDate(instant, timeZone);
  return new Date(data.date).getTime() <= instant.getTime();
}

export function publicationTimeData(
  data: { date: string },
  timeZone = site.timeZone,
): number {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date))
    return new Date(data.date).getTime();
  return zonedMidnight(data.date, timeZone);
}

export function displayDateData(data: { date: string }): string {
  const date = new Date(`${data.date.slice(0, 10)}T12:00:00Z`);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function zonedMidnight(date: string, timeZone = site.timeZone): number {
  const [year, month, day] = date.split("-").map(Number);
  const desired = Date.UTC(year, month - 1, day);
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  let guess = desired;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const parts = Object.fromEntries(
      formatter
        .formatToParts(new Date(guess))
        .map((part) => [part.type, part.value]),
    );
    const represented = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour),
      Number(parts.minute),
      Number(parts.second),
    );
    const correction = desired - represented;
    guess += correction;
    if (correction === 0) return guess;
  }
  throw new Error(`Could not resolve midnight for ${date} in ${timeZone}`);
}

export function validateFeaturedOrders(
  items: Array<{ url: string; featuredOrder?: number }>,
): void {
  const used = new Map<number, string>();
  for (const item of items) {
    const order = item.featuredOrder;
    if (order === undefined) continue;
    if (!Number.isInteger(order) || order < 1 || order > 3) {
      throw new Error(`featuredOrder for ${item.url} must be 1, 2, or 3`);
    }
    const existing = used.get(order);
    if (existing)
      throw new Error(
        `featuredOrder ${order} is duplicated by ${existing} and ${item.url}`,
      );
    used.set(order, item.url);
  }
}

type HomepageItem = {
  data: { date: string; draft?: boolean; url: string; featuredOrder?: number };
};

export function selectHomepageItems<T extends HomepageItem>(
  items: T[],
  instant: Date,
  preview = false,
  timeZone = site.timeZone,
): T[] {
  validateFeaturedOrders(items.map((item) => item.data));
  const eligible = items.filter((item) =>
    isEligibleData(item.data, instant, preview, timeZone),
  );
  const slots: Array<T | undefined> = [undefined, undefined, undefined];
  const selected = new Set<string>();
  for (const item of eligible) {
    const order = item.data.featuredOrder;
    if (order !== undefined) {
      slots[order - 1] = item;
      selected.add(item.data.url);
    }
  }
  const fallback = [...eligible]
    .filter((item) => !selected.has(item.data.url))
    .sort(
      (left, right) =>
        publicationTimeData(right.data, timeZone) -
          publicationTimeData(left.data, timeZone) ||
        (left.data.url < right.data.url
          ? -1
          : left.data.url > right.data.url
            ? 1
            : 0),
    );
  for (let index = 0; index < slots.length; index += 1)
    slots[index] ??= fallback.shift();
  return slots.filter((item): item is T => item !== undefined);
}
