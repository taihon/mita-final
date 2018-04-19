import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Project } from './../Project/Project';
import * as actions from '../../../store/actions';
import { Spinner } from '../../../components/spinner/Spinner';

class ProjectsList extends Component {
    componentDidMount() {
        this.props.onRequestProjects(this.props.apiToken);
    }
    render() {
        const content = this.props.isLoading
            ? <Spinner />
            : this.props.projects.map(item => <NavLink to={`/projects/${item.id}`}><Project {...item} key={item.id} /></NavLink>);
        return (
            <div>
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
});
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
