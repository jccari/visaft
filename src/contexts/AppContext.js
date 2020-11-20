import { functionsIn } from "lodash";

const { createContext, useState } = require("react");

export const AppContext = createContext(null)

function AppContextProvider(props){
    const serverUrl = "http://localhost:3000"

    const [tweets, setTweets] = useState(null)
    const [keywords, setKeywords] = useState(null)

    const [keywordsFilter, setKeywordsFilter] = useState(null)

    async function getTweets(kw){
        let fetchUrl = `${serverUrl}/api/retrieve-tweets?limit=${1000}`
        if (kw){
            fetchUrl = fetchUrl + `&keywords=${kw}`
        }
        const res = await fetch(fetchUrl)
        const data = await res.json()
        setTweets(data)
    }

    const values = {
        tweets, setTweets,
        keywords, setKeywords,
        keywordsFilter, setKeywordsFilter,

        getTweets,
    }

    return (
        <AppContext.Provider value={values}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider