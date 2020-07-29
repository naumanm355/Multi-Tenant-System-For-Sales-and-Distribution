import { Users_Action } from '../constants/usersActions'
import ROOT_URL from '../constants/config';
export const AssignRolePrivileges = (RoleName, DistributorId, SelectedPrivilege) => dispatch => {
    var rolePrivilege = {
        'RoleName': RoleName, 'distId': parseInt(DistributorId),
        'selectedPrivileges': SelectedPrivilege
    }
    // alert(SelectedPrivilege.length)
    fetch(ROOT_URL+'/api/Privileges/AssignPrivilege', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
        body: JSON.stringify(rolePrivilege)
    }).then((response) => {
        console.log("required" + response.status)
        //console.log('********'+response.statusText);
        response.json().then(data => {
            //alert(data.userId);
            console.log("data:......" + data.status)
            if (data.assignRolePrivilegesStatus === 'Success') {
                console.log('auth')
                //   alert(data.rolePrivilegesList.length+"is role privilges list")
                return dispatch({ type: Users_Action.SHOWROLE, rolePrivilegesList: data.rolePrivilegesList });
            }
            else {
                console.log('not auth')
                //  return dispatch({ type: Payment_Action.FAILED })
            }

        })
    })
}

export const GetRolePrivileges = (DistributorId) => dispatch => {

    fetch(ROOT_URL+'/api/Privileges/' + DistributorId, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
        //  body: JSON.stringify(rolePrivilege)
    }).then((response) => {
        console.log("required" + response.status)
        //console.log('********'+response.statusText);
        response.json().then(data => {
            //alert(data.userId);
            console.log("data:......" + data.status)
            if (data.getRolePrivilegesStatus === 'GetSuccess') {
                // console.log('auth')
                //   alert(data.rolePrivilegesList.length+"is role privilges list")
                return dispatch({ type: Users_Action.SHOWROLE, rolePrivilegesList: data.rolePrivilegesList });
            }
            else {
                console.log('not auth')
                //  return dispatch({ type: Payment_Action.FAILED })
            }

        })
    })
}


export const FetchRolesbyDistributor = (DistributorId) => dispatch => {
    //alert(DistributorId+"in api")
    var rolePrivilege = { 'DistId': parseInt(DistributorId) }
    fetch(ROOT_URL+'/api/Users/RolebyDistributor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
        body: JSON.stringify(rolePrivilege)
    }).then((response) => {
        console.log("required" + response.status)
        //console.log('********'+response.statusText);
        response.json().then(data => {
            //alert(data.userId);
            console.log("data:......" + data.status)
            if (data.getRoleStatus === 'GetSuccess') {

                //  alert(data.rolesList.length+"is roles list")
                return dispatch({ type: Users_Action.NEW, rolesList: data.rolesList });
            }
            else {
                console.log('not auth')
                //  return dispatch({ type: Payment_Action.FAILED })
            }

        })
    })
}


export const AssignUsertoRole = (userDetail, DistId) => dispatch => {
    // alert(DistId+"in api before hit"
    // )
    var user = {
        'FirstName': userDetail.FirstName, "LastName": userDetail.LastName,
        "Email": userDetail.Email, "Contact": userDetail.Contact,
        "Address": userDetail.Address, "RoleName": userDetail.RoleName, 'DistId': parseInt(DistId)
    }
    fetch(ROOT_URL+'/api/Users/CreateUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
        body: JSON.stringify(user)
    }).then((response) => {
        console.log("required" + response.status)
        //console.log('********'+response.statusText);
        response.json().then(data => {
            //alert(data.userId);
            console.log("data:......" + data.UserStatus)
            if (data.userStatus === 'UserRegisteredSuccess') {
                console.log('auth')
                //    alert("userRole list "+data.usersList.length)
                return dispatch({ type: Users_Action.SHOW, usersList: data.usersList });
            }
            else {
                console.log('not auth')
                //    return dispatch({ type: Payment_Action.FAILED })
            }

        })
    })
}


