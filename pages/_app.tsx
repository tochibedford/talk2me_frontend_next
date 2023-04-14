import NavLayout from '@components/layouts/NavLayout'
import '@components/styles/globals.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavLayout>
        <Component {...pageProps} />
      </NavLayout>
    </>
  )
}
