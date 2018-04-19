import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import { Page } from '../../components/page/Page';
import AddProject from './AddProject/AddProject';
import ProjectsList from './ProjectsList/ProjectsList';
import ImportProjects from './ImportProjects/ImportProjects';
import ProjectDetails from './ProjectDetails/ProjectDetails';

const Projects = props => (
    <Page>
        <Switch>
            <Route path={`${props.match.path}/add`} component={AddProject} />
            <Route path={`${props.match.path}/import`} component={ImportProjects} />
            <Route path={`${props.match.path}/:projectId`} component={ProjectDetails} />
            <Route path="/" component={ProjectsList} />
        </Switch>
    </Page>
);
export default withRouter(Projects);
