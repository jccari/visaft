import { runAllQuery, addKeywordsFilter } from "connectors/twint-sqlite";

function buildAutorDimension(keywords = null){
    let query = "select screen_name, name, count(name) as total from tweets"
    if (keywords)
        query = addKeywordsFilter(query, keywords)

    query = query + " group by name";
    console.log("query", query);

    let results = runAllQuery(query);
    // console.log("autor", results);
    return results
}

export default buildAutorDimension