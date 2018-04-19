import React from 'react';

const Treeview = (props) => {
    const childs = (props.childs && props.childs.length > 0)
        ? props.childs.map(child =>
            <ul key={child.id} ><Treeview title={child.title} childs={child.childs} /></ul>)
        : null;
    return (
        <React.Fragment>
            <li style={{ borderBottom: 'dotted 1px' }}>{props.title}
                {childs}
            </li>
        </React.Fragment>
    );
};

export default Treeview;
