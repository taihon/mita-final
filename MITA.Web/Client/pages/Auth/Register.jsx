import React, { Component, Fragment } from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import decode from 'jwt-decode';

import { Page } from '../../components/page/Page';
import { FlatButton } from '../../components/flatbutton/FlatButton';
import * as actions from '../../store/actions';
import Input from '../../components/input/Input';
import extProviderConfig from '../../store/extProviderConfig';
import { validate } from '../../components/validate';

class Register extends Component {
    state = {
        googleToken: null,
        password: {
            value: "",
            validation: {
                required: true,
                hasNumbers: true,
                hasLower: true,
                hasUpper: true,
                hasSpecials: true,
            },
            valid: false,
            changed: false,
        },
        confirmpassword: {
            value: "",
            validation: {
                required: true,
                hasNumbers: true,
                hasLower: true,
                hasUpper: true,
                hasSpecials: true,
            },
            changed: false,
            valid: false,
        },
        email: {
            value: "",
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            changed: false,
        },
    }
    onChangeHandler = (event) => {
        const control = this.state[event.target.id];
        control.valid = validate(event.target.value, control.validation);
        control.value = event.target.value;
        control.changed = true;
        this.setState({ [event.target.id]: control });
    }
    onGoogleSuccess = (response) => {
        const token = response.tokenObj.id_token;
        const tokenData = decode(token);
        if (tokenData.azp === extProviderConfig.google.clientId) {
            this.setState({ googleToken: token, email: { value: tokenData.email } });
        }
    };
    onGoogleError = error => console.log(error);
    onExternalRegister = () => {
        this.props.onExtRegister({
            googleToken: this.state.googleToken,
            password: this.state.password.value,
            confirmpassword: this.state.confirmpassword.value,
        });
    }
    onRegister = () =>
        this.props.onRegister({
            email: this.state.email.value,
            password: this.state.password.value,
            confirmpassword: this.state.confirmpassword.value,
        });
    render() {
        let form = (
            <Fragment>
                <Input
                    placeholder="Your E-mail address"
                    id="email"
                    onChange={this.onChangeHandler}
                    valid={this.state.email.valid}
                    changed={this.state.email.changed}
                />
                <Input
                    placeholder="Password"
                    id="password"
                    type="password"
                    onChange={this.onChangeHandler}
                    valid={this.state.password.valid}
                    changed={this.state.password.changed}
                />
                <Input
                    placeholder="Re-enter password"
                    id="confirmpassword"
                    type="password"
                    onChange={this.onChangeHandler}
                    valid={this.state.confirmpassword.valid}
                    changed={this.state.confirmpassword.changed}
                />
                <FlatButton
                    style={{ width: '100%', marginLeft: 0, marginTop: 0 }}
                    onClick={this.onRegister}
                >Register
                </FlatButton>
                <GoogleLogin
                    clientId={extProviderConfig.google.clientId}
                    buttonText="Google"
                    onSuccess={this.onGoogleSuccess}
                    onFailure={this.onGoogleError}
                />
            </Fragment>
        );
        if (this.state.googleToken) {
            form = (
                <Fragment>
                    <p>Now enter password for your new shiny login</p>
                    <Input
                        placeholder="Password"
                        id="password"
                        type="password"
                        onChange={this.onChangeHandler}
                    />
                    <Input
                        placeholder="Re-enter password"
                        id="confirmpassword"
                        type="password"
                        onChange={this.onChangeHandler}
                    />
                    <FlatButton
                        style={{ width: '100%', marginLeft: 0, marginTop: 0 }}
                        onClick={this.onExternalRegister}
                    >Complete registration
                    </FlatButton>
                </Fragment>
            );
        }
        return (
            <Page>
                {form}
            </Page>
        );
    }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    onExtRegister: data => dispatch(actions.externalRegister(data)),
    onRegister: data => dispatch(actions.register(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);
