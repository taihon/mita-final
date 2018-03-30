import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { Page } from '../components/page/Page';
import Input from '../components/input/Input';
import * as actions from '../store/actions';

class Login extends Component {
    state = {
        login: "",
        password: ""
    }
    inputChangedHandler = (event, control) => {
        this.setState({
            ...this.state,
            [control]: event.target.value
        })
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.login, this.state.password);
    }
    render() {
        return (
            <Page>
                <form onSubmit={this.submitHandler}>
                    <Input
                        placeholder="Login"
                        id="login"
                        value={this.state.login}
                        onChange={(event) => this.inputChangedHandler(event, "login")} />
                    <Input
                        placeholder="password"
                        type="password"
                        id="password"
                        value={this.state.password}
                        onChange={(event) => this.inputChangedHandler(event, "password")} />
                    <button type="submit">Login</button><br />
                    <button>Login external</button>
                </form>
            </Page >
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.user,
        token: state.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.login(email, password))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);