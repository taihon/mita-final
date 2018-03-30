import React, { Component } from 'react';
import axios from 'axios';

import { Page } from '../components/page/Page';
import Input from '../components/input/Input';

export class Login extends Component {
    state = {
        login: "",
        password: ""
    }
    requestLogin = (login, password) => {
        return axios.post("/api/account/login",
            { email: login, password: password })
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }
    inputChangedHandler = (event, control) => {
        this.setState({
            ...this.state,
            [control]: event.target.value
        })
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.requestLogin(this.state.login, this.state.password);
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
                    <button type="submit">Login</button>
                    <button>Login external</button>
                </form>
            </Page >
        );
    }
}