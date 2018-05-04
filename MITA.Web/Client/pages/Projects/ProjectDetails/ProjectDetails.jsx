import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";

import { Spinner, Modal, Treeview, FlatButton, TreeWrapper } from '../../../components';
import * as actions from '../../../store/actions';
import { Project } from '../Project/Project';

const SquareButton = FlatButton.extend`
width: 32px;
height: 32px;
display:flex;
justify-content:center;
align-items:center;
`;
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
    onBackHandler = () => {
        this.props.history.push("/projects");
    }
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
                    <SquareButton
                        onClick={() => this.handleCompleteTask(id)}
                    >&#10003;
                    </SquareButton>
                }
                <SquareButton onClick={() => this.handleAddSubTask(id)}>+</SquareButton>
                <SquareButton onClick={() => this.handleEditTask(id)}>&#9998;</SquareButton>
                <SquareButton onClick={() => this.onShowRemoveTaskRequest(id)}>X</SquareButton>
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
                <FlatButton onClick={this.onBackHandler}>Go back to list</FlatButton>
                {(this.props.detailsLoading && <Spinner />)
                    ||
                    <Fragment>
                        <Project {...project} />
                        <p>Tasks:</p>
                        <TreeWrapper>
                            <ul>
                                {(project && project.items
                                    && project.items.map(item => (
                                        <Treeview
                                            key={item.id}
                                            {...item}
                                            additionals={additionals}
                                        />))) || null}
                            </ul>
                        </TreeWrapper>
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
