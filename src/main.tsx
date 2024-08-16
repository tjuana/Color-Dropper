import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import * as Sentry from '@sentry/react';

import './index.css'

Sentry.init({
  dsn: 'https://<your-sentry-dsn-url>@sentry.io/<your-project-id>',
  tracesSampleRate: 1.0,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
