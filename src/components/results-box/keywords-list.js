import { useEffect } from "react";

const { ListItem, List } = require("@material-ui/core");

function KeywordsList({data}){
    console.log("keywordsList", data?.lenght);
    // useEffect(()=>{
    
    // },[data])

    if(!data){
        return "Cargando..."
    }
    console.log("keywordsList2", data?.lenght);
    return (
        <List className="list-group">
            {data.map((k,i)=>{
                return (
                    <li key={i} className="list-group-item">
                        <p className="m-1">
                            {k.term} - {k.tf}
                        </p>
                    </li>
                )
            })}
        </List>
    )
}

export default KeywordsList