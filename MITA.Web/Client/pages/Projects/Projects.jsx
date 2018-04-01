import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import { Page } from '../../components/page/Page';
import AddProject from './AddProject/AddProject';
import ProjectsList from './ProjectsList/ProjectsList';

class Projects extends Component {
    render() {
        return (
            <Page>
                <h3>Projects page</h3>
                <Switch>
                    <Route path={this.props.match.path + "/add"} component={AddProject} />
                    <Route path="/" component={ProjectsList} />
                </Switch>
            </Page>
        )
    }
}
export default withRouter(Projects)