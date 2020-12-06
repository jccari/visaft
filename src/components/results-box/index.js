import { useContext, useEffect, useState } from  "react"
import { Paper, Tabs, Tab } from "@material-ui/core";

import { AppContext } from "contexts/AppContext"
import TabPanel from "./tab-panel"
import KeywordsList from "./keywords-list";
import {TweetsList} from "components"


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
      <TabPanel value={active} index={0}>
          <KeywordsList data={keywords}/>
      </TabPanel>

      <TabPanel value={active} index={1}>
          <TweetsList data={tweets}/>
      </TabPanel>
    </Paper>
  );
}

export default ResultBox