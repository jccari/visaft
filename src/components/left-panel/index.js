import {SearchBox, ResultBox} from "components"


function LeftPanel(props){
    return (
        <div className="col-md-4 m-2 h-100">
            <SearchBox/>
            <ResultBox/>
        </div>
    )
}

export default LeftPanel