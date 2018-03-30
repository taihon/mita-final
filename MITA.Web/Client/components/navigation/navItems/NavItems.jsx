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
            }
        `;
export class NavItems extends Component {
    state = {
        items: [
            { caption: "Home", location: "/", exact: true, id: 1 },
            { caption: "Projects", location: "/projects", exact: true, id: 2 },
            { caption: "Archive!", location: "/projects/archived", id: 3 },
            { caption: "Login", location: "/login", id: 4 }
        ]
    }
    render() {
        const shownItems = !this.props.IsAuthenticated ? null : this.state.items.map(item => <NavItem
            to={item.location}
            exact={item.exact}
            title={item.caption}
            key={item.id}
        />);
        return (
            <ItemsList>
                {shownItems}
            </ItemsList>
        )
    }
}