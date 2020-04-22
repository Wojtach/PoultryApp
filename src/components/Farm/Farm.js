import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Farm.module.css';
import SectionContainer from '../SectionContainer/SectionContainer';
import Button from '../UI/Button/Button';

const farm = (props) => {

    const halls = props.farmDetails.halls.map(hall => (
        <li className={classes.Hall} key={hall.id}>
            <Link
                className={classes.Link}
                to={`myfarms/${props.farmDetails.name.replace(' ', '_')}/${hall.name.replace(' ', '_')}/${hall.id}`}>
                {hall.name}</Link>
        </li>
    ))

    return (
        <SectionContainer headerText={props.farmDetails.name}>
            <ul className={classes.Halls}>
                {halls}
            </ul>
            <div className={classes.Buttons}>
                <Button btnType='Normal' clicked={props.detailsFarm} >szczegóły</Button>
                <Button btnType='Danger' clicked={props.deleteFarm}>usuń</Button>
            </div>
        </SectionContainer>
    )
}

export default farm;