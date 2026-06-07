export interface Event {
  name: string;
  image: string;
  dialog?: boolean;
  image2?: string;
  description?: string;
}
export interface PastEventImage {
  src: string;
  alt: string;
}
export interface PastEventGallery {
  id: string;
  title: string;
  description: string;
  images: PastEventImage[];
}
export interface PastEventsProps {}
export interface PastEventsViewProps {
  events: PastEventGallery[];
  heroImage: PastEventImage;
}
