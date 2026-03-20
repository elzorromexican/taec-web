/**
 * EmailJS client-side configuration — TAEC
 *
 * These are PUBLIC keys by design (EmailJS runs in the browser).
 * They are safe to be visible in the source.
 *
 * SECURITY HARDENING — do this in the EmailJS dashboard:
 *   Settings → Security → Allowed Origins → restrict to taec.com.mx / nuevo.taec.com.mx
 *   This prevents unauthorized domains from using your service quota.
 *
 * Centralizing here means a key rotation or service change only needs
 * one edit in one file.
 */
export const emailjsConfig = {
  publicKey: 'wiGRbwHK6dyZcHrUK',
  serviceId: 'service_v232r5x',
  templates: {
    /** General contact form — /contacto */
    contact: 'template_xjgle2w',
    /** Totara lead magnet — totara-lms-mexico */
    totara: 'template_xjgle2w', // same template for now; create a separate one if needed
  },
} as const;
