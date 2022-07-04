// import ErrorBoundary from '../components/ErrorBoundary'
import { ErrorBoundary } from 'react-error-boundary'
import '../styles/globals.css'

function MyApp({ Component, pageProps, err }) {
  return (<ErrorBoundary>
  <Component {...pageProps} />
</ErrorBoundary>)
}

export default MyApp
