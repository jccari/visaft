import path from 'path'
import getConfig from 'next/config'

export const DATE_FORMATS = {
    date: "YYYY-MM-DD",
    datetime: "YYYY-MM-DD HH:mm",    
}

export const LARIAT = {
    dimensions: {
        time: "time",
        hashtags: "hashtag",
        autor: "autor",
    }
}
const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();
// export const DB_SOURCE = process.env.NODE_ENV== "development"? "public/Parlamentaries.db":"https://visaft.vercel.app/Parlamentaries.db"
// export const DB_SOURCE = process.env.NODE_ENV== "development"? "public/Parlamentaries.db": path.join(getConfig().publicRuntimeConfig.staticFolder, "Parlamentaries.db") 
// console.log("static", path.join(publicRuntimeConfig.staticFolder, "Parlamentaries.db"))
// console.log("rootOir", path.join(serverRuntimeConfig.rootDir, "/static/Parlamentaries.db"))
export const DB_SOURCE = path.join(publicRuntimeConfig.staticFolder, "Parlamentaries.db") 
// export const DB_SOURCE = path.join(serverRuntimeConfig.rootDir, "/static/Parlamentaries.db")
// export const DB_SOURCE = "static/Parlamentaries.db"
// export const DB_SOURCE = "/home/jccari/code/visaft/pages/api/Parlamentaries.db"