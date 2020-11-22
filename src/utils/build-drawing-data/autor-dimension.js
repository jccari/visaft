import { runAllQuery } from "connectors/twint-sqlite";

function buildAutorDimension(){
    let query = "select screen_name, name, count(name) as total from tweets group by name";
    let results = runAllQuery(query);
    console.log("autor", results);
    return results
}

export default buildAutorDimension