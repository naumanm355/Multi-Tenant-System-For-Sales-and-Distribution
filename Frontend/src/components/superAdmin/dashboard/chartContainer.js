import React,{Component} from 'react'
import ProfitChart from './columnChartProfit'
import Grid from '@material-ui/core/Grid';
import RevenueChart from './columnChartRevenue'
import UnitSoldChart from './unitSoldChart'
class ChartContainer extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        const lst=[
            <RevenueChart />,<ProfitChart />,<UnitSoldChart />
        ]
      const  chartList=lst.map((chart,index)=><Grid item lg={4} md={4}  sm={index==2?12:6}
      xs={12}>{chart}</Grid>)
        return(
<Grid container spacing={2}  style={{marginTop:80}} justify="center" alignItems="center">
{chartList}
</Grid>
        )
    }
}
export default ChartContainer