import ErrorBoundary from '../components/Boundary'
import '../styles/globals.css'

function MyApp({ Component, pageProps, ...err }) {
  console.log(err)
  return (<ErrorBoundary FallbackComponent={
    () => (<p> Error rendered</p>)
  }>
    <Component {...pageProps} err={err.err}/>
  </ErrorBoundary>
)
}

export default MyApp
