// https://github.com/NaturalNode/natural#tf-idf

// https://en.wikipedia.org/wiki/Tf–idf
/* 
    Using tf-idf algorithm
        tf (Term Frequency) = Raw count of a term in a document
        idf (Inverse Document Frequency) = how much information the word provides
*/

import natural from "natural"
import _ from "lodash"
import cleanTweets from "./clean-tweets";

function reduceToCorpus(data){
    let corpus = ""
    _.forEach(data, (item) => {
        // console.log("item: ", item.procesedTweet);
        corpus = corpus + item.procesedTweet + " "
    })
    return corpus
}

function computeGlobalFrequecy(data){
    cleanTweets(data)
    let corpus = reduceToCorpus(data)
    // console.log("corpus", corpus)
    let tfidf = new natural.TfIdf()
    
    tfidf.addDocument(corpus)

    // Retrive the most representative words
    let terms = tfidf.listTerms(0 /*document index*/).slice(0,200)
    // console.log("terms: ", terms);
    return terms
}

export default computeGlobalFrequecy

// function computeGlobalFrequecy(data){
//     console.log("data", data);
//     cleanTweets(data)
//     // data = cleanTweet(data)
//     // let corpus = reduceToCorpus(data)
//     // console.log("corpus",corpus);
//     // let tokenized = tokenize(corpus)
//     // console.log("tokenized",tokenized);
//     let tfidf = new natural.TfIdf()

//     _.forEach(data, (item)=> {
//       console.log("tweet: ", item.procesedTweet);
//       tfidf.addDocument(item.procesedTweet)
//     })

//     // _.forEach(tokenized, (item)=>{
//     //   tfidf.tfidfs( item, function(i, measure) {
//     //       console.log('document #' + item + ' is ' + measure);
//     //   })
//     // })

//     // let listTerms = tfidf.listTerms(3 /*document index*/); 
//     // listTerms.forEach(function(item) {
//     //     console.log(item.term + ': ' + item.tfidf);
//     // });
//     let listTerms = []
//     data.forEach( (tweet, index) => {
//         console.log(index, " --------------------");
//         let terms = tfidf.listTerms(index /*document index*/);
//         console.log("terms", terms)
//         listTerms.push(terms)
//     })
//     return listTerms
// }