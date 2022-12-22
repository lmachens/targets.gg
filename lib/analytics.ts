import type { EventOptions, PlausibleOptions } from 'plausible-tracker';
import Plausible from 'plausible-tracker';

let plausible: ReturnType<typeof Plausible> | null = null;
export const initPlausible = () => {
  if (
    typeof process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN === 'string' &&
    typeof process.env.NEXT_PUBLIC_PLAUSIBLE_API_HOST === 'string' &&
    !plausible
  ) {
    plausible = Plausible({
      domain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
      apiHost: process.env.NEXT_PUBLIC_PLAUSIBLE_API_HOST,
      trackLocalhost: true,
    });
    plausible.enableAutoPageviews();
  }
};

export const trackEvent = (
  eventName: string,
  options?: EventOptions | undefined,
  eventData?: PlausibleOptions | undefined
) => {
  if (plausible) {
    plausible.trackEvent(eventName, options, eventData);
  }
};

export const trackOutboundLinkClick = (url: string) => {
  trackEvent('Outbound Link: Click', { props: { url: url } });
};
