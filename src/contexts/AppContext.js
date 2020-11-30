import { createContext, useState, useEffect } from "react"
import { map } from "lodash";
import { LARIAT } from "constants/index";
export const AppContext = createContext(null)

function AppContextProvider(props){
    const serverUrl = "http://localhost:3000"

    const [tweets, setTweets] = useState(null)
    const [keywords, setKeywords] = useState(null)
    const [dimensionSelected, setDimensionSelected] = useState(LARIAT.dimensions.hashtags)

    const [keywordsFilter, setKeywordsFilter] = useState(null)

    //D3js variables
    const [datavis, setDatavis] = useState(null)
    const [domain, setDomain] = useState(null)
    const [subgroups, setSubgroups] = useState(null)

    useEffect(()=>{
        getKeywords()
        getDataForDrawing()
    },[])

    async function getTweets(kw){
        let fetchUrl = `${serverUrl}/api/retrieve-tweets?limit=${1000}`
        if (kw){
            fetchUrl = fetchUrl + `&keywords=${kw}`
        }
        const res = await fetch(fetchUrl)
        const data = await res.json()
        // setTweets(data)
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

    function computeDataVisualization(data){
        let domain
        if (dimensionSelected === LARIAT.dimensions.hashtags)
            domain = map(data, item => item.hashtag)

        let subgroups = ["group-0"]
        setDomain(domain)
        setSubgroups(subgroups)
        return { domain, subgroups }
    }

    async function getDataForDrawing(kw){
        let query = "http://localhost:3000/api/compute-drawing-data"
        let request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: dimensionSelected,
                keywords: kw,
            })
        }
        console.log("request", request)
        const res = await fetch(query, request)
        const response = await res.json()
        console.log("data from server, ", response)

        setDatavis(response.data)
        let datavisConfig = computeDataVisualization(response.data)
        console.log("datavisConfig", datavisConfig)
    }


    const values = {
        tweets, setTweets,
        keywords, setKeywords,
        keywordsFilter, setKeywordsFilter,
        dimensionSelected, setDimensionSelected,
        datavis, setDatavis,
        domain, setDomain,
        subgroups, setSubgroups,

        getTweets,
        getKeywords,
        getDataForDrawing,
    }

    return (
        <AppContext.Provider value={values}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider