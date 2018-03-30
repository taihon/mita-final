import React, { Component } from 'react';
import { Route, NavLink } from "react-router-dom";

import { ArchivedProjects, Main, Projects } from "../pages";
import { ToolBar } from '../components/navigation/toolbar/Toolbar';
import '../app.css';

export class App extends Component {
    render() {
        let routes = <React.Fragment>
            <Route path="/" exact component={Main} />
            <Route path="/projects" exact component={Projects} />
            <Route path="/projects/archived" component={ArchivedProjects} />
        </React.Fragment>;
        return (
            <div className="App">
                <ToolBar />
                {routes}
            </div>
        );
    }
}