import { Users_Action } from '../constants/usersActions'
import ROOT_URL from '../constants/config';
export const GetPrivilegesofSpecificRole=(DistId,RoleId)=>dispatch=>{
var obj={"UserId":parseInt(DistId),"RoleId":RoleId}
    fetch(ROOT_URL+'/api/Privileges/GetPrivilegesofSpecificRole', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
     body: JSON.stringify(obj)
    }).then((response) => {
        console.log("required" + response.status)
        //console.log('********'+response.statusText);
        response.json().then(data => {
            //alert(data.userId);
            console.log("data:......" + data.status)
            if (data.getRolePrivilegesStatus === 'GetSuccess') {
               // console.log('auth')
            //    alert(data.rolePrivilegesList.length+"is eit role privilges list")
                return dispatch({ type: Users_Action.GETPRIVILEGE_OF_SPECIFICROLE,rolePrivilegesList:data.rolePrivilegesList });
            }
            else  {
                console.log('not auth')
              //  return dispatch({ type: Payment_Action.FAILED })
            }

        })
    })

}

export const updatePrivilegesofSpecificRole=(RoleName,RolePrivilegeIdList,selectedPrivileges,distId)=>dispatch=>{
    var obj={"RoleName":RoleName,"RolePrivilegeId":RolePrivilegeIdList,"selectedPrivileges":selectedPrivileges}
        fetch(ROOT_URL+'/api/Privileges/'+distId, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
            mode: 'cors',
         body: JSON.stringify(obj)
        }).then((response) => {
            console.log("required" + response.status)
            //console.log('********'+response.statusText);
            response.json().then(data => {
                if (data.updateRolePrivilegesStatus === 'UpdateSuccess') {
                    // console.log('auth')
                  //   alert(data.rolePrivilegesList.length+"is role privilges list")
                     return dispatch({ type: Users_Action.SHOWROLE,rolePrivilegesList:data.rolePrivilegesList });
                 }
                 else  {
                     console.log('not auth')
                   //  return dispatch({ type: Payment_Action.FAILED })
                 }
    
            })
        })
    
    }