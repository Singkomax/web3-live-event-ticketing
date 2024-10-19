import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider domain='dev-arf03mfw5s0bw6fn.us.auth0.com' clientId=''>
      <App />
    </Auth0Provider>
  </StrictMode>,
)
