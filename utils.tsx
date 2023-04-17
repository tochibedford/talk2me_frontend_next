// i'll be using the davinci model in completion mode and it's average token length is 4.5 characters 👍
// also, in completion mode, max token length of the request is 4000 (shared between request and completion)
export function* generateBatchedTweets(tweets: string[], maxTokens = 3100, tokenLength = 4.5) {
    const tweetBatch = [];
    let totalTokens = 0;

    for (const tweet of tweets) {
        if (totalTokens >= maxTokens) {
            const result = [...tweetBatch];
            tweetBatch.length = 0;
            totalTokens = 0;
            yield result;
        }
        totalTokens += tweet.length / tokenLength;
        tweetBatch.push(tweet);
    }

    yield tweetBatch;
}
