import {getLimitDates, runAllQuery} from "connectors/twint-sqlite";
import { buildTimeDimension } from "utils/build-drawing-data";

const query = ""

export default (req, res) => {
    try{
        let response = {}

        const {
            type,       // type of dimension 
            keywords,   // filtering by keywords
        } = req.body

        let {firstDate, lastDate} = getLimitDates()
        response.firstDate = firstDate?.date
        response.lastDate = lastDate?.date

        // let tweets = runAllQuery(query)

        buildTimeDimension([], firstDate?.date, lastDate?.date, 15);

        res.statusCode = 200
        res.json(response)
    } catch (err){
        let response = {
            error: err
        }
        console.log("ERROR: ", response);

        res.statusCode = 500
        res.json(response)
    }
  }
  