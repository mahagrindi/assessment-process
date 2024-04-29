export const AppConfig = {
  title: 'EY',
  timezone: 'Africa/Tunisia',
  language: { default: 'en-US', supported: ['en-US', 'fr-FR'] },
  theme: { default: 'light', supported: ['light', 'dark'] },
  client: {
    port: 3000,
    protocol: 'http',
    host: 'localhost',
  },
  api: {
    port: 8080,
    protocol: 'http',
    host: 'localhost',
  },
  LLM: {
    port: 9968,
    protocol: 'http',
    host: 'localhost',
  },
  robot: {
    port: 6008,
    protocol: 'http',
    host: 'localhost',
  },
}
