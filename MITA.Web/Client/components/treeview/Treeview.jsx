import React from 'react';

export const Treeview = (props) => {
    const childs = (props.childrens && props.childrens.length > 0)
        ? props.childrens.map(child =>
            (
                <ul key={child.id} >
                    <Treeview
                        additionals={props.additionals}
                        {...child}
                    />
                </ul>
            ))
        : null;
    return (
        <React.Fragment>
            <li style={{ borderBottom: 'dotted 1px', textDecoration: props.completed ? 'line-through' : 'none' }}>
                <div>
                    <div>{props.title}</div>
                    {props.additionals && props.additionals(props.id, props.completed)}
                </div>
                {childs}
            </li>
        </React.Fragment >
    );
};
