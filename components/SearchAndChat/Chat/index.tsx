import styles from "./Chat.module.scss"
import { useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Chat() {
    const { twitterId } = useRouter().query
    const [tweets, setTweets] = useState<string[]>([])
    useEffect(() => {
        if (twitterId) {
            fetch(`https://talk2mebackend2-musicofbyte.b4a.run/getUserTweets/${twitterId}/50`)
                .then(res => res.json())
                .then(res => {
                    setTweets(res)
                })
                .catch(console.error)
        }
    }, [twitterId])
    return (
        <div className={`${styles.container} ${twitterId ? styles.focused : ""}`}>
            <div>
                <div>
                    <Link href="/" style={{ cursor: 'pointer' }}>
                        Close
                    </Link>
                </div>
                {tweets}
            </div>
        </div>
    )
}