import React, { Component } from 'react'
import { NavLink, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Project } from './../Project/Project';
import AddProject from '../AddProject/AddProject';
import * as actions from '../../../store/actions';
import { Spinner } from '../../../components/spinner/Spinner';

class ProjectsList extends Component {
    componentDidMount() {
        this.props.onRequestProjects();
    }
    render() {
        const content = this.props.isLoading
            ? <Spinner />
            : this.props.projects.map(item => <Project {...item} key={item.id} />);
        return (
            <div>
                <h4>This is list of your actve projects</h4>
                <NavLink to={this.props.location.pathname + "/add"}><button>Create new</button></NavLink>
                {content}
            </div >
        );
    }
};
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
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);