import React from 'react';
import { Switch, Route, withRouter, NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { Page } from '../../components/page/Page';
import AddProject from './AddProject/AddProject';
import ArchivedProjects from './Archive/ArchivedProjects';
import ProjectsList from './ProjectsList/ProjectsList';
import ImportProjects from './ImportProjects/ImportProjects';
import ProjectDetails from './ProjectDetails/ProjectDetails';
import AddTask from './AddTask/AddTask';
import EditTask from './EditTask/EditTask';
import EditProject from './EditProject/EditProject';
import { colors } from '../../components/styles';

const StyledNavLink = styled(NavLink) `
color:${colors.dark}
&.active{
    text-decoration:none;
}
`;

const Projects = props => (
    <Page>
        {props.location.pathname === '/projects' &&
            <div>
                <StyledNavLink to="/projects" exact>Active</StyledNavLink>
                <StyledNavLink to="/projects/archived">Archived</StyledNavLink>
            </div>
        }
        <Switch>
            <Route path={`${props.match.path}/add`} component={AddProject} />
            <Route path={`${props.match.path}/import`} component={ImportProjects} />
            <Route path={`${props.match.path}/archived`} component={ArchivedProjects} />
            <Route path={`${props.match.path}/:projectId/tasks/add`} component={AddTask} />
            <Route path={`${props.match.path}/:projectId/tasks/:taskId/edit`} component={EditTask} />
            <Route path={`${props.match.path}/:projectId/edit`} component={EditProject} />
            <Route path={`${props.match.path}/:projectId`} component={ProjectDetails} />
            <Route path="/" component={ProjectsList} />
        </Switch>
    </Page>
);
export default withRouter(Projects);
