import React from 'react';

const ListGroup = (props) => {
    //textProperty passed in as "name" and valueProperty pass in as "_id" via props.  
    //this decouples the component from props, which allows reusability
    const { items, textProperty, valueProperty } = props;

    return (
        <ul className="list-group">
            {items.map(item =>

                <li key={item[valueProperty]} className="list-group-item">{item[textProperty]}</li>
            )}

        </ul>
    );
}

export default ListGroup;