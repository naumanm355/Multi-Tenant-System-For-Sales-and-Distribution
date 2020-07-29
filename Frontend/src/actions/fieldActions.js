import { SaleOrder_Action } from '../constants/saleOrderActions'
import ROOT_URL from '../constants/config';
// Post customer of specific agent
export const postAgentCustomer = (distId, custId, saleAgentId, StartDay, EndDay) => dispatch => {

    //alert("so length is "+JSON.stringify(custId))
    var agentCust = {
        'distId': parseInt(distId), 'customerNameList': custId, 'saleAgentName': saleAgentId,
        'startDate': '2019-02-02', 'endDate': '2019-02-02'
    }
    fetch(ROOT_URL+'/api/AgentCustomers/CreateAgentJourneyPlan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
        body: JSON.stringify(agentCust)
    }).then((response) => {
        console.log("required" + response.status)
        response.json().then(data => {
            console.log("data:......" + data.status)
            if (data.agentJourneyPlanStatus === 'SaveSucess') {
                // console.log('auth')
                //   alert(data.rolePrivilegesList.length+"is role privilges list")
                // return dispatch({ type: SaleOrder_Action.NEW });

                return dispatch({
                    type: SaleOrder_Action.SHOWAGENTCUST,
                    specificAgentOfCustomersList: data.distributorAgentCustomerDetailList
                });

            }
            else {
                console.log('Try Again')
                //  return dispatch({ type: Payment_Action.FAILED })
            }

        })
    })
}

//Get customers of specific agent
export const getCustomerOfAgent = (distId) => dispatch => {
    var postData = {
        'DistributorId': parseInt(distId)
    }

    fetch(ROOT_URL+'/api/AgentCustomers/GetDistAgentwithCustomer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
        body: JSON.stringify(postData)
    }).then((response) => {
        console.log("required hvhvgv" + JSON.stringify(response))
        response.json().then(data => {

            if (data.distributorAgentCustomerDetailStatus === 'GetSuccess') {
                //alert(data.distributorAgentCustomerDetailList);

                return dispatch({
                    type: SaleOrder_Action.SHOWAGENTCUST,
                    specificAgentOfCustomersList: data.distributorAgentCustomerDetailList
                });
            }
            else {
                console.log('Try Again')
            }
        })
    })
}

// Fetch all Agents and Customers
export const fetchDistributoAgentCustomer = (distId) => dispatch => {
    const getData = fetch(ROOT_URL+'/api/AgentCustomers/' + distId, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
    }).then((response) => {
        console.log(response.status);
        if (response.status == 404) {
            //alert("Server Error. Not Found!");
        } else {
            response.json().then(data => {
                console.log(data.distributorUsersList.length);
                if (data.distributorUsersStatus == "GetSuccess") {
                    return dispatch({
                        type: SaleOrder_Action.NEW,
                        distributorUsersList: data.distributorUsersList
                    })
                } else {
                    console.log("Failed...");
                }
            })
        }
    })
}