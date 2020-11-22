const Database = require('better-sqlite3');

function retrieveTweets(source, limit=undefined, keywords=""){
    let query = 'SELECT id, tweet, date, time, timezone, user_id, screen_name, name, link, mentions, hashtags FROM tweets'

    if (keywords.length > 0){
        let listkeys = keywords.split(",")

        listkeys = listkeys.map( (word) => {
            return `tweet LIKE \'%${word}%\'` 
        }) 

        let whereClause = " WHERE " + listkeys.join(" OR ")
        query += whereClause
    }

    if (limit != undefined)
        query = query + " LIMIT " + String(limit)

    // console.log("query: ", query);
    const db = new Database(source, { verbose: console.log });
    const stmt = db.prepare(query);
    return stmt.all()
}

export default retrieveTweets