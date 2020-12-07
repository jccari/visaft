import { useContext, useEffect } from "react";
import {BarChart, BarChartAuthor, BarChartGroup} from "components"
import { FormControl, InputLabel, NativeSelect, Select, MenuItem, makeStyles } from "@material-ui/core";
import BootstrapInput from "./input"
import { LARIAT } from "constants/index";
import { AppContext } from "contexts/AppContext";
import Test from "./table-pagination";

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
            {dimensionSelected === LARIAT.dimensions.hashtags && <BarChartGroup data={datavis} domain={domain} subgroups={subgroups}/>}
            {dimensionSelected === LARIAT.dimensions.autor && <BarChartAuthor data={datavis} domain={domain} subgroups={subgroups}/>}
            {/* {dimensionSelected === LARIAT.dimensions.hashtags && <BarChartGroup data={dataset} />}
            {/* <BarChart data={datatest}/> */}
        </div>
    )
}

export default RightPanel