import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Page } from '../../../components/page/Page';

class ImportProjects extends Component {
    state = {}
    render() {
        return (
            <Page>
                <p>First you need to login to Todoist service</p>
                <button>Login!</button>
            </Page >
        );
    }
}
const mapStateToProps = state => ({
    projects: null,
});
const mapDispatchToProps = dispatch => ({
    someaction: null,
});
export default connect(mapStateToProps, mapDispatchToProps)(ImportProjects);
