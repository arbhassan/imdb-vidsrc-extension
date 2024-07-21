import React from 'react'
import ReactDOM from 'react-dom/client'
import MovieLinkGenerator from './MovieLinkGenerator'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MovieLinkGenerator />
  </React.StrictMode>
)