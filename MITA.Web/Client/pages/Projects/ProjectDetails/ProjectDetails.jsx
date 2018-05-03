import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

import { Spinner, Modal, Treeview, FlatButton } from '../../../components';
import * as actions from '../../../store/actions';
import { Project } from '../Project/Project';

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
    handleAddSubTask = (taskId) => {
        this.props.history.push(`${this.props.location.pathname}/tasks/add`, { parentId: taskId });
    }
    handleCompleteTask = (taskId) => {
        const projectId = parseInt(this.props.match.params.projectId, 10);
        this.props.onCompleteTask({ taskId, projectId }, this.props.token);
    }
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
        const additionals = (id, completed = false) => (
            <Fragment>
                {!completed &&
                    <FlatButton onClick={() => this.handleCompleteTask(id)}>Completed</FlatButton>
                }
                <FlatButton onClick={() => this.handleAddSubTask(id)}>Add subtask</FlatButton>
                <FlatButton onClick={() => this.handleEditTask(id)}>Edit</FlatButton>
                <FlatButton onClick={() => this.onShowRemoveTaskRequest(id)}>Delete</FlatButton>
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
                        <FlatButton onClick={() => this.props.history.push(`${this.props.location.pathname}/tasks/add`)}>Add new task</FlatButton>
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
    onCompleteTask:
        (payload, token) => dispatch(actions.completeTask(payload, token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
