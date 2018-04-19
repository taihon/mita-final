import React, { Component } from 'react';
import { connect } from "react-redux";
import { Spinner } from '../../../components/spinner/Spinner';

class ProjectDetails extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <Spinner />
                <span>{this.props.match.params.projectId}</span>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => ({

});
const mapDispatchToProps = dispatch => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);
