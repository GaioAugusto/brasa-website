import { describe, expect, it } from "vitest";
import { CalendarEvent } from "../../types/event";
import { buildMonthPdf } from "./pdfExport";

const makeEvent = (date: string, title: string): CalendarEvent => ({
    id: `${date}-${title}`,
    date,
    title,
    createdAt: "2026-06-01T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
});

// These exercise buildMonthPdf rather than exportMonthToPdf: outside a real
// browser jsPDF's save() falls back to writing the file with fs, which would
// litter PDFs into the repo root on every test run.
describe("buildMonthPdf", () => {
    const byteLength = (doc: ReturnType<typeof buildMonthPdf>["doc"]): number =>
        (doc.output("arraybuffer") as ArrayBuffer).byteLength;

    it("renders a month with overflow + long titles", () => {
        const events: CalendarEvent[] = [
            makeEvent("2026-06-15", "General Meeting"),
            makeEvent(
                "2026-06-15",
                "A very very very long event title that must be truncated",
            ),
            makeEvent("2026-06-15", "Second"),
            makeEvent("2026-06-15", "Third"),
            makeEvent("2026-06-15", "Fourth overflow event"),
            makeEvent("2026-06-15", "Fifth overflow event"),
            makeEvent("2026-06-30", "Month end"),
        ];

        const { doc, filename } = buildMonthPdf({
            year: 2026,
            month: 5, // June — starts mid-week, exercises grid padding
            monthLabel: "June 2026",
            events,
        });

        expect(filename).toBe("brasa-calendar-2026-06.pdf");
        expect(byteLength(doc)).toBeGreaterThan(0);
    });

    it("collapses events that do not fit into a '+N more' line", () => {
        // Far more events than any cell can show, so the overflow branch runs.
        const events = Array.from({ length: 40 }, (_, index) =>
            makeEvent("2026-06-15", `Event ${index + 1}`),
        );

        const { doc } = buildMonthPdf({
            year: 2026,
            month: 5,
            monthLabel: "June 2026",
            events,
        });

        expect(byteLength(doc)).toBeGreaterThan(0);
    });

    it("handles an empty month", () => {
        const { doc, filename } = buildMonthPdf({
            year: 2026,
            month: 0,
            monthLabel: "January 2026",
            events: [],
        });

        expect(filename).toBe("brasa-calendar-2026-01.pdf");
        expect(byteLength(doc)).toBeGreaterThan(0);
    });
});
