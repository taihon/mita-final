import React, { Component } from 'react';
import { Route, Redirect, withRouter, Switch } from "react-router-dom";
import { connect } from 'react-redux';

import { Main, Projects } from "../pages";
import { ToolBar } from '../components/navigation/toolbar/Toolbar';
import '../app.css';
import { Login, Logout } from '../pages/Auth';
import { checkAuthStatus } from '../store/actions';

class App extends Component {
    componentDidMount() {
        this.props.tryAutoLogin();
    }
    render() {
        let routes = (
            <React.Fragment>
                <Route path="/projects" component={Projects} />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={Main} />
            </React.Fragment>
        );
        if (!this.props.isAuthenticated) {
            routes = (
                <React.Fragment>
                    <Route path="/login" component={Login} />
                    <Route path="/" exact component={Main} />
                </React.Fragment>
            );
        }
        return (
            <div className="App">
                <ToolBar IsAuthenticated={this.props.isAuthenticated} />
                <Switch>
                    {routes}
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}
const mapStateToProps = state => (
    {
        isAuthenticated: state.auth.token != null,
    }
);
const mapDispatchToProps = dispatch => (
    {
        tryAutoLogin: () => dispatch(checkAuthStatus()),
    }
);
if (module.hot) {
    module.hot.accept();
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
