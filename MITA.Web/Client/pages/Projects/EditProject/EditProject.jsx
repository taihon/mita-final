import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../../components/input/Input';
import { TextArea } from '../../../components/textarea/TextArea';
import * as actions from '../../../store/actions';

class EditProject extends Component {
    state = {
        title: { value: this.props.location.state && this.props.location.state.title },
        description: { value: this.props.location.state && this.props.location.state.description },
        id: this.props.location.state && this.props.location.state.id,
    }
    onChangeHandler = (event) => {
        const param = this.state[event.target.id];
        param.value = event.target.value;
        this.setState({ [event.target.id]: { ...param } });
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
                />
                <TextArea
                    id="description"
                    placeholder="Project description"
                    value={description}
                    onChange={this.onChangeHandler}
                />
                <button onClick={this.onSaveHandler}>Save</button>
                <button onClick={this.returnToList}>Cancel</button>
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
