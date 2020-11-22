const Database = require('better-sqlite3');
import {DB_SOURCE} from "constants/index";

export function runGetQuery(query){
    const db = new Database(DB_SOURCE, { verbose: console.log })
    const stmt = db.prepare(query)
    return stmt.get()
}

export function runAllQuery(query){
    const db = new Database(DB_SOURCE, { verbose: console.log })
    const stmt = db.prepare(query)
    return stmt.all()
}

export function getLimitDates(){
    let query1 = 'select date from tweets order by date asc limit 1'
    let query2 = 'select date from tweets order by date desc limit 1'

    return {
        firstDate: runGetQuery(query1),
        lastDate: runGetQuery(query2)
    }
}