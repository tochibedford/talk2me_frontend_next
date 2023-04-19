import { MouseEvent } from 'react'
import styles from './ChatBubble.module.scss'
import twitterIcon from './assets/twitter.png'
import Image from 'next/image'

export default function ChatBubble(props: { stickyRight?: boolean, text: string } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    const { text, stickyRight = false, className, ...otherProps } = props

    function handleClick(e: MouseEvent) {
        const queryParams = {
            text: e.currentTarget.textContent + "\n\n",
            hashtags: "talk4me"
        }
        const params = new URLSearchParams(queryParams).toString()
        window.open("https://twitter.com/intent/tweet?" + params, "_blank")

    }

    return (
        <div onClick={handleClick} className={`${styles.container} ${stickyRight === true ? styles.stickyRight : ""} ${className}`} {...otherProps}>
            {text}
            <div className={styles.twitterIcon}>
                <Image src={twitterIcon} width={25} height={25} alt="twitter icon" />
            </div>
        </div>
    )
}