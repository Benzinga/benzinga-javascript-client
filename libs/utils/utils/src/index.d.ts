export {};

interface Environments {
  DATADOG_RUM_APPLICATION_ID: string;
  DATADOG_RUM_CLIENT_TOKEN: string;
  DATADOG_RUM_PRIVACY_LEVEL: string;
  DATADOG_RUM_SERVICE: string;
  DATADOG_RUM_SAMPLE_RATE: number;
}

declare global {
  interface Window {
    env: Environments;
    google: google;
    analytics: any;
    Intercom: any;
    requestIdleCallback: (callback: any) => any;
  }
}
