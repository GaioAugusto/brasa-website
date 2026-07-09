import {
    CalendarEvent,
    CreateEventInput,
    UpdateEventInput,
} from "../../../../types/event";

export type EventModalMode = "create" | "edit";

export interface EventModalProps {
    mode: EventModalMode;
    isAdmin: boolean;
    initialDate?: string;
    event?: CalendarEvent;
    isSaving: boolean;
    isDeleting: boolean;
    error: string | null;
    onClose: () => void;
    onCreate: (payload: CreateEventInput) => void;
    onUpdate: (id: string, payload: UpdateEventInput) => void;
    onDelete: (id: string) => void;
}

export interface EventModalViewProps {
    mode: EventModalMode;
    readOnly: boolean;
    date: string;
    title: string;
    caption: string;
    location: string;
    canSubmit: boolean;
    isSaving: boolean;
    isDeleting: boolean;
    error: string | null;
    canDelete: boolean;
    setTitle: (value: string) => void;
    setCaption: (value: string) => void;
    setLocation: (value: string) => void;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    onDelete: () => void;
    onClose: () => void;
}
