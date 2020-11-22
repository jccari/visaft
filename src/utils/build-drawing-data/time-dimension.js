import { addKeywordsFilter, runGetQuery } from "connectors/twint-sqlite";
import { DATE_FORMATS } from "constants/index";
import moment from "moment";

function computeRanges(first, last, step){
    let dates = []
    let date = moment(first, DATE_FORMATS.date)
    let end = moment (last, DATE_FORMATS.date) 

    while ( date.isBefore(end) ){
        // console.log("date", date);
        dates.push(date.format(DATE_FORMATS.date))
        date = date.add(step, "days")
    }

    dates.push(date.format(DATE_FORMATS.date))

    return dates
}

function buildTimeDimension(firstDate, lastDate, keywords=null ,step = 15 /* days*/,  ){
    let initQuery = "SELECT COUNT(id) as total FROM tweets"
    if (keywords)
        initQuery = addKeywordsFilter(initQuery, keywords) + " and "
    else 
        initQuery += " WHERE "

    let dates = computeRanges(firstDate, lastDate, step)
    let results = [] 
    for (let i=0; i < dates.length -1 ; i++){
        // let query = `SELECT COUNT(id) as total FROM tweets WHERE date >= '${dates[i]}' and date <= '${dates[i+1]}'`;
        let query = initQuery + `(date >= '${dates[i]}' and date <= '${dates[i+1]}')`;
        let resQuery = runGetQuery(query)
        // console.log("query", i , query );
        let res = {
            firstDate: dates[i],
            lastDate: dates [i+1],
            total: resQuery?.total
        }
        console.log("queryRes", i , res );
        results.push(res)
    }
    // console.log("results: ", results);
    return {
        total : results.length,
        data : results
    }
}

export default buildTimeDimension