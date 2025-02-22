import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import './bootstrap.min.css'
import Contextshare from './context/Contextshare.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter> 
<Contextshare>   <App /></Contextshare>
   </BrowserRouter>
  </StrictMode>,
)
