import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import decode from 'jwt-decode';

import { Page } from '../../components/page/Page';
import { FlatButton } from '../../components/flatbutton/FlatButton';
import Input from '../../components/input/Input';
import * as actions from '../../store/actions';
import extProviderConfig from '../../store/extProviderConfig';
import { validate } from '../../components/validate';

class Login extends Component {
    state = {
        login: {
            value: "",
            validation: {
                isRequired: true,
                isEmail: true,
            },
            valid: false,
            changed: false,
        },
        password: {
            value: "",
            validation: {
                isRequired: true,
                hasUpper: true,
                hasLower: true,
                hasNumbers: true,
                hasSpecials: true,
            },
            valid: false,
            changed: false,
        },
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
    inputChangedHandler = (event) => {
        const control = this.state[event.target.id];
        control.valid = validate(event.target.value, control.validation);
        control.value = event.target.value;
        control.changed = true;
        this.setState({ [event.target.id]: control });
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.login.value, this.state.password.value);
    }
    render() {
        return (
            <Page>
                <form onSubmit={this.submitHandler}>
                    <Input
                        placeholder="Login"
                        id="login"
                        value={this.state.login.value}
                        onChange={this.inputChangedHandler}
                        changed={this.state.login.changed}
                        valid={this.state.login.valid}
                    />
                    <Input
                        placeholder="password"
                        type="password"
                        id="password"
                        value={this.state.password.value}
                        onChange={this.inputChangedHandler}
                        changed={this.state.password.changed}
                        valid={this.state.password.valid}
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
