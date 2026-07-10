import { CalendarEvent } from "../../types/event";
import { CalendarCell } from "./utils";

export interface CalendarProps {
    title?: string;
}

export interface CalendarViewProps {
    /** e.g. "July 2026". */
    monthLabel: string;
    cells: CalendarCell[];
    eventsByDate: Record<string, CalendarEvent[]>;
    isAdmin: boolean;
    isLoading: boolean;
    error: string | null;
    title?: string;
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onToday: () => void;
    /** Admin-only: download the viewed month as a PDF for styling in Canva. */
    onExport: () => void;
    onAddEvent: (dateKey: string) => void;
    onSelectEvent: (event: CalendarEvent) => void;
}
