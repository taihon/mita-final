import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Page } from '../../../components/page/Page';
import * as actions from '../../../store/actions/todoistActions';

class ImportProjects extends Component {
    state = {}
    componentWillMount() {
        if (this.props.location.search.length > 0) {
            this.props.history.replace(this.props.location.path);
        }
    }
    requestProjects() {
        this.props.onRequestProjects(this.props.token);
    }
    handleBeginAuth() {
        this.props.onBeginAuth();
    }
    render() {
        const projects = !this.props.projectsLoading
            ? (
                <ul>{this.props.projects.map(proj =>
                    <li key={proj.id}>{proj.name}</li>)}
                </ul>
            )
            : "Loading...";
        return (
            <Page>
                <p>First you need to login to Todoist service</p>
                <button onClick={() => this.handleBeginAuth()}>Login!</button>
                <button onClick={() => this.requestProjects()}> request projects</button>
                {projects}
            </Page>
        );
    }
}
const mapStateToProps = state => ({
    projects: state.todoist.projects,
    projectsLoading: state.todoist.projectsLoading,
    token: state.todoist.token,
});
const mapDispatchToProps = dispatch => ({
    onRequestProjects: token => dispatch(actions.todoistRequestProjects(token)),
    onBeginAuth: () => dispatch(actions.todoistAuth()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ImportProjects);
