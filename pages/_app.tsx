import NavLayout from '@components/layouts/NavLayout'
import '@components/styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, height=device-height,  initial-scale=1.0, maximum-scale=1.0, user-scalable=no, user-scalable=0 " />
      </Head>
      <NavLayout>
        <Component {...pageProps} />
      </NavLayout>
      <div id="loader" className={`${isLoading === false ? "fadeOut" : ""}`}>
        <div className="middle">TALK4ME</div>
      </div>
    </>
  )
}
