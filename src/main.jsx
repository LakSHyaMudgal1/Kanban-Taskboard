import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary'

// Suppress specific console warnings
const originalConsoleWarn = console.warn;
console.warn = function filterWarnings(msg, ...args) {
  // Filter out specific warnings
  if (typeof msg === 'string' && msg.includes('Support for defaultProps will be removed from memo components')) {
    return;
  }
  originalConsoleWarn(msg, ...args);
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
)