export interface CalendarEvent {
    readonly id: string;
    readonly date: string;
    readonly title: string;
    readonly caption?: string;
    readonly location?: string;
    readonly createdAt: string;
    readonly updatedAt: string;
}

export interface CreateEventInput {
    date: string;
    title: string;
    caption?: string;
    location?: string;
}

export type UpdateEventInput = Partial<
    Pick<CreateEventInput, "title" | "caption" | "location">
>;
