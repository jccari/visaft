import {getLimitDates} from "connectors/twint-sqlite";
import { buildTimeDimension, buildAutorDimension } from "utils/build-drawing-data";


export default (req, res) => {
    try{
        let response

        let {
            type,       // type of dimension 
            keywords,   // filtering by keywords
        } = req.body

        let {firstDate, lastDate} = getLimitDates()
        // response.firstDate = firstDate?.date
        // response.lastDate = lastDate?.date

        // keywords = "hola"
        response = buildTimeDimension(firstDate?.date, lastDate?.date, keywords, 15);
        // buildAutorDimension()

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
  