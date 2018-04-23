import React, { Component } from 'react';
import { connect } from "react-redux";

import { Spinner } from '../../../components/spinner/Spinner';
import * as actions from '../../../store/actions';
import Treeview from '../../../components/treeview/Treeview';
import { Project } from '../Project/Project';

class ProjectDetails extends Component {
    state = {}
    componentDidMount() {
        const projId = parseInt(this.props.match.params.projectId, 10);
        this.props.onFetchProjectDetails(projId, this.props.token);
    }
    render() {
        const projId = parseInt(this.props.match.params.projectId, 10);
        const project = !Number.isNaN(projId) && this.props.projects.find(p => p.id === projId);
        return (
            <React.Fragment>
                <Project {...project} />
                <p>Tasks:</p>
                {(this.props.detailsLoading && <Spinner />)
                    ||
                    (project && project.items
                        && project.items.map(item => (
                            <Treeview key={item.id} {...item} />)))
                    || null
                }
                <button onClick={() => this.props.history.push(`${this.props.location.pathname}/tasks/add`)}>Add new task</button>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => ({
    detailsLoading: state.projects.projectDetailsLoading,
    token: state.auth.token,
    projects: state.projects.projects,
});
const mapDispatchToProps = dispatch => ({
    onFetchProjectDetails:
        (projectId, token) => dispatch(actions.fetchProjectDetails(projectId, token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
