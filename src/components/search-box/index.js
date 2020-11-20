import { AppContext } from "contexts/AppContext"
import { useContext, useEffect } from "react"

function SearchBox(params) {
    const {keywordsFilter, setKeywordsFilter, getTweets, tweets} = useContext(AppContext);

    useEffect(()=>{
        console.log("tweets", tweets);
    },[tweets])

    function onClickFilter(e){
        let value = document.getElementById("keywords-filter").value
        console.log("value", value);
        setKeywordsFilter(value)
        getTweets(value)
    }

    return (
        <div className="card p-2">
            <p>Búsqueda de tweets por palabras clave</p>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="keywords" id="keywords-filter"/>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={onClickFilter}>Filtrar</button>
                </div>
            </div>
            <button className="btn btn-outline-secondary" type="button">♥ Guardar</button>
        </div>
    )
}

export default SearchBox