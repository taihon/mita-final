import React, { Component } from 'react';
import styled from 'styled-components';

import { Spinner } from "../spinner/Spinner";
import Treeview from '../treeview/Treeview';

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
                    <ul key={item.id} style={{ borderLeft: 'dotted 1px' }}><Treeview {...item} /></ul>
                ));
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
