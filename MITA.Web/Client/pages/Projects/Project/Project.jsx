import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from "react-markdown";

const Presenter = styled.div`
width: 100%;
box-sizing: border-box;
border: 2px solid green;
`;
export const Project = props => (
    <Presenter>
        <span>{props.title}</span>
        <ReactMarkdown source={props.description} skipHtml />
    </Presenter>
);
