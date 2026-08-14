const OFFSET_TIMESTAMP =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?(Z|[+-](\d{2}):(\d{2}))$/;

export function requiredLivestreamDate(value: unknown, videoId: string): Date {
  if (typeof value !== "string")
    throw new Error(
      `livestream ${videoId} requires publishedAt with an offset`,
    );
  const parts = value.match(OFFSET_TIMESTAMP);
  if (!parts)
    throw new Error(
      `livestream ${videoId} requires publishedAt with an offset`,
    );

  const [
    ,
    year,
    month,
    day,
    hour,
    minute,
    second = "00",
    ,
    offsetHour,
    offsetMinute,
  ] = parts;
  const dateOnly = `${year}-${month}-${day}`;
  const calendarDate = new Date(`${dateOnly}T00:00:00Z`);
  const invalidCalendarDate =
    Number.isNaN(calendarDate.getTime()) ||
    calendarDate.toISOString().slice(0, 10) !== dateOnly;
  const invalidClock =
    Number(hour) > 23 || Number(minute) > 59 || Number(second) > 59;
  const invalidOffset =
    offsetHour !== undefined &&
    (Number(offsetHour) > 23 || Number(offsetMinute) > 59);
  const date = new Date(value);
  if (
    invalidCalendarDate ||
    invalidClock ||
    invalidOffset ||
    Number.isNaN(date.getTime())
  )
    throw new Error(`livestream ${videoId} has invalid publishedAt`);
  return date;
}
