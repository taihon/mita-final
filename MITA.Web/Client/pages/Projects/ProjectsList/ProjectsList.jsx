import React from 'react'
import styled from 'styled-components';
import { Project } from './../Project/Project';

export const ProjectsList = (props) => {
    const projs = props.items.map(item => <Project {...item} key={item.id} />);
    return (
        <div>
            {projs}
        </div>
    );
};

