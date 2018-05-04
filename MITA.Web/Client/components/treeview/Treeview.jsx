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
            <li style={{ textDecoration: props.completed ? 'line-through' : 'none' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ flexGrow: 1 }}>{props.title}</div>
                    <div style={{ flexGrow: 0, flexDirection: 'row', display: 'flex' }}>
                        {props.additionals
                            && props.additionals(props.id, props.completed)}
                    </div>
                </div>
                {childs}
            </li>
        </React.Fragment >
    );
};
