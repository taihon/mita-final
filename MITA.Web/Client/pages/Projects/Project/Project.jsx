import React from 'react';
import styled from 'styled-components';

const Presenter = styled.div`
width: 100%;
box-sizing: border-box;
border: 2px solid green;
`
export const Project = (props) => (
    <Presenter>
        <span>{props.title}</span>
        <p>{props.description}</p>
    </Presenter>
);