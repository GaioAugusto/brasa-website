import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CalendarEvent } from "../../types/event";
import { exportMonthToPdf } from "./pdfExport";

const makeEvent = (date: string, title: string): CalendarEvent => ({
    id: `${date}-${title}`,
    date,
    title,
    createdAt: "2026-06-01T00:00:00Z",
    updatedAt: "2026-06-01T00:00:00Z",
});

describe("exportMonthToPdf", () => {
    // jsPDF's save() reaches for browser download APIs jsdom doesn't implement;
    // stub them so the test exercises the drawing pipeline, not the download.
    beforeEach(() => {
        vi.stubGlobal("URL", {
            ...URL,
            createObjectURL: vi.fn(() => "blob:mock"),
            revokeObjectURL: vi.fn(),
        });
        vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(
            () => {},
        );
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it("renders a month with overflow + long titles without throwing", () => {
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

        expect(() =>
            exportMonthToPdf({
                year: 2026,
                month: 5, // June — starts mid-week, exercises grid padding
                monthLabel: "June 2026",
                events,
            }),
        ).not.toThrow();
    });

    it("handles an empty month", () => {
        expect(() =>
            exportMonthToPdf({
                year: 2026,
                month: 0,
                monthLabel: "January 2026",
                events: [],
            }),
        ).not.toThrow();
    });
});
