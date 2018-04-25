import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../../components/input/Input';
import { Select } from '../../../components/select/Select';
import * as actions from '../../../store/actions';

class EditTask extends Component {
    state = {
        form: {
            // react anti-pattern?
            priority: {
                value: this.props.location.state && this.props.location.state.priority,
            },
            title: {
                value: this.props.location.state && this.props.location.state.title,
            },
            dueDate: {
                value: this.props.location.state && this.props.location.state.dueDate.slice(0, 10),
            },
        },
        id: this.props.location.state && this.props.location.state.id,
        projectId: this.props.location.state && this.props.location.state.projectId,
    }
    onChangeHandler = (event) => {
        const { form } = this.state;
        const edited = form[event.target.id];
        edited.value = event.target.value;
        this.setState({ ...this.state, form });
    }
    onSaveHandler = () => {
        const { token } = this.props;
        // nested destructuring magic
        const {
            form: {
                title: { value: title },
                dueDate: { value: dueDate },
                priority: { value: priority },
            },
            id,
            projectId,
        } = this.state;
        this.props.onSave({ id, projectId, title, dueDate, priority }, token);
    }
    returnToList = () => {
        this.props.history.goBack();
    }
    render() {
        let form = (
            <Fragment>
                <Input
                    id="title"
                    placeholder="Task title"
                    value={this.state.form.title.value}
                    onChange={this.onChangeHandler}
                />
                <Input
                    type="date"
                    id="dueDate"
                    onChange={this.onChangeHandler}
                    value={this.state.form.dueDate.value}
                />
                <Select
                    id="priority"
                    value={this.state.form.priority.value}
                    onChange={this.onChangeHandler}
                >
                    <option value="-1">Low</option>
                    <option value="0">Medium</option>
                    <option value="1">High</option>
                </Select>
                <button onClick={this.onSaveHandler}>Save</button>
                <button onClick={this.returnToList}>Cancel</button>
            </Fragment>
        );

        if (!this.props.location.state) {
            const newLoc = this.props.location.pathname.split("/tasks")[0];
            form = <Redirect to={newLoc} />;
        }
        return (
            <Fragment>
                {form}
            </Fragment>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    onSave: (data, token) => dispatch(actions.saveTask(data, token)),
});
const mapStateToProps = state => ({
    token: state.auth.token,
});
export default connect(mapStateToProps, mapDispatchToProps)(EditTask);
