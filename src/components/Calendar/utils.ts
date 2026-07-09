import { CalendarEvent } from "../../types/event";

export interface CalendarCell {
    date: Date;
    key: string;
    dayOfMonth: number;
    inMonth: boolean;
    isToday: boolean;
}

const pad = (value: number): string => String(value).padStart(2, "0");

export const toDateKey = (date: Date): string =>
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const toMonthParam = (year: number, month: number): string =>
    `${year}-${pad(month + 1)}`;

export const MONTH_LABELS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const buildMonthGrid = (year: number, month: number): CalendarCell[] => {
    const firstOfMonth = new Date(year, month, 1);
    const gridStart = new Date(year, month, 1 - firstOfMonth.getDay());
    const todayKey = toDateKey(new Date());

    return Array.from({ length: 42 }, (_, offset) => {
        const date = new Date(
            gridStart.getFullYear(),
            gridStart.getMonth(),
            gridStart.getDate() + offset,
        );
        const key = toDateKey(date);

        return {
            date,
            key,
            dayOfMonth: date.getDate(),
            inMonth: date.getMonth() === month,
            isToday: key === todayKey,
        };
    });
};

export const groupEventsByDate = (
    events: CalendarEvent[],
): Record<string, CalendarEvent[]> =>
    events.reduce<Record<string, CalendarEvent[]>>((byDate, event) => {
        (byDate[event.date] ??= []).push(event);
        return byDate;
    }, {});
