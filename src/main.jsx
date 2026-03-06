import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./assets/style/style.css"
import "./assets/style/Calculator.css"
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
    <BrowserRouter >
    <App />
    </BrowserRouter >
)
