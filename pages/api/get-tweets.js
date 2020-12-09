// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { retrieveTweetsPage } from "connectors/twint-sqlite";
import { DB_SOURCE } from "constants/index";

export default (req, res) => {
  try{
    const {
        page,
        limit, 
        keywords
    } = req.body
    
    let retrievedTweets = retrieveTweetsPage(DB_SOURCE, keywords, page, limit)

    res.statusCode = 200
    res.json({
      total: retrievedTweets.total,
      data: retrievedTweets.tweets, 
      pages: retrievedTweets.pages,
    })
  } catch (err){
    let error = {
        error: err
    }

    res.statusCode = 500
    res.json(error)
  }
}
