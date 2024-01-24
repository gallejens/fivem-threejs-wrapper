import React from 'react'
import ReactDOM from 'react-dom/client'

const rootEl = document.getElementById('root')
if (!rootEl) throw new Error('No root element')

const root = ReactDOM.createRoot(rootEl)
root.render(
  <React.StrictMode>
    <p>Jens</p>
  </React.StrictMode>,
)
