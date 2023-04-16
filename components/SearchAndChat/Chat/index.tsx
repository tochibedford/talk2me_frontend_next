import styles from "./Chat.module.scss"
import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import ChatBubble from "@components/components/ChatBubble"
import ChatLoader from "@components/components/ChatLoader"
import { useTweets } from "@components/hooks"
import ErrorDisplay from "@components/components/ErrorDisplay"

export default function Chat() {
    type chatType = {
        userChat: boolean
        text: string
    }
    const { twitterId } = useRouter().query
    const [testChat, setTestChat] = useState<chatType[]>([])
    const [chatInput, setChatInput] = useState("")
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const chatBoxContainerRef = useRef<HTMLDivElement>(null)
    const testChatRef = useRef<chatType[]>([])

    const scrollToBottom = () => {
        const chatBoxContainer = chatBoxContainerRef.current
        if (chatBoxContainer) {
            chatBoxContainer.scrollTop = chatBoxContainer.scrollHeight
        }
    }

    const { tweets, isLoading, error } = useTweets(twitterId as string)
    // useEffect(() => {
    //     const testChat: chatType[] = tweets.map((item: string): chatType => {
    //         return { userChat: Math.random() > 0.5, text: item }
    //     })
    //     setTestChat(testChat)
    // }, [tweets])

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

    const handleChat = (e: FormEvent) => {
        e.preventDefault()
        let newChatSet: chatType[] = []
        setTestChat(prev => {
            newChatSet = [...prev, { userChat: true, text: chatInput }]
            // testChatRef.current = newChatSet
            // console.log(testChatRef.current)
            const requestData = {
                tweets: tweets,
                chat: newChatSet
            }
            fetch("/api/chat", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
                .catch(err => {
                    console.error(err)
                })
            return newChatSet
        })
        setChatInput("")



    }

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
                    {error && <ErrorDisplay error={error} />}
                    {isLoading ? <ChatLoader style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} width={60} height={60} /> : testChat.map((chat, index, arr) => {
                        return <ChatBubble style={{ animationDelay: `${(index - Math.max(0, arr.length - 1 - 5)) * 0.1}s` }} key={index} stickyRight={chat.userChat} text={chat.text} />
                    })}
                </div>
            </div>
            <div className={styles.entryBox}>
                <form action="" onSubmit={handleChat}>
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