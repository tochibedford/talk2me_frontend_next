import Head from 'next/head'
import Chat from './Chat'
import Search from './Search'
import styles from './SearchAndChat.module.scss'
import { useRouter } from 'next/router'


export default function SearchAndChat() {
    const { twitterId } = useRouter().query
    return (
        <>
            <Head>
                <title>Generate tweets like @| Tweet4Me</title>
                <meta name="description" content="Generate tweets like any user" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.container}>
                <Search />
                <Chat />
            </div>
        </>
    )
}