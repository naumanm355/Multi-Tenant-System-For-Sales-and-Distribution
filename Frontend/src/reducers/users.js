import {Users_Action,Users_Status} from '../constants/usersActions'
const initialState={
    users_status:Users_Status.SHOW,
    rolesList:[],
    usersList:[],
    specificUser:{},
    rolePrivilegesList:[],
    specificrolePrivilegeList:[]
}
export default function(state=initialState,action){
    switch (action.type) {
        case Users_Action.NEW:
        return {...state,users_status:Users_Status.NEW,rolesList:action.rolesList}
        case Users_Action.SHOW:
      //  alert("in reducer"+action.usersList.length)
        return {...state,users_status:Users_Status.SHOW,usersList:action.usersList}
        case Users_Action.GETSPECIFICUSER:
       // alert("in reducer"+action.userDetail.user.firstName)
        return {...state,users_status:Users_Status.GETSPECIFICUSER,specificUser:action.userDetail}
        case Users_Action.LOADNEW:
       // alert('in new load')

        
        case Users_Action.NEWRole:
        return {...state,users_status:Users_Status.NEWRole}
        case Users_Action.SHOWROLE:
      //  alert("in show role reducer "+action.rolePrivilegesList.length)
        return {...state,users_status:Users_Status.SHOWROLE,rolePrivilegesList:action.rolePrivilegesList}
        case Users_Action.GETPRIVILEGE_OF_SPECIFICROLE:
       // alert("in show GETPRIVILEGE_OF_SPECIFICROLE reducer "+action.rolePrivilegesList.length)
        return {...state,users_status:Users_Status.GETPRIVILEGE_OF_SPECIFICROLE,specificrolePrivilegeList:action.rolePrivilegesList}
        default:
        return {...state}
           
    }
}