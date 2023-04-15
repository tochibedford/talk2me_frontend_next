import styles from './ChatBubble.module.scss'

export default function ChatBubble({ text, stickyRight = false }: { stickyRight?: boolean, text: string }) {
    return (
        <div className={`${styles.container} ${stickyRight === true ? styles.stickyRight : ""}`}>{text}</div>
    )
}