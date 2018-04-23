import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';
import { Select } from '../../../components/select/Select';
import Input from '../../../components/input/Input';

class AddTask extends Component {
    state = {
        form: {
            title: { value: "" },
            dueDate: {
                // hack to set dueDate to tomorrow
                value: new Date(new Date()
                    .setDate(new Date().getDate() + 1))
                    .toISOString().slice(0, 10),
            },
            priority: { value: 0 },
        },
    }
    onChangeHandler = (event) => {
        const updatedForm = { ...this.state.form };
        const updatedElement = { ...updatedForm[event.target.id] };
        updatedElement.value = event.target.value;
        updatedForm[event.target.id] = updatedElement;
        this.setState({ form: updatedForm });
    }
    AddTaskHandler = () => {
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
                <Input id="title" placeholder="Task title" value={this.state.form.title.value} onChange={this.onChangeHandler} />
                <Input
                    type="date"
                    id="dueDate"
                    onChange={this.onChangeHandler}
                    value={this.state.form.dueDate.value}
                />
                <Select id="priority" value={this.state.form.priority.value} onChange={this.onChangeHandler}>
                    <option value="-1">Low</option>
                    <option value="0">Medium</option>
                    <option value="1">High</option>
                </Select>
                <button onClick={this.AddTaskHandler}>Add</button>
                <button>Cancel</button>
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
