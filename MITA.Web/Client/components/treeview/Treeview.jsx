import React from 'react';

const Treeview = (props) => {
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
            <li style={{ borderBottom: 'dotted 1px', textDecoration: props.completed ? 'line-through' : 'none' }}>{props.title}{props.additionals(props.id, props.completed)}
                {childs}
            </li>
        </React.Fragment >
    );
};

export default Treeview;
