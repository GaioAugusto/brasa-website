export interface Event {
  name: string;
  image: string;
  dialog?: boolean;
  image2?: string;
  description?: string;
}
export interface PastEventsProps {}
export interface PastEventsViewProps {
  events: Event[];
}
