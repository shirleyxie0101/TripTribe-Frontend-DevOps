import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://fd54aba028a15b11d72f3c866b007d04@o4506499253731328.ingest.sentry.io/4506499843424256',

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
