import React, { useState } from "react";
import { EventModalProps } from "./types";
import { EventModalView } from "./view";

type ComponentType = React.FC<EventModalProps>;

export const EventModal: ComponentType = ({
    mode,
    isAdmin,
    initialDate,
    event,
    isSaving,
    isDeleting,
    error,
    onClose,
    onCreate,
    onUpdate,
    onDelete,
}) => {
    const date = event?.date ?? initialDate ?? "";
    const [title, setTitle] = useState(event?.title ?? "");
    const [caption, setCaption] = useState(event?.caption ?? "");
    const [location, setLocation] = useState(event?.location ?? "");

    const readOnly = !isAdmin;
    const canSubmit = title.trim().length > 0;

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
        formEvent,
    ) => {
        formEvent.preventDefault();
        if (readOnly || !canSubmit) {
            return;
        }

        const trimmedCaption = caption.trim();
        const trimmedLocation = location.trim();

        if (mode === "create") {
            onCreate({
                date,
                title: title.trim(),
                caption: trimmedCaption || undefined,
                location: trimmedLocation || undefined,
            });
            return;
        }

        if (event) {
            onUpdate(event.id, {
                title: title.trim(),
                caption: trimmedCaption || undefined,
                location: trimmedLocation || undefined,
            });
        }
    };

    const handleDelete = () => {
        if (event) {
            onDelete(event.id);
        }
    };

    return (
        <EventModalView
            mode={mode}
            readOnly={readOnly}
            date={date}
            title={title}
            caption={caption}
            location={location}
            canSubmit={canSubmit}
            isSaving={isSaving}
            isDeleting={isDeleting}
            error={error}
            canDelete={mode === "edit" && isAdmin}
            setTitle={setTitle}
            setCaption={setCaption}
            setLocation={setLocation}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            onClose={onClose}
        />
    );
};
