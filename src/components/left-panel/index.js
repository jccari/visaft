import {SearchBox, ResultBox} from "components"


function LeftPanel(props){
    return (
        <div className="col-3 h-100">
            <SearchBox/>
            <ResultBox/>
        </div>
    )
}

export default LeftPanel