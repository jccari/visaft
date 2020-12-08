import { createContext, useState, useEffect } from "react"
import { map, set } from "lodash";
import { LARIAT } from "constants/index";
export const AppContext = createContext(null)

function AppContextProvider(props){
    const serverUrl = "http://localhost:3000"

    const [tweets, setTweets] = useState(null)
    const [totalTweets, setTotalTweets] = useState(0)
    const [actualPage, setActualPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [keywords, setKeywords] = useState(null)
    const [dimensionSelected, setDimensionSelected] = useState(LARIAT.dimensions.time)

    const [visTweets, setVisTweets] = useState(null)
    const [totalVisTweets, setTotalVisTweets] = useState(0)

    const [keywordsFilter, setKeywordsFilter] = useState(null)

    //D3js variables
    const [datavis, setDatavis] = useState(null)
    const [domain, setDomain] = useState(null)
    const [subgroups, setSubgroups] = useState(null)

    useEffect(()=>{
        getKeywords()
    },[])

    useEffect(()=>{
        getDataForDrawing(keywordsFilter)
    },[dimensionSelected])

    useEffect(()=>{
        getTweets()
    },[])

    async function getTweets(kw='', page=0){
        let query = "http://localhost:3000/api/get-tweets"
        let request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                page: page,
                keywords: kw,
                limit: 100,
            })
        }
        // console.log("request", request)
        const res = await fetch(query, request)
        const response = await res.json()
        
        setTotalPages(response.pages)
        setActualPage(page)
        setTweets(response.data)
        setTotalTweets(response.total)
    }

    async function getTweetsbyDimension(kw='', dimension, value, page=0){
        let query = "http://localhost:3000/api/tweets-by-dimension"
        let request = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                page: page,
                keywords: kw,
                dimension: dimension,
                value: value,
            })
        }
        // console.log("request", request)
        const res = await fetch(query, request)
        const response = await res.json()
        console.log("response", response)

        await setVisTweets(response.data)
        setTotalVisTweets(response.total)
    }

    async function getKeywords(kw){
        let fetchUrl = `${serverUrl}/api/get-keywords?limit=${25}`
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
        if (dimensionSelected === LARIAT.dimensions.autor)
            domain = map(data, item => item["screen_name"])
        if (dimensionSelected === LARIAT.dimensions.time)
            domain = map(data, item => item["firstDate"])

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
        // console.log("request", request)
        const res = await fetch(query, request)
        const response = await res.json()
        console.log("data from server, ", response)

        setDatavis(response.data)
        let datavisConfig = computeDataVisualization(response.data)
        // console.log("datavisConfig", datavisConfig)
    }


    const values = {
        tweets, setTweets,
        keywords, setKeywords,
        keywordsFilter, setKeywordsFilter,
        dimensionSelected, setDimensionSelected,
        datavis, setDatavis,
        domain, setDomain,
        subgroups, setSubgroups,
        totalTweets, setTotalTweets,
        totalPages, setTotalPages,
        actualPage, setActualPage,
        visTweets, setVisTweets,
        totalVisTweets, setTotalVisTweets,

        getTweets,
        getKeywords,
        getDataForDrawing,
        getTweetsbyDimension,
    }

    return (
        <AppContext.Provider value={values}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider