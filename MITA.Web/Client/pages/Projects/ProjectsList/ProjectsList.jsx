import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Project } from './../Project/Project';
import * as actions from '../../../store/actions';
import { Spinner } from '../../../components/spinner/Spinner';
import { Modal } from '../../../components/modal/Modal';

class ProjectsList extends Component {
    state = {
        showArchiveProjectRequest: false,
        archiveProjectId: null,
    }
    componentDidMount() {
        this.props.onRequestProjects(this.props.apiToken);
    }
    confirmProjectArchiveHandler = () => {
        this.props.onArchive(this.state.archiveProjectId, this.props.apiToken);
        this.setState({ showArchiveProjectRequest: false, archiveProjectId: null });
    }
    cancelProjectArhiveHandler = () => {
        this.setState({ showArchiveProjectRequest: false, archiveProjectId: null });
    }
    requestProjectArchiveHandler = id => (
        this.setState({ showArchiveProjectRequest: true, archiveProjectId: id })
    );
    editProjectHandler = (id) => {
        this.props.history.push(`/projects/${id}/edit`, { ...this.props.projects.find(p => p.id === id) });
    }
    render() {
        const content = this.props.isLoading
            ? <Spinner />
            : this.props.projects.map((item) => {
                const controls = (
                    <Fragment>
                        <button onClick={() => this.editProjectHandler(item.id)}>&#9998;</button>
                        <button onClick={() =>
                            this.requestProjectArchiveHandler(item.id)}
                        >Archive
                        </button>
                    </Fragment>);
                const title = (
                    <Fragment>
                        <NavLink to={`/projects/${item.id}`}>{item.title}</NavLink>
                        {controls}
                    </Fragment>
                );
                return <Project title={title} key={item.id} />;
            });
        return (
            <div>
                <Modal
                    show={this.state.showArchiveProjectRequest}
                    onOk={this.confirmProjectArchiveHandler}
                    onCancel={this.cancelProjectArhiveHandler}
                >
                    Are you sure you want to move this project to archive?
                </Modal>
                <h4>This is list of your actve projects</h4>
                <NavLink to={`${this.props.location.pathname}/add`}><button>Create new</button></NavLink>
                {content}
            </div >
        );
    }
}
const mapStateToProps = state => ({
    projects: state.projects.projects,
    isLoading: state.projects.isLoading,
    apiToken: state.auth.token,
});
const mapDispatchToProps = dispatch => ({
    onRequestProjects: apiToken => dispatch(actions.requestProjects(apiToken)),
    onArchive: (projectId, apiToken) => dispatch(actions.archiveProject(projectId, apiToken)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
