/**
 * ErrorBoundary — React class-based error boundary.
 * Wraps lazy-loaded route components to catch render errors.
 * Shows a styled error message with a "Reload" button on error.
 *
 * Requirements: 19.5
 */

import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log to console; in production this could be sent to an error tracking service
    console.error('[ErrorBoundary] Caught error:', error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            background: '#0a0a0a',
          }}
          role="alert"
        >
          {/* Icon */}
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(220, 38, 38, 0.15)',
              border: '1px solid rgba(220, 38, 38, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              marginBottom: '1.5rem',
            }}
            aria-hidden="true"
          >
            ⚠
          </div>

          <h2
            className="font-heading text-2xl font-semibold mb-3"
            style={{ color: '#FFFFFF' }}
          >
            Something went wrong
          </h2>

          <p
            className="text-sm font-body mb-6 max-w-md"
            style={{ color: '#9CA3AF', lineHeight: 1.6 }}
          >
            An unexpected error occurred while loading this page. Please try reloading.
          </p>

          <button
            onClick={this.handleReload}
            className="px-6 py-2.5 rounded text-sm font-body font-medium transition-colors duration-200"
            style={{
              background: '#D4AF37',
              color: '#0a0a0a',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#FFD700'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#D4AF37'; }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
