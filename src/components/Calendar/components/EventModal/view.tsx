import React from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import { EventModalViewProps } from "./types";

type ComponentType = React.FC<EventModalViewProps>;

const formatReadableDate = (dateKey: string): string => {
    const [year, month, day] = dateKey.split("-").map(Number);
    if (!year || !month || !day) {
        return dateKey;
    }
    return new Date(year, month - 1, day).toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

export const EventModalView: ComponentType = ({
    mode,
    readOnly,
    date,
    title,
    caption,
    location,
    canSubmit,
    isSaving,
    isDeleting,
    error,
    canDelete,
    setTitle,
    setCaption,
    setLocation,
    onSubmit,
    onDelete,
    onClose,
}) => {
    const heading =
        mode === "create"
            ? "New event"
            : readOnly
              ? "Event details"
              : "Edit event";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
                onClick={(clickEvent) => clickEvent.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-4 top-4 text-gray-500 transition hover:text-gray-800"
                >
                    <FaTimes className="h-5 w-5" />
                </button>

                <h2 className="text-2xl font-bold text-green-900">{heading}</h2>
                <p className="mt-1 text-sm text-gray-500">
                    {formatReadableDate(date)}
                </p>

                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(changeEvent) =>
                                setTitle(changeEvent.target.value)
                            }
                            readOnly={readOnly}
                            required
                            placeholder="General Meeting"
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 read-only:bg-gray-100 read-only:text-gray-600 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            Caption
                        </label>
                        <textarea
                            value={caption}
                            onChange={(changeEvent) =>
                                setCaption(changeEvent.target.value)
                            }
                            readOnly={readOnly}
                            rows={3}
                            placeholder="Optional details about the event"
                            className="mt-1 w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 read-only:bg-gray-100 read-only:text-gray-600 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            Location
                        </label>
                        <input
                            type="text"
                            value={location}
                            onChange={(changeEvent) =>
                                setLocation(changeEvent.target.value)
                            }
                            readOnly={readOnly}
                            placeholder="Room 101"
                            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 read-only:bg-gray-100 read-only:text-gray-600 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600" role="alert">
                            {error}
                        </p>
                    )}

                    {readOnly ? (
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full rounded-md bg-green-800 px-4 py-2 font-semibold text-white transition hover:bg-green-900"
                        >
                            Close
                        </button>
                    ) : (
                        <div className="flex items-center justify-between gap-3 pt-2">
                            {canDelete ? (
                                <button
                                    type="button"
                                    onClick={onDelete}
                                    disabled={isSaving || isDeleting}
                                    className="inline-flex items-center gap-2 rounded-md px-3 py-2 font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                                >
                                    <FaTrash className="h-4 w-4" />
                                    {isDeleting ? "Deleting…" : "Delete"}
                                </button>
                            ) : (
                                <span />
                            )}

                            <button
                                type="submit"
                                disabled={!canSubmit || isSaving || isDeleting}
                                className="rounded-md bg-green-800 px-5 py-2 font-semibold text-white transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isSaving
                                    ? "Saving…"
                                    : mode === "create"
                                      ? "Create event"
                                      : "Save changes"}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};
