import styles from "./Chat.module.scss"
import { useEffect, useRef, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import ChatBubble from "@components/components/ChatBubble"

export default function Chat() {
    const { twitterId } = useRouter().query
    const [tweets, setTweets] = useState<string[]>([])
    const [chatInput, setChatInput] = useState("")
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const chatBoxContainerRef = useRef<HTMLDivElement>(null)

    function calculateCharactersPerRow(elementWidth: number, fontSize: number) {
        // Get the width of a single character by creating a temporary span element with the same font size
        const tempElement = document.createElement("span");
        tempElement.style.fontSize = `${fontSize}px`;
        tempElement.textContent = "A";
        document.body.appendChild(tempElement);
        const characterWidth = tempElement.offsetWidth;
        document.body.removeChild(tempElement);

        // Calculate the maximum number of characters that can fit in the element's width
        const maxCharacters = Math.floor(elementWidth / characterWidth);

        return maxCharacters;
    }

    useEffect(() => {
        if (twitterId) {
            fetch(`/pyApi/v1/getUserTweets/${twitterId}/50`)
                .then(res => res.json())
                .then(res => {
                    const parser = new DOMParser();
                    const result = res.map((item: string) => {
                        const decodedData = parser.parseFromString(item, 'text/html').body.textContent;
                        return decodedData
                    })
                    setTweets(result)
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


    useEffect(() => {
        const chatBoxContainer = chatBoxContainerRef.current
        if (chatBoxContainer) {
            chatBoxContainer.scrollTop = chatBoxContainer.scrollHeight
        }
    }, [tweets])

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

                    {/* {tweets} */}
                    {/* {tweets.length !== 0 && Array(3).fill(1).map((_, index, arr) => {
                        return <ChatBubble style={{ animationDelay: `${(index - Math.max(0, arr.length - 1 - 5)) * 0.1}s` }} key={index} stickyRight={index % 2 == 0} text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere accusamus provident dicta officia totam a sunt excepturi laborum, libero impedit?" />
                    })} */}
                    {tweets.map((text, index, arr) => {
                        return <ChatBubble style={{ animationDelay: `${(index - Math.max(0, arr.length - 1 - 5)) * 0.1}s` }} key={index} stickyRight={index % 2 == 0} text={text} />
                    })}
                </div>
            </div>
            <div className={styles.entryBox}>
                <form action="" method="get" onSubmit={e => { e.preventDefault(); }}>
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