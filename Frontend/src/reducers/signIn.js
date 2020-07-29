import { SignIn_Action, SignIn_Status } from '../constants/signInActions'
const initialState = {
    signIn_status: SignIn_Status.NEW,
    signIn_UserId:0,
}
export default function (state = initialState, action) {

    switch (action.type) {
        case SignIn_Action.NEW:
            return { ...state, signIn_status: SignIn_Status.NEW }
        case SignIn_Action.AUTHORIZED:
        console.log('reducer success')
     
            return { ...state, signIn_status: SignIn_Status.SUCCESS,signIn_UserId:action.userId }
        case SignIn_Action.NOTAUTHORIZED:
        console.log('reducer not')
            return { ...state, signIn_status: SignIn_Status.FAILED }
        case SignIn_Action.SUCCESS:
            return { ...state, signIn_status: SignIn_Status.SUCCESS }
        default:
            return { ...state }
    }
}