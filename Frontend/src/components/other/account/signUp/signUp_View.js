import React,{Component} from 'react'
import {SignIn_Actions,SignIn_Status} from '../../../../actions/signInActions'
import SignIn from './signIn'
import { connect } from 'react-redux';
mapStateToProps=state=>({
signIn_Status:state.packages_Reducer.signIn_status
})
class SignUpView extends React.Component{
constructor(){
    super(props);
}

getScreen(status){
    switch (status) {
        case SignIn_Status.NEW:
       return     <SignIn />
            break;
    
        default:
            break;
    }
}
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUpView)