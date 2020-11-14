import _ from "lodash"
import sw from "stopword"

// for remove urls from tweets
// https://stackoverflow.com/questions/23571013/how-to-remove-url-from-a-string-completely-in-javascript

const stopwords_es = ["a","de","los","mi","que","yo","en","era","ni","se","da","es","os","son","ha"]

function preprocessing(data){
    // Cleaning data
    _.forEach(data, (item)=>{
        // Removing stopwords
        // let tmp = sw.removeStopwords(String(item.tweet).split(" "), [...sw.es,["a","de","los","mi","que"]])
        let tmp = sw.removeStopwords(String(item.tweet).toLowerCase().split(" "), [...sw.es, ...stopwords_es])
        item.procesedTweet = tmp.join(" ")

        // Removing urls from tweets
        item.procesedTweet = item.procesedTweet.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');

        console.log("r: ", item.procesedTweet);
    })
}

export default preprocessing

// function cleanTweet(data){
//     return _.forEach(data, (val)=> String(val.tweet).replace(/\u21b5/g,'').replace("\n",""))
//   }
  
//   function reduceToCorpus(data){
//       return _.map(data, (val)=> String(val.tweet).replace(/\u21b5/g,''))
//               .reduce( (curr, next) => { 
//                 return curr.concat(next);
//               })
//   }
  
//   function tokenize(corpus){
//     // let tokenizer = new natural.WordTokenizer();
//     let tokenizer = new natural.AggressiveTokenizerEs();
//     return tokenizer.tokenize(corpus)
//   }