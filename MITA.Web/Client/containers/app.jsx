import React, { Component } from 'react';
import { Route, NavLink, Redirect, withRouter, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
import { connect } from 'react-redux';

import { ArchivedProjects, Main, Projects } from "../pages";
import { ToolBar } from '../components/navigation/toolbar/Toolbar';
import '../app.css';
import Login from '../pages/Login';

class App extends Component {
    render() {
        let routes = <Switch>
            <Route path="/projects/archived" component={ArchivedProjects} />
            <Route path="/projects" exact component={Projects} />
            <Route path="/logout" component={Login} />
            <Route path="/" exact component={Main} />
            <Redirect to="/" />
        </Switch>;
        if (!this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" exact component={Main} />
                    <Redirect to="/" />
                </Switch>
            );
        }
        return (
            <div className="App">
                <ToolBar IsAuthenticated={this.props.isAuthenticated} />
                {routes}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    }
}
export default hot(module)(withRouter(connect(mapStateToProps, null)(App)))