import {
    CalendarEvent,
    CreateEventInput,
    UpdateEventInput,
} from "../types/event";

const baseUrl =
    import.meta.env.VITE_EVENTS_API_BASE_URL ||
    import.meta.env.VITE_USERS_API_BASE_URL ||
    import.meta.env.REACT_APP_USERS_API_BASE_URL ||
    "http://localhost:8080";

async function failWith(response: Response, fallback: string): Promise<never> {
    const errorBody = await response.json().catch(() => null);
    const message = errorBody?.message || errorBody?.error || fallback;
    throw new Error(message);
}

export const listEventsByMonth = async (
    month: string,
    token?: string | null,
): Promise<CalendarEvent[]> => {
    const response = await fetch(
        `${baseUrl}/events?month=${encodeURIComponent(month)}`,
        {
            method: "GET",
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
    );

    if (!response.ok) {
        return failWith(response, "Failed to load events.");
    }

    return response.json();
};

export const createEvent = async (
    payload: CreateEventInput,
    token: string,
): Promise<{ id: string }> => {
    const response = await fetch(`${baseUrl}/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        return failWith(response, "Failed to create event.");
    }

    return response.json();
};

export const updateEvent = async (
    id: string,
    payload: UpdateEventInput,
    token: string,
): Promise<CalendarEvent> => {
    const response = await fetch(
        `${baseUrl}/events/${encodeURIComponent(id)}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        },
    );

    if (!response.ok) {
        return failWith(response, "Failed to update event.");
    }

    return response.json();
};

export const deleteEvent = async (id: string, token: string): Promise<void> => {
    const response = await fetch(
        `${baseUrl}/events/${encodeURIComponent(id)}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    if (!response.ok) {
        await failWith(response, "Failed to delete event.");
    }
};
