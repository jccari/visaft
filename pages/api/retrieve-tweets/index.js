// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { retrieveTweets } from "connectors/twint-sqlite";
import { computeGlobalFrequecy } from "pre-processing";
import { DB_SOURCE } from "constants/index";

export default (req, res) => {
  try{
    const {limit, keywords} = req.query
    
    let retrievedTweets = retrieveTweets(DB_SOURCE, keywords, limit)
    let listTerms = computeGlobalFrequecy(retrievedTweets)
    // console.log("tweets", retrievedTweets);
    // console.log("list", listTerms);
    res.statusCode = 200
    res.json({
      count: retrievedTweets.length,
      raw: retrievedTweets, 
      keywords: listTerms
    })
  } catch (err){
    res.statusCode = 500
    console.log(err);
    res.json({
      error: err
    })
  }
}
