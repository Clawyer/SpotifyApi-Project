import { SessionProvider } from "next-auth/react";
import {RecoilRoot} from "recoil";
import "../styles/globals.scss";
import "../styles/reset.scss";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
