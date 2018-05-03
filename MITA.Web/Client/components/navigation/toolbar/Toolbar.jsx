import React from 'react';
import styled from 'styled-components';
import { NavItems } from '../navItems/NavItems';

export const ToolBar = (props) => {
    const Bar = styled.div`
        height: 56px;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #008ba3;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        z-index: 90;
    `;
    return (
        <Bar><NavItems IsAuthenticated={props.IsAuthenticated} /></Bar>
    );
};
