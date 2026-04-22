import type { FiscalDeadline } from "@/lib/types";

function icsDateOnly(d: string): string {
  return d.replace(/-/g, "");
}

function icsDateTimeNow(): string {
  return new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function buildIcsCalendar(
  title: string,
  events: Pick<FiscalDeadline, "date" | "title">[]
): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//My Studio MS//Demo//IT",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:" + title,
  ];
  for (const e of events) {
    const uid = e.title.replace(/\W+/g, "-") + "@" + e.date;
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${uid}`);
    lines.push(`DTSTAMP:${icsDateTimeNow()}`);
    lines.push(`DTSTART;VALUE=DATE:${icsDateOnly(e.date)}`);
    lines.push(`SUMMARY:${e.title.replace(/[,;\\]/g, " ")}`);
    lines.push("END:VEVENT");
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}
