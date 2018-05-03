import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Input, Select, validate, validateFormInState, FlatButton } from '../../../components';
import * as actions from '../../../store/actions';

class EditTask extends Component {
    state = {
        form: {
            // react anti-pattern?
            priority: {
                value: this.props.location.state && this.props.location.state.priority,
                valid: true,
            },
            title: {
                value: this.props.location.state && this.props.location.state.title,
                valid: true,
                changed: false,
                validation: {
                    required: true,
                    maxLength: 200,
                },
            },
            dueDate: {
                value: this.props.location.state && this.props.location.state.dueDate.slice(0, 10),
                valid: true,
                changed: false,
                validation: {
                    required: true,
                    notBeforeToday: true,
                },
            },
            formIsValid: true,
        },
        id: this.props.location.state && this.props.location.state.id,
        projectId: this.props.location.state && this.props.location.state.projectId,
    }
    onChangeHandler = (event) => {
        const { form } = this.state;
        const edited = form[event.target.id];
        edited.value = event.target.value;
        edited.valid = validate(event.target.value, edited.validation);
        edited.changed = true;
        form.formIsValid = validateFormInState(form);
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
                    valid={this.state.form.title.valid}
                    changed={this.state.form.title.changed}
                />
                <Input
                    type="date"
                    id="dueDate"
                    onChange={this.onChangeHandler}
                    value={this.state.form.dueDate.value}
                    valid={this.state.form.dueDate.valid}
                    changed={this.state.form.dueDate.changed}
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
                <FlatButton
                    onClick={this.onSaveHandler}
                    disabled={!this.state.form.formIsValid}
                >Save
                </FlatButton>
                <FlatButton onClick={this.returnToList}>Cancel</FlatButton>
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
