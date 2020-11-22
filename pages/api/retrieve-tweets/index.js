// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { retrieveTweetsFromSqlite } from "connectors/twint-sqlite";
import { computeGlobalFrequecy } from "pre-processing";

export default (req, res) => {
  try{
    let source = "/home/jccari/code/visaft/pages/api/Parlamentaries.db"
    
    const {limit, keywords} = req.query
    
    let retrievedTweets = retrieveTweetsFromSqlite(source, limit, keywords)
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
