import React, { Component } from 'react';
import { Route, NavLink, Redirect, withRouter, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
import { connect } from 'react-redux';

import { ArchivedProjects, Main, Projects } from "../pages";
import { ToolBar } from '../components/navigation/toolbar/Toolbar';
import '../app.css';
import Login from '../pages/Login';
import { checkAuthStatus } from '../store/actions';

class App extends Component {
    componentDidMount() {
        this.props.tryAutoLogin();
    }
    render() {
        let routes = <React.Fragment>
            <Route path="/projects/archived" component={ArchivedProjects} />
            <Route path="/projects" component={Projects} />
            <Route path="/logout" component={Login} />
            <Route path="/" exact component={Main} />
        </React.Fragment>;
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
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        tryAutoLogin: () => dispatch(checkAuthStatus())
    }
}
export default hot(module)(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)))