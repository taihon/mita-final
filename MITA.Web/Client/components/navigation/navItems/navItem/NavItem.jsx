import styled from 'styled-components';
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
const StyledNavLink = styled(NavLink) `
        margin: 24px 10px 20px 10px;
        padding: 14px 20px 20px 20px;
        box-sizing: border-box;
        display: block;
        width: 100%;
        text-decoration: none;
        color: white;
        &.active{
            background: #eee;
            color: #455a64;
        }
`;
export const NavItem = props => (
    <StyledNavLink to={props.to} exact={props.exact}>{props.title}</StyledNavLink>
)