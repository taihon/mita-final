import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from "react-markdown";

const Presenter = styled.div`
width: 100%;
box-sizing: border-box;
background:white;
`;
const Title = Presenter.extend`
display:flex;
justify-content: space-evenly;
align-items:center;
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
            <Title>{props.title}{props.controls}</Title>
            <ReactMarkdown source={description} skipHtml />
        </Presenter>
    );
};
