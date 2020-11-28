import BarChart from "./bar-chart"

const datatest = [
    { genre: 'A', revenue: 5 },
    { genre: 'B', revenue: 4 },
    { genre: 'C', revenue: 9 },
    { genre: 'D', revenue: 2 },
    { genre: 'E', revenue: 7 },
]
  
function RightPanel(props){
    return (
        <div className="col-9 h-100">
            <BarChart data={datatest}/>
        </div>
    )
}

export default RightPanel