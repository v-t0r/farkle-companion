import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import GameContextProvider from './store/GameContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GameContextProvider>
        <App />
    </GameContextProvider >
  </StrictMode>,
)
