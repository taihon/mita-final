import React, { Component } from 'react';
import styled from 'styled-components';

import { Spinner } from "../spinner/Spinner";
import { Treeview } from '../treeview/Treeview';
import { FlatButton } from '../flatbutton/FlatButton';

export class Toggleable extends Component {
    state = {}
    onToggleHandler = () => {
        this.setState((prevState, props) => ({
            ...prevState,
            toggled: !prevState.toggled,
        }), () => this.props.onToggle && this.state.toggled && this.props.onToggle(this.props.id));
    }
    onImportHandler = (id) => {
        this.props.onImportHandler(id);
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
                projectDetails = (
                    <React.Fragment>
                        {this.props.items.items.map(item => (
                            <ul key={item.id} style={{ borderLeft: 'dotted 1px' }}><Treeview {...item} /></ul>
                        ))}
                        <FlatButton onClick={() =>
                            this.props.onImportHandler(this.props.id)}
                        >
                            import
                        </FlatButton>
                    </React.Fragment>
                );
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
