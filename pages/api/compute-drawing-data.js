import {getLimitDates} from "connectors/twint-sqlite";
import { LARIAT } from "constants/index";
import { buildTimeDimension, buildAutorDimension } from "utils/build-drawing-data";


export default (req, res) => {
    try{
        let response

        let {
            type,       // type of dimension 
            keywords,   // filtering by keywords
        } = req.body

        let {firstDate, lastDate} = getLimitDates()

        if (type === LARIAT?.dimensions?.time)
            response = buildTimeDimension(firstDate?.date, lastDate?.date, keywords, 15)

        if (type === LARIAT?.dimensions?.autor)
            response = buildAutorDimension(keywords)

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
  