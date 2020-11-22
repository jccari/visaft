import { runAllQuery } from "connectors/twint-sqlite";
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

    return dates
}

function buildTimeDimension(tweets, firstDate, lastDate, step = 15 /* days*/,  ){
    let dates = computeRanges(firstDate, lastDate, step)

    console.log("dates", dates)
}

export default buildTimeDimension