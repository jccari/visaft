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

// export const DB_SOURCE = process.env.NODE_ENV== "development"? "public/Parlamentaries.db":"https://visaft.vercel.app/Parlamentaries.db"
export const DB_SOURCE = process.env.NODE_ENV== "development"? "public/Parlamentaries.db": path.join(getConfig().serverRuntimeConfig.rootDir, "public/Parlamentaries.db") 
// export const DB_SOURCE = "/home/jccari/code/visaft/pages/api/Parlamentaries.db"