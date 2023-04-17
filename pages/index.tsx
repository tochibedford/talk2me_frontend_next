import Head from 'next/head'
import SearchAndChat from '@components/components/SearchAndChat'
import { useRouter } from 'next/router'

export default function Home() {
  return (
    <>
      <Head>
        <title>Generate tweets | Tweet4Me</title>
        <meta name="description" content="Generate tweets like any user" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchAndChat />
    </>
  )
}
