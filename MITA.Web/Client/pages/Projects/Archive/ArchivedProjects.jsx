import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Project } from './../Project/Project';
import * as actions from '../../../store/actions';
import { FlatButton, Modal, Spinner } from '../../../components';

class ArchivedProjects extends Component {
    state = {
        showUnarchiveProjectRequest: false,
        unarchiveProjectId: null,
    }
    componentDidMount() {
        this.props.onRequestProjects(this.props.apiToken);
    }
    confirmProjectUnarchiveHandler = () => {
        this.props.onUnarchive(this.state.unarchiveProjectId, this.props.apiToken);
        this.setState({ showUnarchiveProjectRequest: false, unarchiveProjectId: null });
    }
    cancelProjectUnarchiveHandler = () => {
        this.setState({ showUnarchiveProjectRequest: false, unarchiveProjectId: null });
    }
    requestProjectUnarchiveHandler = id => (
        this.setState({ showUnarchiveProjectRequest: true, unarchiveProjectId: id })
    );
    render() {
        const content = this.props.isLoading
            ? <Spinner />
            : this.props.projects.map((item) => {
                const controls = (
                    <Fragment>
                        <FlatButton onClick={() =>
                            this.requestProjectUnarchiveHandler(item.id)}
                        >Unarchive
                        </FlatButton>
                    </Fragment>);
                const title = (
                    <Fragment>
                        {item.title}
                        {controls}
                    </Fragment>
                );
                return <Project title={title} key={item.id} />;
            });
        return (
            <div>
                <Modal
                    show={this.state.showUnarchiveProjectRequest}
                    onOk={this.confirmProjectUnarchiveHandler}
                    onCancel={this.cancelProjectUnarchiveHandler}
                >
                    Are you sure you want to move this project to active?
                </Modal>
                <h4>This your archived projects</h4>
                {content}
            </div >
        );
    }
}
const mapStateToProps = state => ({
    projects: state.projects.archivedProjects,
    isLoading: state.projects.archiveIsLoading,
    apiToken: state.auth.token,
});
const mapDispatchToProps = dispatch => ({
    onRequestProjects: apiToken => dispatch(actions.requestArchivedProjects(apiToken)),
    onUnarchive: (projectId, apiToken) => dispatch(actions.unarchiveProject(projectId, apiToken)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ArchivedProjects);
