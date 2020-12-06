import { useContext, useEffect } from "react";
import {BarChart, BarChartAuthor, BarChartGroup} from "components"
import { FormControl, InputLabel, NativeSelect, Select, MenuItem, makeStyles } from "@material-ui/core";
import BootstrapInput from "./input"
import { LARIAT } from "constants/index";
import { AppContext } from "contexts/AppContext";

let dataset = [
    {
        "Nitrogen": "12",
        "group": "banana",
        "normal": "1",
        "stress": "13",
    },
    {
        "Nitrogen": "6",
        "group": "poacee",
        "normal": "6",
        "stress": "33",
    },
    {
        "Nitrogen": "11",
        "group": "sorgho",
        "normal": "28",
        "stress": "12"
    },
    {    
        "Nitrogen": "19",
        "group": "triticum",
        "normal": "6",
        "stress": "1",
    }
]

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
      width: '25%',
    },
}));
  
function RightPanel(props){
    const classes = useStyles()
    const {dimensionSelected, setDimensionSelected, datavis, domain, subgroups} = useContext(AppContext)

    // useEffect(()=>{
    //     getDataForDrawing()
    // },[dimensionSelected, datavis])

    function onChangeDimension(e){
        setDimensionSelected(e.target.value)
        e.preventDefault()
    }

    return (
        <div className="col-9 h-100 pt-2">
            <h3>Visualización de Tweets en grupos seleccionados</h3>
            <div>
                <FormControl className={classes.margin}>
                    <InputLabel id="label-dimension">Selecciona una dimensión</InputLabel>
                    <Select 
                        labelId="label-dimension" 
                        id="select" 
                        value={dimensionSelected} 
                        input={<BootstrapInput />}
                        onChange={e => onChangeDimension(e)}
                    >
                        <MenuItem value={LARIAT.dimensions.time}>Tiempo</MenuItem>
                        <MenuItem value={LARIAT.dimensions.autor}>Autor</MenuItem>
                        <MenuItem value={LARIAT.dimensions.hashtags}>Hashtag</MenuItem>
                    </Select>
                </FormControl>
            </div>
            {/* <BarChart data={datatest}/> */}
            {dimensionSelected === LARIAT.dimensions.hashtags && <BarChartGroup data={datavis} domain={domain} subgroups={subgroups}/>}
            {dimensionSelected === LARIAT.dimensions.autor && <BarChartAuthor data={datavis} domain={domain} subgroups={subgroups}/>}
            {/* {dimensionSelected === LARIAT.dimensions.hashtags && <BarChartGroup data={dataset} />} */}
        </div>
    )
}

export default RightPanel