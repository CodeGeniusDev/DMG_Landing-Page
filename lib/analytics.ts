
// This is a simple wrapper for the gtag function defined in index.html.
// It helps in standardizing event tracking calls across the app.

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

type GtagEvent = {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: any;
};

export const trackEvent = (action: string, params: GtagEvent) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  } else {
    console.warn('gtag function not found. Analytics event not tracked:', action, params);
  }
};
