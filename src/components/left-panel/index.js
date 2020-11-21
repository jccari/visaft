import {SearchBox, ResultBox} from "components"

import styles from "styles/Home.module.css"

function LeftPanel(props){
    return (
        <div className="col m-2 h-100">
            <SearchBox/>
            <ResultBox/>
        </div>
    )
}

export default LeftPanel