import styles from './ChatBubble.module.scss'
import twitterIcon from './assets/twitter.png'
import Image from 'next/image'

export default function ChatBubble(props: { stickyRight?: boolean, text: string } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    const { text, stickyRight = false, className, ...otherProps } = props


    return (
        <div className={`${styles.container} ${stickyRight === true ? styles.stickyRight : ""} ${className}`} {...otherProps}>
            {text}
            <div className={styles.twitterIcon}>
                <Image src={twitterIcon} width={25} height={25} alt="twitter icon" />
            </div>
        </div>
    )
}