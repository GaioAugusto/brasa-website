import React from "react";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";
import { CalendarViewProps } from "./types";
import { WEEKDAY_LABELS } from "./utils";

type ComponentType = React.FC<CalendarViewProps>;

const MAX_VISIBLE_EVENTS = 3;

export const CalendarView: ComponentType = ({
    monthLabel,
    cells,
    eventsByDate,
    isAdmin,
    isLoading,
    error,
    title,
    onPrevMonth,
    onNextMonth,
    onToday,
    onAddEvent,
    onSelectEvent,
}) => {
    return (
        <div className="mx-auto w-full max-w-5xl rounded-xl bg-white p-4 shadow-md sm:p-6">
            {/* Header */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                    {title && (
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green-800">
                            {title}
                        </p>
                    )}
                    <h2 className="text-2xl font-bold text-green-900 sm:text-3xl">
                        {monthLabel}
                    </h2>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onToday}
                        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                    >
                        Today
                    </button>
                    <button
                        type="button"
                        onClick={onPrevMonth}
                        aria-label="Previous month"
                        className="rounded-md border border-gray-300 p-2 text-gray-700 transition hover:bg-gray-100"
                    >
                        <FaChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={onNextMonth}
                        aria-label="Next month"
                        className="rounded-md border border-gray-300 p-2 text-gray-700 transition hover:bg-gray-100"
                    >
                        <FaChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Notices */}
            {error && (
                <p
                    className="mb-3 rounded-md bg-red-50 px-4 py-2 text-sm text-red-700"
                    role="alert"
                >
                    {error}
                </p>
            )}

            {/* Weekday header */}
            <div className="grid grid-cols-7 border-b border-gray-200 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                {WEEKDAY_LABELS.map((label) => (
                    <div key={label} className="py-2">
                        <span className="hidden sm:inline">{label}</span>
                        <span className="sm:hidden">{label.charAt(0)}</span>
                    </div>
                ))}
            </div>

            {/* Day grid */}
            <div className="relative grid grid-cols-7">
                {isLoading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
                        <span className="text-sm font-medium text-gray-500">
                            Loading…
                        </span>
                    </div>
                )}

                {cells.map((cell) => {
                    const dayEvents = eventsByDate[cell.key] ?? [];
                    const visibleEvents = dayEvents.slice(0, MAX_VISIBLE_EVENTS);
                    const hiddenCount = dayEvents.length - visibleEvents.length;

                    return (
                        <div
                            key={cell.key}
                            className={`group relative min-h-[92px] border-b border-r border-gray-100 p-1.5 sm:min-h-[112px] ${
                                cell.inMonth ? "bg-white" : "bg-gray-50"
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <span
                                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                                        cell.isToday
                                            ? "bg-green-800 text-white"
                                            : cell.inMonth
                                              ? "text-gray-700"
                                              : "text-gray-400"
                                    }`}
                                >
                                    {cell.dayOfMonth}
                                </span>

                                {isAdmin && cell.inMonth && (
                                    <button
                                        type="button"
                                        onClick={() => onAddEvent(cell.key)}
                                        aria-label={`Add event on ${cell.key}`}
                                        className="text-gray-300 opacity-0 transition hover:text-green-800 focus:opacity-100 group-hover:opacity-100"
                                    >
                                        <FaPlus className="h-3.5 w-3.5" />
                                    </button>
                                )}
                            </div>

                            <div className="mt-1 space-y-1">
                                {visibleEvents.map((event) => (
                                    <button
                                        key={event.id}
                                        type="button"
                                        onClick={() => onSelectEvent(event)}
                                        title={event.title}
                                        className="block w-full truncate rounded bg-green-100 px-1.5 py-0.5 text-left text-xs font-medium text-green-900 transition hover:bg-green-200"
                                    >
                                        {event.title}
                                    </button>
                                ))}
                                {hiddenCount > 0 && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onSelectEvent(
                                                dayEvents[visibleEvents.length],
                                            )
                                        }
                                        className="px-1.5 text-xs font-medium text-gray-500 hover:text-green-800"
                                    >
                                        +{hiddenCount} more
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
