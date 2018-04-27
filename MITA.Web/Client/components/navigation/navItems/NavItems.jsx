import React, { Component } from 'react';
import styled from 'styled-components';

import { NavItem } from "./navItem/NavItem";

const ItemsList = styled.ul`
            margin: 0;
            padding: 0;
            list-style-type: none;
            display: flex;
            align-items: center;
            height: 100%;
            flex-flow: column;
            @media (min-width: 500px){
                flex-flow: row;
                width:100%;
                justify-content:flex-end;
            }
        `;
export class NavItems extends Component {
    state = {

    }
    render() {
        const loggedOn = [
            { caption: "Home", location: "/", exact: true, id: 1 },
            { caption: "Projects", location: "/projects", id: 2 },
            { caption: "Logout", location: "/logout", id: 4 },
        ];
        const notLoggedOn = [
            { caption: "Home", location: "/", exact: true, id: 1 },
            { caption: "Login", location: "/login", id: 2 },
            { caption: "Register", location: "/register", id: 3 },
        ];
        const shownItems = (
            !this.props.IsAuthenticated
                ? notLoggedOn
                : loggedOn)
            .map(item => (
                <NavItem
                    to={item.location}
                    exact={item.exact}
                    title={item.caption}
                    key={item.id}
                />));
        return (
            <ItemsList>
                {shownItems}
            </ItemsList>
        );
    }
}
