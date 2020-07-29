import React, { Component } from "react";
import { connect } from "react-redux";
import { Payment_Action, Payment_Status } from '../../../constants/paymentActions'
import CheckOut from './checkOut'
import DistributorSignUp from './registeration'
import PaymentForm from './payment'
import {signUpDistributor} from '../../../actions/signUpActions'
const mapStateToProps = (state) => {
    return {
        payment_status: state.payment_Reducer.payment_status
    }
}

const mapDispatchToProps = dispatch => ({
    handlePayemntMethod: () => dispatch({ type: Payment_Action.PAYMENT }),
   
    handleSuccess: () => dispatch({ type: Payment_Action.SUCCESS }),
    
    signUpDistributor:(disDetail)=>dispatch(signUpDistributor(disDetail)),
    // handleShowSignup: ()=>dispatch({type: account_Actions.SIGNUPSHOW})
})

class paymentView extends Component {
    constructor(props) {
        super(props);
    }

    getscreen(componentstatus) {
        switch (componentstatus) {
            case Payment_Status.NEW:
                return <DistributorSignUp 
                    signUpDistributor={this.props.signUpDistributor}/>
            case Payment_Status.PAYMENT:
                return <PaymentForm/>
            case Payment_Status.SUCCESS:
                return <CheckOut handlePayemntMethod={this.props.handlePayemntMethod}
                    handleSuccess={this.props.handleSuccess} 
                    signUpDistributor={this.props.signUpDistributor}/>

        }
    }

    render() {
        return (<div>
            {this.getscreen(this.props.payment_status)}
        </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(paymentView)