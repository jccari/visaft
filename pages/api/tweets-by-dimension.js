// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { tweetsByDimension } from "connectors/twint-sqlite";

export default (req, res) => {
  try{
    let source = "/home/jccari/code/visaft/pages/api/Parlamentaries.db"
    
    const {
        page,
        limit, 
        keywords,
        dimension,
        value, //dimension filter
    } = req.body
    
    let retrievedTweets = tweetsByDimension(source, keywords, dimension, value, page, limit)

    res.statusCode = 200
    res.json({
      total: retrievedTweets.total,
      data: retrievedTweets.tweets, 
    })
  } catch (err){
    let error = {
        error: err
    }

    res.statusCode = 500
    res.json(error)
  }
}
