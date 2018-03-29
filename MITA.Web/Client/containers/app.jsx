import React, { Component } from 'react';
import { Route, NavLink } from "react-router-dom";

import { ArchivedProjects, Main, Projects } from "../pages";

export class App extends Component {
    render() {
        let routes = <React.Fragment>
            <Route path="/" exact component={Main} />
            <Route path="/projects" exact component={Projects} />
            <Route path="/projects/archived" component={ArchivedProjects} />
        </React.Fragment>;
        return (
            <div className="App">
                <h1>Hello</h1>
                <ul>
                    <li><NavLink to="/">Main</NavLink></li>
                    <li><NavLink to="/projects">Projects</NavLink></li>
                    <li><NavLink to="/projects/archived">Archived projects</NavLink></li>
                </ul>
                {routes}
            </div>
        );
    }
}