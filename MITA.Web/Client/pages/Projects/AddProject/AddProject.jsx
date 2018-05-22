import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';
import { validate } from '../../../components/validate';
import Input from '../../../components/input/Input';
import { TextArea } from '../../../components/textarea/TextArea';

class AddProject extends Component {
    state = {
        title: {
            value: '',
            valid: false,
            changed: false,
            validation: {
                required: true,
            },
        },
        description: {
            value: '',
            valid: true,
            changed: false,
            validation: {},
        },
    }
    onChangeHandler = (event) => {
        const control = this.state[event.target.id];
        control.valid = validate(event.target.value, control.validation);
        control.value = event.target.value;
        control.changed = true;
        this.setState({ [event.target.id]: control });
    }
    createProjectHandler = (event) => {
        event.preventDefault();
        this.props.onCreateProject(
            this.state.title.value,
            this.state.description.value,
            this.props.authToken,
        );
    }
    returnToList = () => {
        this.props.history.goBack();
    }
    render() {
        return (
            <Fragment>
                <h3>Fill in title and description of new project</h3>
                <button onClick={this.returnToList}>&lt;&lt;return to list</button>
                <form>
                    <label htmlFor="title">
                        Title
                        <br />
                        <Input
                            type="text"
                            id="title"
                            onChange={this.onChangeHandler}
                            changed={this.state.title.changed}
                            valid={this.state.title.valid}
                            value={this.state.title.value}
                        />
                    </label>
                    <br />
                    <label htmlFor="description">
                        Description
                        <br />
                        <TextArea
                            id="description"
                            onChange={this.onChangeHandler}
                            value={this.state.description.value}
                            changed={this.state.description.changed}
                            valid={this.state.description.valid}
                        />
                    </label>
                    <br />
                    <button type="submit" onClick={this.createProjectHandler}>Create project</button>
                </form>
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    authToken: state.auth.token,
});
const mapDispatchToProps = dispatch => ({
    onCreateProject: (title, description, authToken) => dispatch(actions.createProject(title, description, authToken)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddProject);
