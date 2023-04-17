import { useEffect, useState } from "react";

export function useTweets(twitterId: string) {
    const [tweets, setTweets] = useState<string[]>([])
    const [genTweets, setGenTweets] = useState<string[]>([])
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
                    setTweets(result)
                })
                .catch((error: Error) => {
                    setError(error.message + (error.cause ? "\n" + error?.cause : ""))
                })
        }
    }, [twitterId])

    useEffect(() => {
        if (twitterId && tweets.length > 0) {
            const requestData = {
                twitterId: twitterId,
                tweets: tweets
            }
            let genTweetsCache: string[] = []
            fetch("/api/chat", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            })
                .then(res => res.json())
                .then(data => {
                    data.message.forEach((completion: { choices: { text: string, finish_reason: string }[], [key: string]: any }) => {
                        const tweetSet = "1." + completion.choices[0].text
                        const tweetSetList = tweetSet.split("\n")
                        genTweetsCache = genTweetsCache.concat(tweetSetList)
                    })
                    setGenTweets(genTweetsCache)
                })
                .catch(err => {
                    console.error(err)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [tweets, twitterId])

    return { genTweets, isLoading, error }
}