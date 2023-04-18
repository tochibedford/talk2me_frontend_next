import NavLayout from '@components/layouts/NavLayout'
import '@components/styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { twitterId } = useRouter().query

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])
  return (
    <>
      <Head>
        <title>Generate tweets like {twitterId ? "@" + twitterId : "anyone"} | Tweet4Me</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, user-scalable=0" />
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
