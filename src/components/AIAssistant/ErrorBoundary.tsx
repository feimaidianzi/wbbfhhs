import React, { Component, ErrorInfo } from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  errorCount: number;
}

export class AIAssistantErrorBoundary extends Component<Props, State> {
  private retryTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorCount: 0 };
  }

  static getDerivedStateFromError(): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("AIAssistant crashed:", error, errorInfo);
    
    // Auto-recover after 2 seconds
    this.retryTimeout = setTimeout(() => {
      this.setState(prev => ({
        hasError: false,
        errorCount: prev.errorCount + 1,
      }));
    }, 2000);
  }

  componentWillUnmount() {
    if (this.retryTimeout) {
      clearTimeout(this.retryTimeout);
    }
  }

  render() {
    // If crashed too many times (5+), stop trying
    if (this.state.hasError && this.state.errorCount >= 5) {
      return null;
    }
    
    if (this.state.hasError) {
      // Render nothing temporarily, will auto-recover
      return null;
    }
    
    return this.props.children;
  }
}
