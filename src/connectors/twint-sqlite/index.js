const Database = require('better-sqlite3');

function retrieveTweets(source, limit){
    let query = "SELECT id, tweet, date, time, timezone, user_id, screen_name, name, link, mentions, hashtags FROM tweets"
    if (limit != undefined)
        query = query + " LIMIT " + String(limit)

    const db = new Database(source, { verbose: console.log });
    const stmt = db.prepare(query);
    return stmt.all()
}

export default retrieveTweets