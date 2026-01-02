import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          background: '#0a1628',
          minHeight: '100vh',
          color: '#e0e0e0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1 style={{ color: '#ff6b6b', fontSize: '3rem' }}>👻 Oops!</h1>
          <h2>Something went wrong</h2>
          <p style={{ maxWidth: '600px', margin: '1rem auto' }}>
            The ghost must have interfered with the app. Try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '2rem',
              padding: '1rem 2rem',
              background: '#2e5a8a',
              border: '2px solid #4fa3ff',
              borderRadius: '8px',
              color: '#e0e0e0',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            🔄 Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
