import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../contexts/auth";
import {
    createEvent,
    deleteEvent,
    listEventsByMonth,
    updateEvent,
} from "../../services/eventsService";
import {
    CalendarEvent,
    CreateEventInput,
    UpdateEventInput,
} from "../../types/event";
import { isAdminIdToken } from "../../utilities/authClaims";
import { EventModal } from "./components/EventModal";
import { CalendarProps } from "./types";
import {
    buildMonthGrid,
    groupEventsByDate,
    MONTH_LABELS,
    toMonthParam,
} from "./utils";
import { CalendarView } from "./view";

type ComponentType = React.FC<CalendarProps>;

type ModalState =
    | { mode: "create"; date: string }
    | { mode: "edit"; event: CalendarEvent }
    | null;

const errorMessage = (error: unknown, fallback: string): string =>
    error instanceof Error ? error.message : fallback;

export const Calendar: ComponentType = ({ title }) => {
    const { idToken, getIdToken } = useAuth();

    const today = useMemo(() => new Date(), []);
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());

    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [reloadKey, setReloadKey] = useState(0);

    const [modal, setModal] = useState<ModalState>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [mutationError, setMutationError] = useState<string | null>(null);

    const isAdmin = useMemo(() => isAdminIdToken(idToken), [idToken]);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            setIsLoading(true);
            setError(null);
            try {
                let token: string | undefined;
                if (idToken) {
                    try {
                        token = await getIdToken();
                    } catch {
                        token = undefined;
                    }
                }
                const data = await listEventsByMonth(
                    toMonthParam(year, month),
                    token,
                );
                if (!cancelled) {
                    setEvents(data);
                }
            } catch (loadError) {
                if (!cancelled) {
                    setError(errorMessage(loadError, "Failed to load events."));
                }
            } finally {
                if (!cancelled) {
                    setIsLoading(false);
                }
            }
        })();

        return () => {
            cancelled = true;
        };
        // getIdToken is intentionally omitted: it is recreated every auth
        // render and idToken already captures the meaningful auth change.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year, month, idToken, reloadKey]);

    const goToMonth = (nextYear: number, nextMonth: number) => {
        const normalized = new Date(nextYear, nextMonth, 1);
        setYear(normalized.getFullYear());
        setMonth(normalized.getMonth());
    };

    const handlePrevMonth = () => goToMonth(year, month - 1);
    const handleNextMonth = () => goToMonth(year, month + 1);
    const handleToday = () => {
        const now = new Date();
        goToMonth(now.getFullYear(), now.getMonth());
    };

    const closeModal = () => {
        setModal(null);
        setMutationError(null);
    };

    const handleCreate = async (payload: CreateEventInput) => {
        setMutationError(null);
        setIsSaving(true);
        try {
            const token = await getIdToken();
            await createEvent(payload, token);
            setReloadKey((key) => key + 1);
            closeModal();
        } catch (createError) {
            setMutationError(
                errorMessage(createError, "Failed to create event."),
            );
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdate = async (id: string, payload: UpdateEventInput) => {
        setMutationError(null);
        setIsSaving(true);
        try {
            const token = await getIdToken();
            await updateEvent(id, payload, token);
            setReloadKey((key) => key + 1);
            closeModal();
        } catch (updateError) {
            setMutationError(
                errorMessage(updateError, "Failed to update event."),
            );
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        setMutationError(null);
        setIsDeleting(true);
        try {
            const token = await getIdToken();
            await deleteEvent(id, token);
            setReloadKey((key) => key + 1);
            closeModal();
        } catch (deleteError) {
            setMutationError(
                errorMessage(deleteError, "Failed to delete event."),
            );
        } finally {
            setIsDeleting(false);
        }
    };

    const cells = useMemo(() => buildMonthGrid(year, month), [year, month]);
    const eventsByDate = useMemo(() => groupEventsByDate(events), [events]);
    const monthLabel = `${MONTH_LABELS[month]} ${year}`;

    return (
        <>
            <CalendarView
                monthLabel={monthLabel}
                cells={cells}
                eventsByDate={eventsByDate}
                isAdmin={isAdmin}
                isLoading={isLoading}
                error={error}
                title={title}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
                onToday={handleToday}
                onAddEvent={(date) => setModal({ mode: "create", date })}
                onSelectEvent={(event) => setModal({ mode: "edit", event })}
            />

            {modal && (
                <EventModal
                    mode={modal.mode}
                    isAdmin={isAdmin}
                    initialDate={
                        modal.mode === "create" ? modal.date : undefined
                    }
                    event={modal.mode === "edit" ? modal.event : undefined}
                    isSaving={isSaving}
                    isDeleting={isDeleting}
                    error={mutationError}
                    onClose={closeModal}
                    onCreate={handleCreate}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            )}
        </>
    );
};
