export {};

interface Environments {
  ADV_NEWSFEED_URL: string;
  AG_GRID_KEY: string;
  API_ROOT: string;
  CALENDAR_KEY: string;
  CONTENT_ADDR: string;
  GOOGLE_CLIENT_ID: string;
  IAM_ROOT: string;
  MIXPANEL_KEY: string;
  NCHAN_ADDR: string;
  PRO_API: string;
  QUOTE_ADDR: string;
  QUOTE_STORE_API_ROOT: string;
  SCANNER_KEY: string;
  SEGMENT_KEY: string;
  SENTRY_DSN: string;
  SERVICES_ROOT: string;
  SIGNALS_API_ROOT: string;
  SIGNALS_RESTFUL_ADDR: string;
  SIGNALS_SOCKET_ADDR: string;
  SQUAWK_ADDR: string;
  STAGING_SEGMENT_KEY: string | undefined;
  STREAM_CHAT_KEY: string;
  STRIPE_PUBLISHABLE_KEY: string;
}

declare global {
  interface Window {
    env: Environments;
    google: google;
  }
}
