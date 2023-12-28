import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Routers from './routers'
import DynamicStyle from './components/DynamicStyle'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <DynamicStyle />
    <Routers />
  </React.StrictMode>
)
