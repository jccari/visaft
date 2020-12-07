import { useContext, useEffect, useState } from  "react"
import { Paper, Tabs, Tab } from "@material-ui/core";

import { AppContext } from "contexts/AppContext"
import TabPanel from "./tab-panel"
import KeywordsList from "./keywords-list";
import {TweetsList} from "components"
import KeywordsPagination from "./keywords-pagination";
import TweetsPagination from "../tweets/tweets-pagination";


function ResultBox() {
  const [active, setActive] = useState(0)
  const {keywords, getKeywords, tweets} = useContext(AppContext)

//   useEffect(()=>{
//     // getKeywords()
//     console.log("RB", keywords);
//   },[keywords])

  const handleChange = (event, newValue) => {
    setActive(newValue);
  };

  return (
    <div>
      <Paper square className="mt-3">
        <Tabs
          value={active}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          <Tab label="Palabras Clave" />
          <Tab label="Resultado de Búsqueda" />
        </Tabs>
        <TabPanel value={active} index={0} style={{height: "45em"}}>
            {/* <KeywordsList data={keywords}/> */}
            <KeywordsPagination data={keywords}/>
        </TabPanel>

        <TabPanel value={active} index={1} style={{height: "45em"}}>
            <TweetsPagination />
            {/* <TweetsList data={tweets}/> */}
        </TabPanel>
      </Paper>
    </div>
  );
}

export default ResultBox