import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';
import { validate, validateFormInState, FlatButton, Select, Input } from '../../../components';

class AddTask extends Component {
    state = {
        form: {
            title: {
                value: "",
                valid: false,
                changed: false,
                validation: {
                    required: true,
                    maxLength: 200,
                },
            },
            dueDate: {
                // hack to set dueDate to tomorrow
                value: new Date(new Date()
                    .setDate(new Date().getDate() + 1))
                    .toISOString().slice(0, 10),
                valid: false,
                changed: false,
                validation: {
                    notBeforeToday:true,
                },
            },
            priority: { value: 0 },
            formIsValid: false,
        },
    }
    onChangeHandler = (event) => {
        const updatedForm = { ...this.state.form };
        const updatedElement = { ...updatedForm[event.target.id] };
        updatedElement.value = event.target.value;
        updatedElement.changed = true;
        updatedElement.valid = validate(event.target.value, updatedElement.validation);
        updatedForm[event.target.id] = updatedElement;
        updatedForm.formIsValid = validateFormInState(updatedForm);
        this.setState({ form: updatedForm });
    }
    onCancelHandler = () => {
        const newUri = this.props.location.pathname.split("/").slice(0, -2).join("/");
        this.props.history.push(newUri);
    }
    onAddTaskHandler = () => {
        const projectId = parseInt(this.props.match.params.projectId, 10);
        const { parentId = null } = this.props.location.state || {};
        const payload = { projectId, parentId };
        Object.keys(this.state.form).forEach((t) => {
            const val = this.state.form[t];
            if (Object.prototype.hasOwnProperty.call(val, "value")) {
                payload[t] = val.value;
            }
        });
        this.props.onAddTask(projectId, payload, this.props.token);
    }
    render() {
        return (
            <Fragment>
                <Input
                    id="title"
                    placeholder="Task title"
                    value={this.state.form.title.value}
                    onChange={this.onChangeHandler}
                    changed={this.state.form.title.changed}
                    valid={this.state.form.title.valid}
                />
                <Input
                    type="date"
                    id="dueDate"
                    onChange={this.onChangeHandler}
                    value={this.state.form.dueDate.value}
                    valid={this.state.form.dueDate.valid}
                    changed={this.state.form.dueDate.changed}
                />
                <Select id="priority" value={this.state.form.priority.value} onChange={this.onChangeHandler}>
                    <option value="-1">Low</option>
                    <option value="0">Medium</option>
                    <option value="1">High</option>
                </Select>
                <FlatButton
                    onClick={this.onAddTaskHandler}
                    disabled={!this.state.form.formIsValid}
                >Add
                </FlatButton>
                <FlatButton onClick={this.onCancelHandler}>Cancel</FlatButton>
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    token: state.auth.token,
});
const mapDispatchToProps = dispatch => ({
    onAddTask: (id, data, token) => dispatch(actions.addTaskToProject(id, data, token)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddTask);
