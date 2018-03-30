import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Page } from '../components/page/Page';
import * as actions from '../store/actions';

class Projects extends Component {
    componentWillMount() {

    }
    render() {
        return (
            <Page>
                <h3>Projects page</h3>
                <button onClick={this.props.onRequestProjects}>request projects</button>
            </Page>
        )
    }
}
const mapStateToProps = state => {
    return {
        projects: state.projects.projects
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onRequestProjects: () => dispatch(actions.requestProjects())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Projects)