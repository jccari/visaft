import { addKeywordsFilter, runGetQuery, runAllQuery } from "connectors/twint-sqlite";

function retrieveTweetsPage(source, keywords="", page=0, limit=10){
    let offset = page*limit
    let query = 'SELECT id, tweet, date, time, timezone, user_id, screen_name, name, link, mentions, hashtags FROM tweets'
    let countQuery = 'SELECT count(id) as total FROM tweets'

    if (keywords.length > 0){
        query = addKeywordsFilter(query, keywords)
        countQuery = addKeywordsFilter(countQuery, keywords)
    }

    query = query + " LIMIT " + String(limit)
    query = query + " OFFSET " + String(offset)

    let tweets = runAllQuery(query)
    let total = runGetQuery(countQuery).total
    // console.log("tweets: ", tweets);
    // console.log("total: ", total);
    let pages = Math.ceil(total/limit)
    return {
        tweets, 
        pages,
        total,
    }
}

export default retrieveTweetsPage