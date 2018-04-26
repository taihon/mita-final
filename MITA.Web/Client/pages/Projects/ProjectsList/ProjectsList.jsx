import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Project } from './../Project/Project';
import * as actions from '../../../store/actions';
import { Spinner } from '../../../components/spinner/Spinner';

class ProjectsList extends Component {
    componentDidMount() {
        this.props.onRequestProjects(this.props.apiToken);
    }
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
                        <button>X</button>
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
