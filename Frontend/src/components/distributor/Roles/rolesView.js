import React, { Component } from 'react'
import { Users_Action, Users_Status } from '../../../constants/usersActions'

import CreateRole from './createRole'
import ShowRole from './showRoles'
import { connect } from 'react-redux';
import DashboardDis from '../dashboard/dashboard'
import { AssignRolePrivileges, GetRolePrivileges } from '../../../actions/usersActions'
import { GetPrivilegesofSpecificRole, updatePrivilegesofSpecificRole } from '../../../actions/rolesActions'
const mapStateToProps = state => ({
    users_Status: state.users_Reducer.users_status,
    rolePrivilegesList: state.users_Reducer.rolePrivilegesList,
    specificrolePrivilegeList: state.users_Reducer.specificrolePrivilegeList
})
const mapDispatchToProps = (dispatch) => {
    return {
        createRole: () => { dispatch({ type: Users_Action.NEWRole }) },
        showRole: () => { dispatch({ type: Users_Action.SHOWROLE }) },
        AssignRolePrivileges: (RoleName, DistributorId, SelectedPrivilege) =>
            dispatch(AssignRolePrivileges(RoleName, DistributorId, SelectedPrivilege)),
        GetRolePrivileges: (DistributorId) => dispatch(GetRolePrivileges(DistributorId)),
        GetPrivilegesofSpecificRole: (DistId, RoleId) => dispatch(GetPrivilegesofSpecificRole(DistId, RoleId)),
        updatePrivilegesofSpecificRole: (RoleName, RolePrivilegeIdList, selectedPrivileges, distId) =>
            dispatch(updatePrivilegesofSpecificRole(RoleName, RolePrivilegeIdList, selectedPrivileges, distId))
    }
}
class RolesView extends React.Component {
    constructor(props) {
        super(props);

    }



    getScreen(status) {
        switch (status) {
            case Users_Status.NEWRole:
                //   alert(+"userId in roleview")
                return <CreateRole showRole={this.props.showRole}
                    AssignRolePrivileges={this.props.AssignRolePrivileges}
                    specificrolePrivilegeList={[]}//{this.props.specificrolePrivilegeList}
                    userId={this.props.match.params.userId} GetRolePrivileges={this.props.GetRolePrivileges} />
            case Users_Status.SHOWROLE:
                //  alert("show role component" + this.props.rolePrivilegesList.length)
                return <ShowRole createRole={this.props.createRole} rolePrivilegesList={this.props.rolePrivilegesList}
                    GetPrivilegesofSpecificRole={this.props.GetPrivilegesofSpecificRole}
                    userId={this.props.match.params.userId} />

            case Users_Status.GETPRIVILEGE_OF_SPECIFICROLE:
                // alert(this.props.specificrolePrivilegeList.length + "hahah")
                return <CreateRole showRole={this.props.showRole}
                    updatePrivilegesofSpecificRole={this.props.updatePrivilegesofSpecificRole}
                    specificrolePrivilegeList={this.props.specificrolePrivilegeList}
                    userId={this.props.match.params.userId} GetRolePrivileges={this.props.GetRolePrivileges} />
            default:

        }
    }
    render() {
        return (<div><DashboardDis getScreen={this.getScreen(this.props.users_Status)}
            getAction={this.getAction} /></div>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RolesView)