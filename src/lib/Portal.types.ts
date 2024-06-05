import type { Readable } from 'svelte/store';

export type PortalContext = {
  /** The portal host for usePortal */
  portalHost: Readable<HTMLElement | undefined>;
};
