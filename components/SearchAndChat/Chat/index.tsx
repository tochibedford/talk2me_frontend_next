import styles from "./Chat.module.scss"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import ChatBubble from "@components/components/ChatBubble"

export default function Chat() {
    type chatType = {
        userChat: boolean
        text: string
    }
    const { twitterId } = useRouter().query
    const [tweets, setTweets] = useState<string[]>([])
    const [testChat, setTestChat] = useState<chatType[]>([])
    const [chatInput, setChatInput] = useState("")
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const chatBoxContainerRef = useRef<HTMLDivElement>(null)
    const [isChatLoading, setIsChatLoading] = useState(false)

    const scrollToBottom = () => {
        const chatBoxContainer = chatBoxContainerRef.current
        if (chatBoxContainer) {
            chatBoxContainer.scrollTop = chatBoxContainer.scrollHeight
        }
    }

    useEffect(() => {
        if (twitterId) {
            fetch(`/pyApi/v1/getUserTweets/${twitterId}`)
                .then(res => res.json())
                .then(res => {
                    const parser = new DOMParser();
                    const result: string[] = res.map((item: string) => {
                        const decodedData = parser.parseFromString(item, 'text/html').body.textContent;
                        return decodedData
                    })
                    const testChat: chatType[] = result.map((item: string): chatType => {
                        return { userChat: Math.random() > 0.5, text: item }
                    })
                    setTweets(result)
                    setTestChat(testChat)
                })
                .catch(console.error)
        }
    }, [twitterId])

    useEffect(() => {
        const textArea = textAreaRef.current
        if (textArea) {
            textArea.style.height = "0px"
            const computedStyles = window.getComputedStyle(textArea)
            const em = parseFloat(computedStyles.getPropertyValue('font-size'))
            textArea.style.height = `${Math.min(6 * em, textArea.scrollHeight)}px`
        }

    }, [chatInput, textAreaRef])

    useLayoutEffect(() => {
        scrollToBottom()
    }, [tweets, testChat])

    useEffect(() => {
        const handleResize = () => {
            const textArea = textAreaRef.current
            if (textArea) {
                textArea.style.height = "0px"
                const computedStyles = window.getComputedStyle(textArea)
                const em = parseFloat(computedStyles.getPropertyValue('font-size'))
                textArea.style.height = `${Math.min(6 * em, textArea.scrollHeight)}px`
            }
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <div className={`${styles.container} ${twitterId ? styles.focused : ""}`}>
            <div className={styles.top}>
                <Link href="/" style={{ cursor: 'pointer' }} className={styles.close}>
                    Close
                </Link>
                <div className={styles.userHandle}>@{twitterId}</div>
            </div>
            <div className={styles.chatBox} ref={chatBoxContainerRef}>

                <div className={styles.chatBoxInner}>
                    {testChat.map((chat, index, arr) => {
                        return <ChatBubble style={{ animationDelay: `${(index - Math.max(0, arr.length - 1 - 5)) * 0.1}s` }} key={index} stickyRight={chat.userChat} text={chat.text} />
                    })}
                </div>
            </div>
            <div className={styles.entryBox}>
                <form action="" onSubmit={e => { e.preventDefault(); setTestChat(prev => [...prev, { userChat: true, text: chatInput }]); setChatInput("") }}>
                    <fieldset>
                        <label htmlFor="search">
                            <textarea ref={textAreaRef} name="search" id="searchInput" onChange={(e) => setChatInput(e.target.value)} value={chatInput} required />
                            <button type="submit" title="Send Message">SEND</button>
                        </label>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}