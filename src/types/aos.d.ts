declare module "aos" {
  interface AOSOptions {
    duration?: number;
    delay?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?: string;
  }

  const AOS: {
    init: (options?: AOSOptions) => void;
    refresh: () => void;
  };

  export = AOS;
}
