// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { retrieveTweetsPage } from "connectors/twint-sqlite";

export default (req, res) => {
  try{
    let source = "/home/jccari/code/visaft/pages/api/Parlamentaries.db"
    
    const {
        page,
        limit, 
        keywords
    } = req.body
    
    let retrievedTweets = retrieveTweetsPage(source, keywords, page, limit)

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
