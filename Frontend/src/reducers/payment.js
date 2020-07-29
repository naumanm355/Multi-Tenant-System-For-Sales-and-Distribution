import {Payment_Action,Payment_Status} from '../constants/paymentActions'
const initialState={
    payment_status:Payment_Status.NEW
}
export default function(state=initialState,action){
    switch (action.type) {
        case Payment_Action.NEW:
            return {...state,payment_status:Payment_Status.NEW}
        case Payment_Action.SUCCESS:
    //    alert("distributor registered success")
            return {...state,payment_status:Payment_Status.PAYMENT}
        case Payment_Action.PAYMENT:
                return {...state,payment_status:Payment_Status.PAYMENT}
    
        default:
        return {...state}
           
    }
}