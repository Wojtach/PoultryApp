import React from 'react';

import classes from './FarmDetailsList.module.css';
import SectionContainer from '../SectionContainer/SectionContainer';
import Button from '../UI/Button/Button';

const farmDetailsList = (props) => {

    let isEditing = props.edit === props.name;

    const farmDetail = props.arr.map(item => {
        let toDisplay = item.lastName ? item.name + ' ' + item.lastName : item.name
        return <li className={classes.ListItem} key={item.id}>
            <span className={isEditing ? classes.EditObject : ''} onClick={() => props.objectToEdit(item.id)}>{toDisplay}</span>
            <Button edit
                btnType='Danger'
                size='S'
                btnSign='Minus'
                editmode={isEditing}
                clicked={() => props.delete(item.id, toDisplay)} /></li>
    });

    return (
        <SectionContainer headerText={props.name}>
            <Button clicked={props.click} border btnType='Normal'>Edytuj</Button>
            <ul>
                {farmDetail}
            </ul>
            <div className={classes.PlusContainer}>
                <Button edit
                    btnType='Success'
                    btnSign='Plus'
                    size='M' editmode={isEditing} clicked={props.showForm} />
            </div>
        </SectionContainer>
    );
}

export default farmDetailsList;