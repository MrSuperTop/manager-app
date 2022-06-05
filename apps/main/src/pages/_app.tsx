import { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.scss';


function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Manager app</title>
      </Head>
      <Toaster />
      <main className="app h-screen">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
