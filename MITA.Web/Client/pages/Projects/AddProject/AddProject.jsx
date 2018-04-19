import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Page } from '../../../components/page/Page';

import * as actions from '../../../store/actions';

class AddProject extends Component {
    state = {
        form: {
            title: 'new test project',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo distinctio in ratione praesentium eos aliquam accusamus corporis eligendi neque quam laudantium alias hic mollitia earum ab itaque, quisquam incidunt quidem!',
        },
    }
    returnToList = () => {
        this.props.history.goBack();
    }
    createProjectHandler = (event) => {
        event.preventDefault();
        this.props.onCreateProject(
            this.state.form.title,
            this.state.form.description, this.props.authToken,
        );
    }
    render() {
        return (
            <Page>
                <h3>Here will be add project form</h3>
                <button onClick={this.returnToList}>&lt;&lt;return to list</button>
                <form>
                    <label htmlFor="title">
                        Title
                        <br />
                        <input type="text" id="title" />
                    </label>
                    <br />
                    <label htmlFor="description">
                        Description
                        <br />
                        <textarea id="description" />
                    </label>
                    <br />
                    <button type="submit" onClick={this.createProjectHandler}>Submit</button>
                </form>
            </Page>
        );
    }
}
const mapStateToProps = state => ({
    authToken: state.auth.token,
});
const mapDispatchToProps = dispatch => ({
    onCreateProject: (title, description) => dispatch(actions.createProject(title, description)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddProject);
