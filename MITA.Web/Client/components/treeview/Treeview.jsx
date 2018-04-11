import React from 'react';

const Treeview = (props) => {
    const childs = (props.childs && props.childs.count > 0)
        ? props.childs.map(child =>
            <Treeview key={child.id} title={child.title} childs={child.childs} />)
        : null;
    return (
        <React.Fragment>
            <div>{props.title}</div>
            {childs}
        </React.Fragment>
    );
};

export default Treeview;
