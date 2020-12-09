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
    Object.keys(res).forEach((key) => {
        let tmp = {
            hashtag: key,
            total: res[key]
        }
        result.push(tmp)
    });
    return result.sort((a, b) => b.total - a.total)
}

function buildHashtagDimension(keywords = null, limit){
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

    // console.log("hashtagsStr", hashtagsStr);

    let results = count(hashtagsArray).slice(0, limit)
    // console.log("hashtags", results);
    return {
        total : results.length,
        data : results
    }
}

export default buildHashtagDimension