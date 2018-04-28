import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import decode from 'jwt-decode';

import { Page } from '../../components/page/Page';
import { FlatButton } from '../../components/flatbutton/FlatButton';
import Input from '../../components/input/Input';
import * as actions from '../../store/actions';
import extProviderConfig from '../../store/extProviderConfig';

class Login extends Component {
    state = {
        login: "",
        password: "",
    }
    onGoogleSuccess = (response) => {
        const token = response.tokenObj.id_token;
        const tokenData = decode(token);
        if (tokenData.azp === extProviderConfig.google.clientId) {
            this.setState({ googleToken: token, email: { value: tokenData.email } });
            this.props.onExtLogin({ token });
        }
    };
    onGoogleError = error => console.log(error);
    inputChangedHandler = (event, control) => {
        this.setState({
            ...this.state,
            [control]: event.target.value,
        });
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
                        onChange={event => this.inputChangedHandler(event, "login")}
                    />
                    <Input
                        placeholder="password"
                        type="password"
                        id="password"
                        value={this.state.password}
                        onChange={event => this.inputChangedHandler(event, "password")}
                    />
                    <FlatButton type="submit">Login</FlatButton><br />
                </form>
                <GoogleLogin
                    buttonText="Login with Google"
                    onSuccess={this.onGoogleSuccess}
                    onFailure={this.onGoogleFailure}
                    clientId={extProviderConfig.google.clientId}
                />
            </Page >
        );
    }
}
const mapStateToProps = state => (
    {
        user: state.user,
        token: state.token,
    }
);
const mapDispatchToProps = dispatch => (
    {
        onAuth: (email, password) =>
            dispatch(actions.login(email, password)),
        onExtLogin: data => dispatch(actions.externalLogin(data)),
    }
);
export default connect(mapStateToProps, mapDispatchToProps)(Login);
