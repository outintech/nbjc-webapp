import React from 'react';

import NotFound from '../../routes/NotFound';
import UnknownError from '../../routes/UnknownError';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error) {
    this.setState({
      error,
    });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error) {
      if (error.status && error.status === 404) {
        return <NotFound />;
      }
      return <UnknownError />;
    }
    // Normally, just render children
    return children;
  }
}

export default ErrorBoundary;
