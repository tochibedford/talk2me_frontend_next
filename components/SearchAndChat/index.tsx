import Chat from './Chat'
import Search from './Search'
import styles from './SearchAndChat.module.scss'


export default function SearchAndChat() {
    return (
        <div className={styles.container}>
            <Search />
            <Chat />
        </div>
    )
}