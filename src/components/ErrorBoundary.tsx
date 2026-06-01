import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      hasError: true,
      error,
      errorInfo,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-cream p-4">
          <div className="card-brutal p-6 max-w-md w-full">
            <h1 className="title-display text-2xl mb-4">出错了</h1>
            <details className="bg-gray-100 p-4 rounded border-2 border-black">
              <summary className="cursor-pointer font-bold mb-2">查看错误详情</summary>
              <div className="mt-2 whitespace-pre-wrap text-sm font-mono">
                {this.state.error && this.state.error.toString()}
                <br />
                <br />
                {this.state.errorInfo?.componentStack}
              </div>
            </details>
            <button
              onClick={() => window.location.reload()}
              className="btn-brutal-primary mt-4 w-full"
            >
              重新加载
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
