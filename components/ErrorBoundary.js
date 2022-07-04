import React from "react"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    console.log(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false, error: null, errorInfo: null  }
  }
  // static getDerivedStateFromError(error) {
  //   // Update state so the next render will show the fallback UI
  //   console.log({ error })
  //   return { hasError: true }
  // }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo })
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }
  render() {
    // Check if the error is thrown
    if (this.state.errorInfo) {
      console.log(this.state)
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      )
    }

    // Return children components in case of no error

    // return <div>
    //   Error
    // </div>
    return this.props.children
    
  }
}

export default ErrorBoundary
