import React from 'react';

import classes from './FarmDetailsList.module.css';
import SectionContainer from '../SectionContainer/SectionContainer';
import Button from '../UI/Buttons/Button/Button';

const farmDetailsList = (props) => {

    const farmDetail = props.arr.map(item => {
        return <li className={classes.ListItem} key={item.id}>{item.lastname ? `${item.name} ${item.lastname}` : item.name}
            <Button edit btnType='Danger' size='S' btnSign='Minus' editmode={props.edit} /></li>
    });

    return (
        <SectionContainer headerText={props.name}>
            <Button clicked={props.click} border btnType='Normal'>Edytuj</Button>
            <ul>
                {farmDetail}
            </ul>
            <div className={classes.PlusContainer}><Button edit btnType='Success' btnSign='Plus' size='L' editmode={props.edit} /></div>
        </SectionContainer>
    );
}

export default farmDetailsList;