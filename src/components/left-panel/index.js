import SearchBox from "components/search-box"

import styles from "styles/Home.module.css"

function LeftPanel(props){
    return (
        <div className="col m-2 h-100">
            <SearchBox/>
        </div>
    )
}

export default LeftPanel