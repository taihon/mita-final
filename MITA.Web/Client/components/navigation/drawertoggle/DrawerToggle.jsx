import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 40px;
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    box-sizing: border-box;
    cursor: pointer;
    & div{
        width: 90%;
        height: 3px;
        background-color: white;
    }
    @media (min-width: 500px) {
        display: none;    
    }
`;
export const DrawerToggle = props => (
    <Wrapper onClick={props.clicked}>
        {/* eslint-disable react/self-closing-comp */}
        <div></div>
        <div></div>
        <div></div>
        {/* eslint-enable */}
    </Wrapper>
);
