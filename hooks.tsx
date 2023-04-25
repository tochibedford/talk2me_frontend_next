import { useEffect, useRef, useState } from "react";

export function useTweets(twitterId: string) {
    const [tweets, setTweets] = useState<string[]>([])
    const [genTweets, setGenTweets] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const prevTwitterIdRef = useRef<string>();
    const controllerRef = useRef<AbortController>()

    useEffect(() => {
        if (twitterId === prevTwitterIdRef.current) { //because of react strictmode, this helps me make sure it doesn't fetch twice
            return;
        }
        if (twitterId) {
            setIsLoading(true)
            fetch(`https://talk2me-pyapi-vxd6ybtwqa-uc.a.run.app/getUserTweets/${twitterId}`, {
                headers: {
                    Origin: "https://talk4me.tochibedford.com"
                }
            })
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
                    setIsLoading(false)
                    setError(error.message + (error.cause ? "\n" + error?.cause : ""))
                })
        }

        prevTwitterIdRef.current = twitterId;
    }, [twitterId])

    useEffect(() => { // calls the /api/chat endpoint when the a users tweets have been loaded in.
        if (twitterId && tweets.length > 0) {
            const controller = new AbortController()
            controllerRef.current = controller
            const requestData = {
                twitterId: twitterId,
                tweets: tweets
            }
            let genTweetsCache: string[] = []
            fetch("/func/v1", {
                signal: controllerRef.current.signal,
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
                    //remove tweet number
                    genTweetsCache = genTweetsCache.map((tweet) => {
                        const regex = /^[0-9]./
                        return tweet.replace(regex, "")
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

        () => {
            controllerRef.current?.abort()
        }
    }, [tweets])

    return { genTweets, isLoading, error }
}