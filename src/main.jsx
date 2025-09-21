import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.jsx'

import './index.css'

// Rendering the app in 'index.html'
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);