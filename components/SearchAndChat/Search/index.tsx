import styles from "./Search.module.scss"
import { useState } from 'react'
import { useRouter } from "next/router"

export default function Search() {
    const location = useRouter()
    const [twitterHandle, setTwitterHandle] = useState("")

    return (
        <section role="search" className={`${styles.container} ${location.pathname === "/" ? styles.focused : ""}`} style={{ opacity: 0.2 }}>
            <form action="" method="get" onSubmit={e => { e.preventDefault(); location.push(`/${twitterHandle}/chat`) }}>
                <fieldset>
                    <legend>PUT IN A PUBLIC TWITTER HANDLE</legend>
                    <label htmlFor="search">
                        <span className={styles.atSymbol}>@</span>
                        <input type="search" name="search" id="searchInput" onChange={(e) => setTwitterHandle(e.target.value)} value={twitterHandle} required placeholder="example = tweet like @example " />
                        <button type="submit" title="Generate tweets like this user ">GENERATE</button>
                    </label>
                </fieldset>
            </form>
        </section>
    )
}