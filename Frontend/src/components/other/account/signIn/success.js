import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class RegisterSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {
        this.props.history.push('/')
    }
    render() {
        return (
          <div>
            <h1>You have been registered successfully</h1>
            <button onClick={this.handleClick}>Login</button>
            </div>
        );
    }
}



export default withRouter(RegisterSuccess);
