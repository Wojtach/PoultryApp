import React from 'react';

import classes from './FarmDetailsList.module.css';
import SectionContainer from '../SectionContainer/SectionContainer';
import Button from '../UI/Buttons/Button/Button';

const farmDetailsList = (props) => {

    const farmDetail = props.arr.map(item => {
        return <li key={item.id}>{item.lastname ? `${item.name} ${item.lastname}` : item.name}
            <Button edit btnType='Minus' size='S' /></li>
    });

    return (
        <SectionContainer headerText={props.name}>
            <Button border btnType='Success'>Edytuj</Button>
            <ul>
                {farmDetail}
            </ul>
            <Button edit btnType='Plus' size='L' editmode={false} />
        </SectionContainer>
    );
}

export default farmDetailsList;