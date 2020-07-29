import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SaleOrder_Action, SaleOrder_Status } from '../../../constants/saleOrderActions'
import Map from './googleMap'
import DashboardDis from '../dashboard/dashboard'
import AssignLocation from './assignLocation'
import { fetchDistributoAgentCustomer, postAgentCustomer, getCustomerOfAgent } from '../../../actions/fieldActions'
import ShwAgentCustomer from './showAgentCustomer'
const mapStateToProps = (state) => {
    return {
        saleorder_status: state.saleOrder_Reducer.saleorder_status,
        distributorUsersList: state.saleOrder_Reducer.distributorUsersList,
        agentOfCustomerLists: state.saleOrder_Reducer.agentOfCustomerLists,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        showAgeCustomer: () => { dispatch({ type: SaleOrder_Action.SHOWAGENTCUST }) },
        getCustomerOfAgent: (distId) => { dispatch(getCustomerOfAgent(distId)) },
        fetchDistributoAgentCustomer: (distId) => { dispatch(fetchDistributoAgentCustomer(distId)) },
        postAgentCustomer: (distId,custId, saleAgentId, StartDay, EndDay) => { dispatch(postAgentCustomer(distId,custId, saleAgentId, StartDay, EndDay)) }
    }/////distId, custId, saleAgentId, StartDay, EndDay
}

class SaleOrderView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            agentList: [],
            customerList: []
        }
    }
    componentWillMount() {
        //getting all customers and agents
        //this.props.fetchDistributoAgentCustomer(this.props.match.params.distId);

    }
    getscreen(componentstatus) {
        // alert(this.props.distributorUsersList.length)
        console.log("Length is " + this.props.agentOfCustomerLists.length);
        switch (componentstatus) {
            case SaleOrder_Status.NEW:

                return <AssignLocation
                    showAgeCustomer={this.props.showAgeCustomer}
                    postAgentCustomer={this.props.postAgentCustomer}
                    agentList={this.state.agentList}
                    customerList={this.state.customerList}
                    // getCustomerOfAgent={this.props.getCustomerOfAgent}
                    distributorUsersList={this.props.distributorUsersList}
                    disId={this.props.match.params.userId}
                />
            case SaleOrder_Status.SHOWAGENTCUST:
                console.log("SHow agent customer")
                return <ShwAgentCustomer agentOfCustomerLists={this.props.agentOfCustomerLists} />
                break;
            default:
        }
    }

    render() {
        this.props.distributorUsersList.map(item => {
            if (item.roleName == "customer") {
                this.state.customerList.push({ Name: item.userInfo.firstName + " " + item.userInfo.lastName });
            }
            else if (item.roleName == "sale agent") {
                this.state.agentList.push({ Name: item.userInfo.firstName + " " + item.userInfo.lastName })
            }
        })
        return (<div><DashboardDis getScreen={this.getscreen(this.props.saleorder_status)} /></div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SaleOrderView)