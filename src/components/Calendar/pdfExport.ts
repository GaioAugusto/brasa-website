import { jsPDF } from "jspdf";
import { CalendarEvent } from "../../types/event";
import {
    buildMonthGrid,
    groupEventsByDate,
    toMonthParam,
    WEEKDAY_LABELS,
} from "./utils";

export interface ExportMonthOptions {
    year: number;
    /** 0-based month. */
    month: number;
    /** e.g. "July 2026". */
    monthLabel: string;
    events: CalendarEvent[];
}

const MARGIN = 36;
const HEADER_HEIGHT = 24;
const CELL_PADDING = 6;
const DAY_NUMBER_SIZE = 11;
const EVENT_SIZE = 8;
const EVENT_LINE_HEIGHT = 11;

/** Trims text with an ellipsis so it fits within maxWidth at the current font. */
const fitText = (doc: jsPDF, text: string, maxWidth: number): string => {
    if (doc.getTextWidth(text) <= maxWidth) {
        return text;
    }
    let trimmed = text;
    while (trimmed.length > 1 && doc.getTextWidth(`${trimmed}…`) > maxWidth) {
        trimmed = trimmed.slice(0, -1);
    }
    return `${trimmed}…`;
};

/**
 * Renders one month as a landscape, vector PDF (real text + lines, built-in
 * Helvetica), which Canva imports as editable text/shape layers so an admin can
 * restyle it. Triggers a browser download.
 */
export const exportMonthToPdf = ({
    year,
    month,
    monthLabel,
    events,
}: ExportMonthOptions): void => {
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Title.
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(20, 83, 45); // green-900-ish
    doc.text(monthLabel, MARGIN, MARGIN + 16);

    // Grid geometry — trim to only the weeks this month actually spans.
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const weeks = Math.ceil((firstWeekday + daysInMonth) / 7);

    const gridTop = MARGIN + 36;
    const gridLeft = MARGIN;
    const gridWidth = pageWidth - MARGIN * 2;
    const colWidth = gridWidth / 7;
    const gridBottom = pageHeight - MARGIN;
    const rowHeight = (gridBottom - gridTop - HEADER_HEIGHT) / weeks;
    const gridHeight = HEADER_HEIGHT + rowHeight * weeks;

    // Weekday header labels.
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(90, 90, 90);
    WEEKDAY_LABELS.forEach((label, column) => {
        const centerX = gridLeft + column * colWidth + colWidth / 2;
        doc.text(label.toUpperCase(), centerX, gridTop + HEADER_HEIGHT / 2 + 3, {
            align: "center",
        });
    });

    // Grid lines.
    doc.setDrawColor(210, 210, 210);
    doc.setLineWidth(0.5);
    for (let column = 0; column <= 7; column += 1) {
        const x = gridLeft + column * colWidth;
        doc.line(x, gridTop, x, gridTop + gridHeight);
    }
    doc.line(gridLeft, gridTop, gridLeft + gridWidth, gridTop);
    doc.line(
        gridLeft,
        gridTop + HEADER_HEIGHT,
        gridLeft + gridWidth,
        gridTop + HEADER_HEIGHT,
    );
    for (let row = 1; row <= weeks; row += 1) {
        const y = gridTop + HEADER_HEIGHT + row * rowHeight;
        doc.line(gridLeft, y, gridLeft + gridWidth, y);
    }

    // Day cells.
    const cells = buildMonthGrid(year, month).slice(0, weeks * 7);
    const eventsByDate = groupEventsByDate(events);
    const maxEventLines = Math.max(
        0,
        Math.floor((rowHeight - 24) / EVENT_LINE_HEIGHT),
    );

    cells.forEach((cell, index) => {
        const column = index % 7;
        const row = Math.floor(index / 7);
        const cellX = gridLeft + column * colWidth;
        const cellY = gridTop + HEADER_HEIGHT + row * rowHeight;

        // Day number.
        doc.setFont("helvetica", "normal");
        doc.setFontSize(DAY_NUMBER_SIZE);
        if (cell.inMonth) {
            doc.setTextColor(40, 40, 40);
        } else {
            doc.setTextColor(190, 190, 190);
        }
        doc.text(String(cell.dayOfMonth), cellX + CELL_PADDING, cellY + 14);

        // Events (only in-month cells have any).
        const dayEvents = eventsByDate[cell.key] ?? [];
        if (dayEvents.length === 0 || maxEventLines === 0) {
            return;
        }

        doc.setFontSize(EVENT_SIZE);
        doc.setTextColor(20, 83, 45);

        const showAll = dayEvents.length <= maxEventLines;
        const visibleCount = showAll ? dayEvents.length : maxEventLines - 1;
        const textMaxWidth = colWidth - CELL_PADDING * 2 - 6;
        let lineY = cellY + 26;

        for (let i = 0; i < visibleCount; i += 1) {
            const label = fitText(doc, `• ${dayEvents[i].title}`, textMaxWidth);
            doc.text(label, cellX + CELL_PADDING, lineY);
            lineY += EVENT_LINE_HEIGHT;
        }

        if (!showAll) {
            doc.setTextColor(120, 120, 120);
            doc.text(
                `+${dayEvents.length - visibleCount} more`,
                cellX + CELL_PADDING,
                lineY,
            );
        }
    });

    doc.save(`brasa-calendar-${toMonthParam(year, month)}.pdf`);
};
