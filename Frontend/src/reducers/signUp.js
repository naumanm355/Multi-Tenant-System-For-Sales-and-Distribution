import {SignUp_Action,SignUp_Status} from '../constants/signUpActions'
const initialState={
    signUp_status:SignUp_Status.NEW
}
export default function(state=initialState,action){
    switch (action.type) {
        case SignUp_Action.NEW:
        return {...state,signUp_status:SignUp_Status.NEW}
        case SignUp_Action.SUCCESS:
        return {...state,signUp_status:SignUp_Status.SUCCESS}
           
    
        default:
        return {...state}
           
    }
}