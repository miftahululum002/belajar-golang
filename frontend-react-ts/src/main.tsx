import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx'

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// (Optional) Bootstrap JS jika butuh komponen JS-nya seperti modal atau dropdown
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext.tsx';
const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </AuthProvider>

  </StrictMode>,
)
