import { useContext, useEffect } from  "react"
import { AppContext } from "contexts/AppContext"

function ResultBox(){
    const {tweets} = useContext(AppContext)
    
    useEffect(()=>{
        console.log("ResultBox", tweets, tweets?.count);
    },[tweets])

    return (
        <div className="card p-2 mt-2">
            <p>{tweets?.count}</p>
        </div>
    )
}

export default ResultBox