import React, { Component, ErrorInfo } from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class AIAssistantErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("AIAssistant crashed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render nothing - don't crash the whole page
      return null;
    }
    return this.props.children;
  }
}