export const GetUsertoRole = (DistId) => dispatch => {
    //  alert(DistId+"in api before hit"
    //  )
    var user = {
        'DistId': parseInt(DistId)
    }
    fetch(ROOT_URL+'/api/Users/GetUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
        body: JSON.stringify(user)
    }).then((response) => {
        console.log("required" + response.status)
        //console.log('********'+response.statusText);
        response.json().then(data => {
            //alert(data.userId);
            console.log("data:......" + data.UserStatus)
            if (data.userStatus === 'GetSuccess') {
                console.log('auth')
                // alert("userRole list "+data.usersList.length)
                return dispatch({ type: Users_Action.SHOW, usersList: data.usersList });
            }
            else {
                console.log('not auth')
                //    return dispatch({ type: Payment_Action.FAILED })
            }

        })
    })
}


export const DeleteUsertoRole = (UserId, DistId) => dispatch => {
    //  alert(DistId+"in api before delete hit"
    // )
    var user = {
        'UserId': UserId, 'DistId': DistId
    }
    fetch(ROOT_URL+'/api/Users/DeleteUser', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
        body: JSON.stringify(user)
    }).then((response) => {
        console.log("required" + response.status)
        //console.log('********'+response.statusText);
        response.json().then(data => {
            //alert(data.userId);
            console.log("data:......" + data.UserStatus)
            if (data.userStatus === 'DeleteSuccess') {
                console.log('auth')
                //    alert("userRole list "+data.usersList.length)
                return dispatch({ type: Users_Action.SHOW, usersList: data.usersList });
            }
            else {
                console.log('not auth')
                //    return dispatch({ type: Payment_Action.FAILED })
            }

        })
    })
}


export const GetUsertoRolebyId = (UserId) => dispatch => {
    // alert(UserId+"in api get specific before get hit")

    fetch(ROOT_URL+'/api/Users/' + UserId, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
        // body: JSON.stringify(user)
    }).then((response) => {
        console.log("required" + response.status)
        //console.log('********'+response.statusText);
        response.json().then(data => {
            //alert(data.userId);
            console.log("data:......" + data.userStatus)
            if (data.userStatus === 'GetSpecificcSuccess') {
                console.log('auth')
                //   alert("userdetail "+data.userDetail.user.firstName)
                return dispatch({ type: Users_Action.GETSPECIFICUSER, userDetail: data.userDetail });
            }
            else {
                console.log('not auth')
                //    return dispatch({ type: Payment_Action.FAILED })
            }

        })
    })
}

export const UpdateUsertoRole = (userObj, DistId, RoleId) => dispatch => {
    //    alert(DistId+"in api before delete hit"
    //  )
    var user = {
        'FirstName': userObj.FirstName, 'LastName': userObj.LastName, 'LastName': userObj.LastName,
        'Email': userObj.Email, 'Contact': userObj.Contact, 'Address': userObj.Address,
        'Password': userObj.Password, 'UserId': userObj.UserId, 'RoleName': userObj.RoleName,
        'DistId': parseInt(DistId), 'RoleId': RoleId
    }
    fetch(ROOT_URL+'/api/Users/' + userObj.UserId, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        mode: 'cors',
        body: JSON.stringify(user)
    }).then((response) => {
        console.log("required" + response.status)
        //console.log('********'+response.statusText);
        response.json().then(data => {
            //alert(data.userId);
            console.log("data:......" + data.UserStatus)
            if (data.userStatus === 'UpdateSuccess') {
                console.log('auth')
                //  alert("userRole list "+data.usersList.length)
                return dispatch({ type: Users_Action.SHOW, usersList: data.usersList });
            }
            else {
                console.log('not auth')
                //    return dispatch({ type: Payment_Action.FAILED })
            }

        })
    })
}