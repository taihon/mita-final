import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Project } from './../Project/Project';
import * as actions from '../../../store/actions';
import { Spinner } from '../../../components/spinner/Spinner';
import { Modal } from '../../../components/modal/Modal';
import { FlatButton } from '../../../components/flatbutton/FlatButton';

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
                        <FlatButton onClick={() =>
                            this.editProjectHandler(item.id)}
                        >&#9998;
                        </FlatButton>
                        <FlatButton onClick={() =>
                            this.requestProjectArchiveHandler(item.id)}
                        >Archive
                        </FlatButton>
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
                <FlatButton onClick={() => this.props.history.push(`${this.props.location.pathname}/add`)}>Create new</FlatButton>
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
