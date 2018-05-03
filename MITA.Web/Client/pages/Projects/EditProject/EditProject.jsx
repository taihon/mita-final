import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../../components/input/Input';
import { TextArea } from '../../../components/textarea/TextArea';
import * as actions from '../../../store/actions';
import { validate, validateFormInState, FlatButton } from '../../../components';

class EditProject extends Component {
    state = {
        title: {
            value: this.props.location.state && this.props.location.state.title,
            valid: true,
            changed: false,
            validation: {
                required: true,
                maxLength: 250,
            },
        },
        description: {
            value: this.props.location.state && this.props.location.state.description,
            valid: true,
            changed: false,
            validation: {
                maxLength: 2000,
            },
        },
        formIsValid: true,
        id: this.props.location.state && this.props.location.state.id,
    }
    onChangeHandler = (event) => {
        const param = this.state[event.target.id];
        param.value = event.target.value;
        param.valid = validate(event.target.value, param.validation);
        param.changed = true;
        const formIsValid = validateFormInState(this.state);
        this.setState({ [event.target.id]: { ...param }, formIsValid });
    }
    onSaveHandler = () => {
        const {
            title: { value: title },
            description: { value: description },
            id,
        } = this.state;
        const newDesc = description.split('\n').join('\\n');
        this.props.onSave({ title, description: newDesc, id }, this.props.token);
    }
    returnToList = () => {
        this.props.history.push("/projects");
    }
    render() {
        let { description: { value: description } } = this.state;
        if (description) {
            do {
                description = description.replace("\\n", "\n");
            } while (description.indexOf("\\n") > -1);
        }
        let form = (
            <Fragment>
                <Input
                    id="title"
                    placeholder="Project title"
                    value={this.state.title.value}
                    onChange={this.onChangeHandler}
                    valid={this.state.title.valid}
                    changed={this.state.title.changed}
                />
                <TextArea
                    id="description"
                    placeholder="Project description"
                    value={description}
                    onChange={this.onChangeHandler}
                    valid={this.state.description.valid}
                    changed={this.state.description.changed}
                />
                <FlatButton
                    onClick={this.onSaveHandler}
                    disabled={!this.state.formIsValid}
                >Save
                </FlatButton>
                <FlatButton onClick={this.returnToList}>Cancel</FlatButton>
            </Fragment>
        );

        if (!this.props.location.state) {
            const newLoc = this.props.location.pathname.split('/').slice(0, -2).join('/');
            form = <Redirect to={newLoc} />;
        }
        return (
            <Fragment>
                {form}
            </Fragment>
        );
    }
}
const mapStateToProps = state => (
    {
        token: state.auth.token,
    });
const mapDispatchToProps = dispatch => (
    {
        onSave: (data, token) =>
            dispatch(actions.saveProject(data, token)),
    });

export default connect(mapStateToProps, mapDispatchToProps)(EditProject);
