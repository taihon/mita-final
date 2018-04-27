import React, { Component, Fragment } from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import decode from 'jwt-decode';

import { Page } from '../../components/page/Page';
import { FlatButton } from '../../components/flatbutton/FlatButton';
import * as actions from '../../store/actions';
import Input from '../../components/input/Input';
import extProviderConfig from '../../store/extProviderConfig';

class Register extends Component {
    state = {
        googleToken: null,
        password: { value: "" },
        confirmpassword: { value: "" },
        email: { value: "" },
    }
    onChangeHandler = event =>
        this.setState({ [event.target.id]: { value: event.target.value } });
    onGoogleSuccess = (response) => {
        const token = response.tokenObj.id_token;
        const tokenData = decode(token);
        console.log(tokenData);

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
                />
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
