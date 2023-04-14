import NavLayout from '@components/layouts/NavLayout'
import '@components/styles/globals.scss'
import type { AppProps } from 'next/app'
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
      <NavLayout>
        <Component {...pageProps} />
      </NavLayout>
      <div id="loader" className={`${isLoading === false ? "fadeOut" : ""}`}>
        <div className="middle">TALK2ME</div>
      </div>
    </>
  )
}
