import React, { Component } from 'react';
import { Page } from '../../../components/page/Page';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';

class AddProject extends Component {
    returnToList = () => {
        this.props.history.goBack();
    }
    createProjectHandler = (event) => {
        event.preventDefault();
        console.log(actions);

        this.props.onCreateProject(this.state.form.title, this.state.form.description);
    }
    state = {
        form: {
            title: 'new test project',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo distinctio in ratione praesentium eos aliquam accusamus corporis eligendi neque quam laudantium alias hic mollitia earum ab itaque, quisquam incidunt quidem!'
        }
    }
    render() {
        return (
            <Page>
                <h3>Here will be add project form</h3>
                <button onClick={this.returnToList}>&lt;&lt;return to list</button>
                <form>
                    <label>Title</label><br />
                    <input type='text' id='title' /><br />
                    <label>Description</label><br />
                    <textarea id='description' /><br />
                    <button type='submit' onClick={this.createProjectHandler}>Submit</button>
                </form>
            </Page>
        );
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onCreateProject: (title, description) => dispatch(actions.createProject(title, description))
    }
}
export default connect(null, mapDispatchToProps)(AddProject);