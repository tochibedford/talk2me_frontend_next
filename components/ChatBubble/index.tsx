import styles from './ChatBubble.module.scss'

export default function ChatBubble(props: { stickyRight?: boolean, text: string } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
    const { text, stickyRight = false, className, ...otherProps } = props


    return (
        <div className={`${styles.container} ${stickyRight === true ? styles.stickyRight : ""} ${className}`} {...otherProps}>{text}</div>
    )
}