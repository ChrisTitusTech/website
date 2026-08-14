export function isActiveWaiver(waiver, today) {
  if (!waiver || typeof waiver !== "object") return false;
  for (const field of ["scope", "owner", "rationale", "followUp"]) {
    if (typeof waiver[field] !== "string" || waiver[field].trim() === "") {
      return false;
    }
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(waiver.expires ?? "")) return false;
  const parsed = new Date(`${waiver.expires}T00:00:00Z`);
  if (
    Number.isNaN(parsed.valueOf()) ||
    parsed.toISOString().slice(0, 10) !== waiver.expires
  ) {
    return false;
  }
  return waiver.expires >= today;
}
