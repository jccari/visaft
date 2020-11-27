import { createContext, useState, useEffect } from "react"

export const AppContext = createContext(null)

function AppContextProvider(props){
    const serverUrl = "http://localhost:3000"

    const [tweets, setTweets] = useState(null)
    const [keywords, setKeywords] = useState(null)

    const [keywordsFilter, setKeywordsFilter] = useState(null)

    useEffect(()=>{
        getKeywords()
    },[])

    async function getTweets(kw){
        let fetchUrl = `${serverUrl}/api/retrieve-tweets?limit=${1000}`
        if (kw){
            fetchUrl = fetchUrl + `&keywords=${kw}`
        }
        const res = await fetch(fetchUrl)
        const data = await res.json()
        setTweets(data)
        setKeywords(data?.keywords)
    }

    async function getKeywords(kw){
        let fetchUrl = `${serverUrl}/api/get-keywords?limit=${10}`
        if (kw){
            fetchUrl = fetchUrl + `&keywords=${kw}`
        }
        console.log("query", fetchUrl);
        const res = await fetch(fetchUrl)
        const data = await res.json()
        await setKeywords(data?.keywords)
        console.log("keywords11", data?.keywords);
        return data
    }

    const values = {
        tweets, setTweets,
        keywords, setKeywords,
        keywordsFilter, setKeywordsFilter,

        getTweets,
        getKeywords,
    }

    return (
        <AppContext.Provider value={values}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider