import React from 'react';
import styled from 'styled-components';

import { colors } from '../styles';
import { FlatButton } from '../flatbutton/FlatButton';

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
`;
const ModalContent = styled.div`
position:relative;
top:75px;
background-color:${colors.background};
max-width: 500px;
margin: 0 auto;
padding: 30px;
`;
export const Modal = props => (
    props.show &&
    <Backdrop onClick={props.onCancel}>
        <ModalContent>
            {props.children}
            <br />
            <FlatButton onClick={props.onOk}>OK</FlatButton>
            <FlatButton onClick={props.onCancel}>Cancel</FlatButton>
        </ModalContent>
    </Backdrop>
);
