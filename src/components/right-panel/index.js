import { useContext} from "react";
import {BarChart, BarChartAuthor, BarChartGroup, ScatterPlotTime} from "components"
import { FormControl, InputLabel,Select, MenuItem, makeStyles } from "@material-ui/core";
import BootstrapInput from "./input"
import { LARIAT } from "constants/index";
import { AppContext } from "contexts/AppContext";
import VisTweetsPagination from "./vis-tweets-pagination";

const useStyles = makeStyles((theme) => ({
    margin: {
    //   margin: theme.spacing(1),
      width: '25%',
    },
    dimensionContainer: {
        height: '50px',
        minWidth: '100px',
        paddingTop: 2,
        paddingBottom: 2,
    },
    formContainer: {
        height: '50px',
        minWidth: 150,
    },
    elements: {
        width: "200px",
        minWidth: "150px"
    }
}));
  
function RightPanel(props){
    const classes = useStyles()
    const {dimensionSelected, setDimensionSelected, datavis, domain, subgroups, keywordsFilter} = useContext(AppContext)

    function onChangeDimension(e){
        setDimensionSelected(e.target.value)
        e.preventDefault()
    }

    return (
        <div className="col-9 h-100 pt-2">
            <div className="row mh-100">
                <div className="col-8 mh-100">
                    <h3 className="text-center">Visualización de Tweets en grupos seleccionados</h3>
                    <div className={classes.dimensionContainer}>
                        <FormControl className={classes.formContainer}>
                            <InputLabel id="label-dimension" className={classes.elements} >Selecciona una dimensión</InputLabel>
                            <Select 
                                labelId="label-dimension" 
                                id="select" 
                                value={dimensionSelected} 
                                input={<BootstrapInput />}
                                onChange={e => onChangeDimension(e)}
                                className={classes.elements}
                                autoWidth
                            >
                                <MenuItem value={LARIAT.dimensions.time}>Tiempo</MenuItem>
                                <MenuItem value={LARIAT.dimensions.autor}>Autor</MenuItem>
                                <MenuItem value={LARIAT.dimensions.hashtags}>Hashtag</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    {dimensionSelected === LARIAT.dimensions.hashtags && <BarChartGroup data={datavis} domain={domain} subgroups={subgroups}/>}
                    {dimensionSelected === LARIAT.dimensions.autor && <BarChartAuthor data={datavis} domain={domain} subgroups={subgroups}/>}
                    {dimensionSelected === LARIAT.dimensions.time && <ScatterPlotTime data={datavis} /> }
                     {/* <BarChart data={datatest}/>  */}
                </div>
                <div className="col-4 mh-100">
                    <h5 className="text-center">Tweets</h5>
                    <VisTweetsPagination/>
                </div>
            </div>
            
        </div>
    )
}

export default RightPanel