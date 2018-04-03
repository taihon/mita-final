import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { Page } from '../../components/page/Page';
import extProviderConfig from '../../store/extProviderConfig';

class Register extends Component {
    state = {}
    onGoogleResponse = (response) => {
        console.log(response);
    }
    render() {
        return (
            <Page>
                <GoogleLogin
                    clientId={extProviderConfig.google.clientId}
                    buttonText="Google"
                    onSuccess={this.onGoogleResponse}
                    onFailure={this.onGoogleResponse}
                />
            </Page>
        );
    }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Register);
