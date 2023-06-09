import NavLayout from '@components/layouts/NavLayout'
import '@components/styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'

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
        <title>Generate tweets like {twitterId ? "@" + twitterId : "anyone"} | Talk4Me</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, user-scalable=0" />
        <meta property="og:title" content={`Generate tweets like ${twitterId ? "@" + twitterId : "anyone"}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://talk4me.tochibedford.com" />
        <meta property="og:description" content="Generate tweets in the style of anyone public twitter handle." />
        <meta property="og:image" content="https://talk4me.tochibedford.com/talk4me.jpg" />
        <meta property="og:site_name" content="Talk4Me" />

        <meta name="twitter:title" content={`Generate tweets like ${twitterId ? "@" + twitterId : "anyone"}`} />
        <meta name="twitter:description" content="Generate tweets in the style of anyone public twitter handle." />
        <meta name="twitter:image" content="https://talk4me.tochibedford.com/talk4me.jpg" />
        <meta name="twitter:image:alt" content="Talk4Me image" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tochibedford" />
        <meta name="twitter:creator" content="@tochibedford" />

        <meta name="description" content="Talk4Me is an AI tweet generator that generates tweets in the style of any public Twitter account. As far as a users tweets are public you can use AI, to generate tweets like theirs. They are AI tweets, so they are eerily in tune with your tweet style." />

      </Head>
      <NavLayout>
        <Component {...pageProps} />
      </NavLayout>
      <div id="loader" className={`${isLoading === false ? "fadeOut" : ""}`}>
        <div className="middle">TALK4ME</div>
      </div>
      <Analytics />
    </>
  )
}
