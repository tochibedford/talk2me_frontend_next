import { useEffect, useState } from "react";

export function useTweets(twitterId: string) {
    type chatType = {
        userChat: boolean
        text: string
    }
    const [tweets, setTweets] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        if (twitterId) {
            setIsLoading(true)
            fetch(`/pyApi/v1/getUserTweets/${twitterId}`)
                .then(res => {
                    if (res.status === 502) {
                        throw Error("The request timed out, please try again.", { cause: "Sometimes a user's tweets are a lot, and the request will time out before our server can return. Not to worry, the request still runs in the background, so you can just refresh! P.S. this should be fixed soon" })
                    } else if (res.status === 404) {
                        throw Error("User not found.", { cause: "User's account is either suspended or a wrong twitter handle was put in." })
                    } else if (res.status === 500) {
                        throw Error("You might be disconnected from the internet, or ther was an internal server error [Sorry :( ]")
                    }
                    return res.json()
                })
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
                })
                .catch((error: Error) => {
                    setError(error.message + (error.cause ? "\n" + error?.cause : ""))
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [twitterId])

    return { tweets, isLoading, error }
}