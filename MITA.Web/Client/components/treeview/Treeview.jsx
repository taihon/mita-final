import React from 'react';

const Treeview = (props) => {
    const childs = (props.childrens && props.childrens.length > 0)
        ? props.childrens.map(child =>
            <ul key={child.id} ><Treeview title={child.title} childrens={child.childrens} /></ul>)
        : null;
    console.log(childs);
    return (
        <React.Fragment>
            <li style={{ borderBottom: 'dotted 1px' }}>{props.title}
                {childs}
            </li>
        </React.Fragment>
    );
};

export default Treeview;
