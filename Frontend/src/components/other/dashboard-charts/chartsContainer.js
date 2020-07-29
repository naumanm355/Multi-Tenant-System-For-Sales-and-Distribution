import RevenueChart from './revenueChart.js';
import ProfitChart from './profitChart.js';
import SoldUnitsChart from './soldUnitsChart.js';
import Grid from '@material-ui/core/Grid';
import OrdersSummaryByPercentage from './ordersSummaryByPercentage.js';
import IncomingPurchaseOrder from './incomingPurchaseOrder.js';
import OrdersShipment from './ordersShipment.js';
import OverdueShipments from './overdueShipment.js';
import OverdueInvoices from './overdueInvoices.js';
import React,{Component} from 'react'
export default class ChartsContainer extends React.Component{
    constructor(props){
        super(props);

    }
    
    render(){
        const chartsList=[<RevenueChart />,<ProfitChart />,<SoldUnitsChart />,<OrdersSummaryByPercentage />,
            <IncomingPurchaseOrder />,<OrdersShipment />,<OverdueShipments />,<OverdueInvoices />]
const charts=chartsList.map((chart)=>
<Grid item lg={4}>{chart}</Grid>)
            return(
            <Grid container spacing={2} style={{marginTop:100}}>
         {charts}
            </Grid>
        )
    }
}