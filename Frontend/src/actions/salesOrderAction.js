import { Order_Action, Order_Status } from '../../src/constants/salesOrderManagement';
import ROOT_URL from '../constants/config';
export const getSalesOrders = (DistId) => dispatch => {
    //alert("call")
    var postData = {
        'DistributorId': parseInt(DistId)
    }

    fetch(ROOT_URL+'/api/AgentCustomers/GetDistAgentwithCustomer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
        body: JSON.stringify(postData)
    }).then((response) => {
        console.log(response.status + "response");
        console.log("i'm in getOrdersDetails action")
        response.json().then(data => {
            // alert("i m in getsalesorder")
            console.log(data.distributorAgentCustomerDetailStatus)
            if (data.distributorAgentCustomerDetailStatus == 'GetSuccess') {
                return dispatch({ type: Order_Action.SHOW, payload: data.distributorAgentCustomerDetailList })
            }
        })
    })
}
