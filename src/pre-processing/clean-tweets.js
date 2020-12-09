import _ from "lodash"
import sw from "stopword"

const stopwords_es = ["a","de","los","mi","que","yo","en","era","ni","se","da","es","os","son","ha","esta","este"]

function cleanTweets(data){
    // Cleaning data
    _.forEach(data, (item)=>{
        // Removing stopwords
        let tmp = sw.removeStopwords(String(item.tweet).toLowerCase().split(" "), [...sw.es, ...stopwords_es])
        item.procesedTweet = tmp.join(" ")

        // Removing urls from tweets
        // item.procesedTweet = item.procesedTweet.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '')
        item.procesedTweet = item.procesedTweet.replace(/https:\/\/[\n\S]+/g, '')
        item.procesedTweet = item.procesedTweet.replace(/pic.twitter.com\//g,'');
        // console.log("tweet: ", item.tweet);
        // console.log("procesedTweet: ", item.procesedTweet);
        // console.log("--------------------------");
    })
    return data
}

export default cleanTweets