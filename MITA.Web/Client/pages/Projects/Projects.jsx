import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Page } from '../../components/page/Page';
import * as actions from '../../store/actions';
import { Spinner } from '../../components/spinner/Spinner';
import { Project } from './Project/Project';
import { ProjectsList } from './ProjectsList/ProjectsList';

class Projects extends Component {
    componentWillMount() {
        this.props.onRequestProjects();
    }
    componentDidMount() {
        this.props.onRequestProjects();
    }
    render() {
        const content = this.props.isLoading
            ? <Spinner />
            : <ProjectsList items={this.props.projects} />
        return (
            <Page>
                <h3>Projects page</h3>
                {content}
            </Page>
        )
    }
}
const mapStateToProps = state => {
    return {
        projects: state.projects.projects,
        isLoading: state.projects.isLoading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onRequestProjects: () => dispatch(actions.requestProjects())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Projects)