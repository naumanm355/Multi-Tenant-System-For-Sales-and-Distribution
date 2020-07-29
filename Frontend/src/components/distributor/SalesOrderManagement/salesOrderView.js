import React, { Component } from 'react';
import { Order_Action, Order_Status } from '../../../constants/salesOrderManagement'
import { getSalesOrders } from '../../../actions/salesOrderAction';
import ShowOrders from './showSalesOrders';
import { connect } from 'react-redux';
import DashboardDis from '../dashboard/dashboard';

const mapStateToProps = state => {
    //alert("map state"+JSON.stringify(state.order_Reducer.orders))
    return {
        ordersList: state.order_Reducer.orders,
        order_status: state.order_Reducer.order_status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSalesOrders: (DistId) => { dispatch(getSalesOrders(DistId)) },
    }
}




class SalesOrderView extends Component {

    constructor(props) {
        super(props)
    }

    getScreen(status) {
        switch (status) {
            case Order_Status.SHOW:
                //alert("i m in ordes's show view "+JSON.stringify(this.props.ordersList))                               
                return <ShowOrders orders={this.props.ordersList} DistId={this.props.match.params.userId} getSalesOrders={this.props.getSalesOrders} />
            default:
        }
    }

    render() {
        return (
            <DashboardDis getScreen={this.getScreen(this.props.order_status)} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesOrderView)