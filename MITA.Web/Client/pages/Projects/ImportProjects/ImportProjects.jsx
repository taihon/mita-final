import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Page } from '../../../components/page/Page';
import * as actions from '../../../store/actions/todoistActions';
import { Toggleable } from '../../../components/toggleable/Toggleable';

class ImportProjects extends Component {
    state = {}
    componentWillMount() {
        if (this.props.location.search.length > 0) {
            this.props.onAuthComplete(
                this.props.location.search,
                this.props.apiToken,
            );
            this.props.history.replace(this.props.location.path);
        }
    }
    requestProjects() {
        this.props.onRequestProjects(this.props.token);
    }
    requestProjectDetails(id) {
        const proj = this.props.projects.find(p => p.id === id);
        if (proj && (!this.props.projectinfo[id]
            || !this.props.projectinfo[id].items)) {
            this.props.onRequestProjectDetails(id, this.props.token);
        }
    }
    handleBeginAuth() {
        this.props.onBeginAuth();
    }
    render() {
        const projects = !this.props.projectsLoading
            ? (
                <ul>
                    {this.props.projects.map(proj =>
                        (
                            <Toggleable
                                title={proj.name}
                                id={proj.id}
                                key={proj.id}
                                onToggle={id => this.requestProjectDetails(id)}
                                detailsLoading={this.props.projectinfoLoading}
                                items={this.props.projectinfo[proj.id]}
                            />
                        ))}
                </ul>
            )
            : "Loading...";
        const shouldBeLoggedInBeforeRequest = !this.props.token
            ? (
                <React.Fragment>
                    <p>First you need to login to Todoist service</p>
                    <button onClick={() => this.handleBeginAuth()}>Login!</button>
                </React.Fragment>
            )
            : null;
        return (
            <Page>
                {shouldBeLoggedInBeforeRequest}
                {projects}
            </Page>
        );
    }
}
const mapStateToProps = state => ({
    projects: state.todoist.projects,
    projectsLoading: state.todoist.projectsLoading,
    token: state.todoist.token,
    apiToken: state.auth.token,
    projectinfo: state.todoist.projectinfo,
    projectinfoLoading: state.todoist.projectinfoLoading,
});
const mapDispatchToProps = dispatch => ({
    onRequestProjects: token => dispatch(actions.todoistRequestProjects(token)),
    onBeginAuth: () => dispatch(actions.todoistAuth()),
    onAuthComplete: (result, apiToken) => dispatch(actions.todoistAuthComplete(result, apiToken)),
    onRequestProjectDetails: (id, token) =>
        dispatch(actions.todoistRequestProjectDetails(id, token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ImportProjects);
