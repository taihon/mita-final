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

    console.log(props);
    return (
        <React.Fragment>
            <li style={{ borderBottom: 'dotted 1px' }}>{props.title}{props.additionals(props.id)}
                {childs}
            </li>
        </React.Fragment>
    );
};

export default Treeview;
