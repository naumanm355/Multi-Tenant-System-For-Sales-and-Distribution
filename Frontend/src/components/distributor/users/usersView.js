import React,{Component} from 'react'
import {Users_Action,Users_Status} from '../../../constants/usersActions'
import {AssignUsertoRole,GetUsertoRole,DeleteUsertoRole,GetUsertoRolebyId,
    UpdateUsertoRole} from '../../../actions/usersActions'
import ShowUsers from './showUsers'
import CreateUser from './createUsers'
import { connect } from 'react-redux';
import DashboardDis from '../dashboard/dashboard'


const mapStateToProps=state=>({
users_Status:state.users_Reducer.users_status,
rolesList:state.users_Reducer.rolesList,
usersList:state.users_Reducer.usersList,
specificUser:state.users_Reducer.specificUser
})
const mapDispatchToProps=(dispatch)=>{
    return{
        createUser:()=>{dispatch({type:Users_Action.NEW})},
        showUser:()=>{dispatch({type:Users_Action.SHOW})},
        AssignUsertoRole:(objDetail,DistId)=>dispatch( AssignUsertoRole(objDetail,DistId)),
        GetUsertoRole:(DistId)=>dispatch( GetUsertoRole(DistId)),
        DeleteUsertoRole:(UserId,DistId)=>dispatch( DeleteUsertoRole(UserId,DistId)),
        GetUsertoRolebyId:(UserId)=>dispatch( GetUsertoRolebyId(UserId)),
        UpdateUsertoRole:(userObj,DistId,RoleId)=>dispatch( UpdateUsertoRole(userObj,DistId,RoleId))
    }
}
class UsersView extends React.Component{
constructor(props){
    super(props);
    
}



getScreen(status){
    switch (status) {
        case Users_Status.SHOW:
        //alert("component userlist is"+this.props.usersList.length)
       return     <ShowUsers createUser={this.props.createUser} 
       DistId={this.props.match.params.userId} 
       usersList={this.props.usersList} DeleteUsertoRole={this.props.DeleteUsertoRole}
       GetUsertoRolebyId={this.props.GetUsertoRolebyId}
       />
       case Users_Status.NEW:
      // alert(this.props.rolesList.length+"in new component")
       return     <CreateUser showUser={this.props.showUser} rolesList={this.props.rolesList}
       AssignUsertoRole={this.props.AssignUsertoRole} 
       DistId={this.props.match.params.userId}
       GetUsertoRole={this.props.GetUsertoRole}
       />
       case Users_Status.GETSPECIFICUSER:
     //  alert(this.props.rolesList.length+"in GETSPECIFICUSER component")
     //  alert(this.props.specificUser.user.firstName+"user detail")
       return     <CreateUser showUser={this.props.showUser} rolesList={this.props.rolesList}
       UpdateUsertoRole={this.props.UpdateUsertoRole} 
       DistId={this.props.match.params.userId}
       GetUsertoRole={this.props.GetUsertoRole}
       userDetail={this.props.specificUser}
       
       />
    default:
        
    }
}
render(){
    return(<div><DashboardDis getScreen={this.getScreen(this.props.users_Status)} 
    getAction={this.getAction} /></div>)
}
}

export default connect(mapStateToProps,mapDispatchToProps)(UsersView)