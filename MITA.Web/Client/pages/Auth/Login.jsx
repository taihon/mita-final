import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import decode from 'jwt-decode';

import { Page } from '../../components/page/Page';
import { FlatButton } from '../../components/flatbutton/FlatButton';
import Input from '../../components/input/Input';
import * as actions from '../../store/actions';
import extProviderConfig from '../../store/extProviderConfig';
import { validate, validateFormInState } from '../../components/validate';

class Login extends Component {
    state = {
        login: {
            value: "",
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            changed: false,
        },
        password: {
            value: "",
            validation: {
                required: true,
                hasUpper: true,
                hasLower: true,
                hasNumbers: true,
                hasSpecials: true,
            },
            valid: false,
            changed: false,
        },
        formIsValid: false,
    }
    onGoogleSuccess = (response) => {
        const token = response.tokenObj.id_token;
        const tokenData = decode(token);
        if (tokenData.azp === extProviderConfig.google.clientId) {
            this.setState({ googleToken: token, email: { value: tokenData.email } });
            this.props.onExtLogin({ token }, this.successfulLoginCallback);
        }
    };
    onGoogleError = error => console.log(error);
    inputChangedHandler = (event) => {
        const control = this.state[event.target.id];
        control.valid = validate(event.target.value, control.validation);
        control.value = event.target.value;
        control.changed = true;
        const formIsValid = validateFormInState(this.state);
        this.setState({ [event.target.id]: control, formIsValid });
    }
    successfulLoginCallback = () => {
        this.props.history.push("/projects");
    }
    submitHandler = (event) => {
        event.preventDefault();
        const { login: { value: login },
            password: { value: password } } = this.state;
        this.props.onAuth(login, password, this.successfulLoginCallback);
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
                    <FlatButton type="submit" disabled={!this.state.formIsValid}>Login</FlatButton><br />
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
        onAuth: (email, password, callback) =>
            dispatch(actions.login(email, password, callback)),
        onExtLogin: (data, callback) => dispatch(actions.externalLogin(data, callback)),
    }
);
export default connect(mapStateToProps, mapDispatchToProps)(Login);
