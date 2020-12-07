import { addKeywordsFilter, runGetQuery, runAllQuery } from "connectors/twint-sqlite";
import { LARIAT } from "constants/index";

function TweetsByDimension(source, keywords="", dimension=LARIAT.dimensions.hashtags, value,  page=0, limit=10 ){
    let offset = page*limit
    let query = 'SELECT id, tweet, date, time, timezone, user_id, screen_name, name, link, mentions, hashtags FROM tweets'
    let countQuery = 'SELECT count(id) as total FROM tweets'

    if (keywords.length > 0){
        query = addKeywordsFilter(query, keywords) + " AND "
        countQuery = addKeywordsFilter(countQuery, keywords) + " AND "
    } else {
        query = query + " WHERE "
        countQuery = countQuery + " WHERE "
    }

    if (dimension === LARIAT.dimensions.hashtags){
        query = query + ` hashtags LIKE \'%${value}%\'`
        countQuery = countQuery + ` hashtags LIKE \'%${value}%\'`
    }
    if (dimension === LARIAT.dimensions.autor){
        query = query + ` name LIKE \'%${value}%\'`
        countQuery = countQuery + ` name LIKE \'%${value}%\'`
    }    
    // if (dimension === LARIAT.dimensions.time)

    query = query + " LIMIT " + String(limit)
    query = query + " OFFSET " + String(offset)

    // console.log("query: ", query);

    let tweets = runAllQuery(query)
    let total = runGetQuery(countQuery).total
    // // console.log("tweets: ", tweets);
    // // console.log("total: ", total);
    // // let pages = Math.ceil(total/limit)
    return {
        tweets, 
        // pages,
        total,
    }
}

export default TweetsByDimension