import { SaleOrder_Action, SaleOrder_Status } from '../constants/saleOrderActions'

const initialState = {
    saleorder_status: SaleOrder_Status.NEW,
    distributorUsersList: [],
    agentOfCustomerLists: []
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SaleOrder_Action.NEW:
            return { ...state, saleorder_status: SaleOrder_Status.NEW, distributorUsersList: action.distributorUsersList }
        case SaleOrder_Action.SHOWAGENTCUST:
            console.log("Action Show Map")
            return {
                ...state, saleorder_status: SaleOrder_Status.SHOWAGENTCUST,
                agentOfCustomerLists: action.specificAgentOfCustomersList
            }
        default:
            return { ...state }
    }
}