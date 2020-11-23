import { runAllQuery, addKeywordsFilter } from "connectors/twint-sqlite";

function mapToString(data, getItem){
    let result = ""

    if (data === null || data === undefined || data.length == 0)
        return results

    data.forEach( (item) => {
        result = String(result).concat(",", getItem(item))
    })

    return result.substring(1)
}

function count(array){
    let result = []
    let res = {};
    array.forEach(function(x) { res[x] = (res[x] || 0)+1; })
    // console.log("hashtags", res);
    Object.keys(res).forEach((key) => {
        let tmp = {
            hashtag: key,
            total: res[key]
        }
        result.push(tmp)
        // [Number(key), obj[key]]
    });
    console.log("array", result);
    return result.sort((a, b) => b.total - a.total)
}

function buildHashtagDimension(keywords = null){
    let initQuery = "select hashtags from tweets"
    let query
    if (keywords){
        initQuery = addKeywordsFilter(initQuery, keywords)
        query = initQuery + " and hashtags != ''";
    }else{
        query = initQuery + " where hashtags != ''"
    }    
    // console.log("query", query);

    let hashtags = runAllQuery(query);
    let hashtagsStr = mapToString(hashtags, (item) => item?.hashtags)
    let hashtagsArray = hashtagsStr.split(",")

    console.log("hashtagsStr", hashtagsStr);

    // var results = {};
    // hashtagsArray.forEach(function(x) { results[x] = (results[x] || 0)+1; })
    let results = count(hashtagsArray)
    // console.log("hashtags", results);
    return {
        total : results.length,
        data : results
    }
}

export default buildHashtagDimension