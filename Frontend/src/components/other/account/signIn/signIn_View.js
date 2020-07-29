import React, { Component } from 'react'
import { SignIn_Actions, SignIn_Status } from '../../../../constants/signInActions'
import SignIn from './signIn'
import { connect } from 'react-redux';
import { login } from '../../../../actions/signInActions'
import {withRouter} from 'react-router-dom'
const mapStateToProps = state => ({
    signIn_Status: state.signIn_Reducer.signIn_status,
    signIn_UserId:state.signIn_Reducer.signIn_UserId
})
const mapDipatchToProps = (dispatch) => {
    return {
        handleLogin: (username, password) => { dispatch(login(username, password)) }
    }
}
class SignInView extends Component {
    constructor(props) {
        super(props);
    }

    getScreen(status) {
        //console.log(status)
        switch (status) {
            case SignIn_Status.NEW:
                return (<SignIn handleLogin={this.props.handleLogin} />)
            case SignIn_Status.SUCCESS:
              console.log('success')
           //   alert("in sign in "+this.props.userId)
                 window.location.pathname==='/distributor/sigin'?this.props.history.push('/distributor/snd/dashboard/'+this.props.signIn_UserId):
                this.props.history.push('/admin/snd/dashboard')
                break;
            case SignIn_Status.FAILED:
            console.log('failed')
                return (<SignIn handleLogin={this.props.handleLogin}   serverResponse='NotExist'/>)
            default:
                break;
        }
    }
    render() {
        return (
            <div>{this.getScreen(this.props.signIn_Status)}</div>
        )
    }
}
export default connect(mapStateToProps, mapDipatchToProps)(withRouter(SignInView))