import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

import { Spinner } from '../../../components/spinner/Spinner';
import * as actions from '../../../store/actions';
import Treeview from '../../../components/treeview/Treeview';
import { Project } from '../Project/Project';
import { Modal } from '../../../components/modal/Modal';

class ProjectDetails extends Component {
    state = {
        showRemoveTaskRequest: false,
        removeTaskId: null,
    }
    componentDidMount() {
        const projId = parseInt(this.props.match.params.projectId, 10);
        this.props.onFetchProjectDetails(projId, this.props.token);
    }
    onShowRemoveTaskRequest = (id) => {
        this.setState({ ...this.state, showRemoveTaskRequest: true, removeTaskId: id });
    }
    onConfirmTaskRemove = () => {
        const projId = parseInt(this.props.match.params.projectId, 10);
        this.props.onDeleteTask(this.state.removeTaskId, projId, this.props.token);
        this.setState({ ...this.state, showRemoveTaskRequest: false, removeTaskId: null });
    }
    onCancelTaskRemove = () => {
        this.setState({ ...this.state, showRemoveTaskRequest: false, removeTaskId: null });
    };
    handleEditTask = (taskId) => {
        const projId = parseInt(this.props.match.params.projectId, 10);
        const project = !Number.isNaN(projId) && this.props.projects.find(p => p.id === projId);

        const task = this.deepSearch(taskId, project.items);
        this.props.history.push(`${this.props.location.pathname}/tasks/${taskId}/edit`, { ...task, projectId: projId });
    };
    deepSearch = (id, object) => {
        if (object instanceof Array) {
            for (let i = 0; i < object.length; i += 1) {
                const result = this.deepSearch(id, object[i]);
                if (result !== null) {
                    return result;
                }
            }
        } else {
            if (object.id === id) {
                return object;
            }
            for (let i = 0; i < object.childrens.length; i += 1) {
                const result = this.deepSearch(id, object.childrens[i]);
                if (result !== null) {
                    return result;
                }
            }
        }
        return null;
    }
    render() {
        const projId = parseInt(this.props.match.params.projectId, 10);
        const project = !Number.isNaN(projId) && this.props.projects.find(p => p.id === projId);
        const additionals = id => (
            <Fragment>
                <button onClick={() => this.handleEditTask(id)}>Edit</button>
                <button onClick={() => this.onShowRemoveTaskRequest(id)}>Delete</button>
            </Fragment>
        );
        return (
            <Fragment>
                <Modal
                    show={this.state.showRemoveTaskRequest}
                    onOk={this.onConfirmTaskRemove}
                    onCancel={this.onCancelTaskRemove}
                >
                    Are you sure you want to remove this task and all its subtasks (if any)?
                </Modal>
                {(this.props.detailsLoading && <Spinner />)
                    ||
                    <Fragment>
                        <Project {...project} />
                        <p>Tasks:</p>
                        <ul>
                            {(project && project.items
                                && project.items.map(item => (
                                    <Treeview
                                        key={item.id}
                                        {...item}
                                        additionals={additionals}
                                    />))) || null}
                        </ul>
                        <button onClick={() => this.props.history.push(`${this.props.location.pathname}/tasks/add`)}>Add new task</button>
                    </Fragment>
                }
            </Fragment>
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
    onDeleteTask:
        (taskId, projectId, token) => dispatch(actions.deleteTask(taskId, projectId, token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
