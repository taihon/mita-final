import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import { Page } from '../../components/page/Page';
import AddProject from './AddProject/AddProject';
import ProjectsList from './ProjectsList/ProjectsList';

const Projects = props => (
    <Page>
        <Switch>
            <Route path={`${props.match.path}/add`} component={AddProject} />
            <Route path="/" component={ProjectsList} />
        </Switch>
    </Page>
);
export default withRouter(Projects);
