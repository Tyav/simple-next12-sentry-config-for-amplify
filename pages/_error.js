import NextErrorComponent from 'next/error'

import * as Sentry from '@sentry/nextjs'
import Link from "next/link";
import styled from "styled-components";

function ErrorMessage({ statusText, message }) {
  return (
    <ErrorMessageWrapper>
      <ErrorCode>{statusText}</ErrorCode>
      {message && <ErrorDescription>{message}</ErrorDescription>}
    </ErrorMessageWrapper>
  );
}

export function Error({ statusCode, hasGetInitialPropsRun , err }) {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    Sentry.captureException(err);
    // Flushing is not required in this case as it only happens on the client
  }
  return (
    <Wrapper>
      <Main>
        <CenterContainer>
          <h1>
            Oops! We can&apos;t seem to find the page you&apos;re looking for.
          </h1>
          <div>
            <ErrorMessage
              message={
                statusCode === 404
                  ? ""
                  : "Something went wrong. No worries you didn't break anything. We are working to fix it."
              }
              statusText={"Page Not Found"}
            />
          </div>
          <h2>
            Looks like you&apos;re on the wrong side of town, buddy. Let&apos;s
            get you back on the <Link href="/">learning path</Link>.
          </h2>
        </CenterContainer>{" "}
      </Main>
    </Wrapper>
  );
}

Error.getInitialProps = async (context) => {
  const statusCode = context.res ? context.res.statusCode : context.err ? context.err.statusCode : 404;
  const errorInitialProps = await NextErrorComponent.getInitialProps(context)

  const { res, err, asPath } = context;
  errorInitialProps.hasGetInitialPropsRun = true

  console.log(context)
  if (res?.statusCode === 404) {
    return errorInitialProps;
  }

  if (err) {
    Sentry.captureException(err)

    // Flushing before returning is necessary if deploying to Vercel, see
    // https://vercel.com/docs/platform/limits#streaming-responses
    await Sentry.flush(2000)

    return errorInitialProps
  }

    // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry
  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`),
  );
  await Sentry.flush(2000);

  return { statusCode, ...errorInitialProps };
};

const ErrorMessageWrapper = styled.div`
  padding: 5rem 2rem;
  border: 1px solid var(--clr-primary-600);
  border-radius: 1rem;
  margin: 2rem 0;
`;

const ErrorCode = styled.h3`
  font-size: 5rem;
  font-weight: 700;
`;
const ErrorDescription = styled.p``;

const Section = styled.section`
  padding: 66px 0 50px 0;
`;

const Main = styled.main`
  display: flex;
`;

const Wrapper = styled.div`
  height: 100vh;
  padding: 16px 16px 20px;
  @media (max-width: 450px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  main {
    max-width: 980px;
    margin: 0 auto;
  }
`;

const CenterContainer = styled.div`
  position: relative;
  width: 90vw;
  height: 90vh;
  text-align: center;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    max-width: 700px;
    a {
      color: var(--clr-primary-600);
    }
  }
`;

export default Error;
