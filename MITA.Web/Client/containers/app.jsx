import React, { Component } from 'react';
import { Route, Redirect, withRouter, Switch } from "react-router-dom";
import { connect } from 'react-redux';

import { Main, Projects } from "../pages";
import { ToolBar } from '../components/navigation/toolbar/Toolbar';
import '../app.css';
import { Login, Logout, Register } from '../pages/Auth';
import { checkAuthStatus } from '../store/actions';
import { SideDrawer } from '../components';

class App extends Component {
    state = {
        showDrawer: false,
    }
    componentDidMount() {
        this.props.tryAutoLogin();
    }
    toggleDrawer = () => {
        this.setState(prevState => ({ showDrawer: !prevState.showDrawer }));
    }
    closeDrawer = () => {
        this.setState({ showDrawer: false });
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
                    <Route path="/register" component={Register} />
                    <Route path="/" exact component={Main} />
                </React.Fragment>
            );
        }
        return (
            <div className="App">
                <ToolBar
                    IsAuthenticated={this.props.isAuthenticated}
                    toggleDrawer={this.toggleDrawer}
                />
                <SideDrawer
                    IsAuthenticated={this.props.isAuthenticated}
                    show={this.state.showDrawer}
                    closed={this.closeDrawer}
                />
                <Switch>
                    {routes}
                    <Redirect to="/" />
                </Switch>
            </div >
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
