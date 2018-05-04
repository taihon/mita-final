import React from 'react';

export const Treeview = (props) => {
    const childs = (props.childrens && props.childrens.length > 0)
        ? props.childrens.map(child =>
            (
                <Treeview
                    additionals={props.additionals}
                    {...child}
                    key={child.id}
                />
            ))
        : null;
    return (
        <React.Fragment>
            <li style={{
                backgroundColor: props.completed ? '#ccc' : 'none',
                color: props.completed ? '#999' : '#000',
            }}
            >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ flexGrow: 1 }}>{props.title}</div>
                    <div style={{ flexGrow: 0, flexDirection: 'row', display: 'flex' }}>
                        {props.additionals
                            && props.additionals(props.id, props.completed)}
                    </div>
                </div>
                {childs 
                && (<ul>{childs}</ul>)
                }
            </li>
        </React.Fragment >
    );
};
