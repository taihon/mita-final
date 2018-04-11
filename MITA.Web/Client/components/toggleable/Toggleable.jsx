import React, { Component } from 'react';
import styled from 'styled-components';

import { Spinner } from "../spinner/Spinner";

export class Toggleable extends Component {
    state = {}
    onToggleHandler = () => {
        this.setState((prevState, props) => ({
            ...prevState,
            toggled: !prevState.toggled,
        }), () => this.props.onToggle && this.state.toggled && this.props.onToggle(this.props.id));
    }
    render() {
        const StTitle = styled.h4`
        cursor: pointer;
        `;
        let projectDetails = null;
        if (this.state.toggled) {
            if (!this.props.items) {
                projectDetails = <Spinner />;
            } else {
                projectDetails = this.props.items.items.map(item => (
                    <li key={item.id}>{item.content}</li>));
            }
        }
        return (
            <React.Fragment>
                <StTitle onClick={this.onToggleHandler}>{this.props.title}</StTitle>
                {projectDetails}
            </React.Fragment>
        );
    }
}
