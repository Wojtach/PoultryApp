import React from 'react';

import classes from './FarmDetailsList.module.css';
import SectionContainer from '../SectionContainer/SectionContainer';
import Button from '../UI/Button/Button';

const farmDetailsList = (props) => {

    const farmDetail = props.arr.map(item => {
        return <li className={classes.ListItem} key={item.id}>{item.lastName ? `${item.name} ${item.lastName}` : item.name}
            <Button edit
                btnType='Danger'
                size='S'
                btnSign='Minus'
                editmode={props.edit}
                clicked={() => props.delete(item.id, props.name)} /></li>
    });

    return (
        <SectionContainer headerText={props.name}>
            <Button clicked={props.click} border btnType='Normal'>Edytuj</Button>
            <ul>
                {farmDetail}
            </ul>
            <div className={classes.PlusContainer}><Button edit btnType='Success' btnSign='Plus' size='M' editmode={props.edit} clicked={props.add} /></div>
        </SectionContainer>
    );
}

export default farmDetailsList;