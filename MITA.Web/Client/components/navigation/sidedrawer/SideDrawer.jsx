import React, { Fragment } from 'react';
import styled from 'styled-components';
import { NavItems } from '../navItems/NavItems';
import { colors } from '../../styles';

const Backdrop = styled.div`
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background-color:rgba(0,0,0,0.3);
    z-index:100;
    display:flex;
    align-items:center;
    justify-content:center;
    ${props => !props.show && 'display: none'}
`;
const Wrapper = styled.div`
    position: fixed;
    width:250px;
    max-width:70%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 200;
    background-color: ${colors.dark};
    padding: 32px 16px;
    box-sizing: border-box;
    transition: transform 0.3s ease-out;
    @media(min-width:500px){
        display:none;
    }
    transform: ${props => (props.show ? 'translateX(0)' : 'translateX(-100%)')};
`;
export const SideDrawer = props => (
    <Fragment>
        <Backdrop onClick={props.closed} show={props.show} />
        <Wrapper show={props.show} onClick={props.closed}>
            <NavItems IsAuthenticated={props.IsAuthenticated} />
        </Wrapper>
    </Fragment>
);
