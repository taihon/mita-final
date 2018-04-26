import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from "react-markdown";

const Presenter = styled.div`
width: 100%;
box-sizing: border-box;
border: 2px solid green;
`;
export const Project = (props) => {
    // workaround
    let { description } = props;
    if (description) {
        do {
            description = description.replace("\\n", "\n");
        } while (description.indexOf("\\n") > -1);
    }
    return (
        <Presenter>
            <span>{props.title}{props.controls}</span>
            <ReactMarkdown source={description} skipHtml />
        </Presenter>
    );
};
