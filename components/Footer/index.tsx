import { useState } from 'react'
import styles from './Footer.module.scss'

export default function Footer() {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className={`${styles.container} ${isOpen ? styles.isOpen : ""}`}>
            <div className={styles.title} onClick={() => setIsOpen(prev => !prev)}>
                <div className={styles.caretUp}>{"^"}</div>
                About
            </div>
            <div className={[styles.content, styles.isOpen ? "" : ""].join(" ")}>
                You can generate new potential tweets based on your public tweet style. As a software engineer who loves weekend projects, I built this site as an excuse to tinker with AI models again.
                Using the tool is easy - simply enter a Twitter handle (make sure it's a public account), and wait for it to load the tweets. I've written a python script to scrape your tweets and I generate new potential tweets using AI.
                This website is a personal project of mine, and is not intended to sell you anything.
                <div className={styles.signOut}>
                    <br />
                    Cheers,
                    <br />
                    -Tochi
                </div>
            </div>
            <div className={styles.socialsContainer}>
                <div className={styles.socialsPrompt}>
                    Follow me on:
                </div>
                <div className={styles.socials}>
                    <a href="https://twitter.com/tochibedford" target='_blank' >
                        TWITTER
                    </a>
                    |
                    <a href="https://instagram.com/tochibedford" target='_blank'>
                        INSTAGRAM
                    </a>
                </div>
            </div>
        </div>
    )
}