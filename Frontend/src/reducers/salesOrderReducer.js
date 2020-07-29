import { Order_Action, Order_Status } from '../constants/salesOrderManagement';

const initialState = {
    order_status: Order_Status.SHOW,
    orders: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case Order_Action.SHOW:
            // alert("i m in order show reducer")
            return { ...state, order_status: Order_Status.SHOW, orders: action.payload }
        default:
            return state;
    }
}