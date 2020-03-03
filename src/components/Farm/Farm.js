import React from 'react';

import classes from './Farm.module.css';
import Button from '../UI/Button/Button';

const farm = (props) => {

    const halls = props.farmDetails.halls.map(hall => (
        <li className={classes.Hall} key={hall.id}>
            <a href="">
                {hall.name}
            </a>
        </li>
    ))

    return (
        <section className={classes.FarmContent}>
            <header className={classes.FarmHeader}>{props.farmDetails.name}</header>
            <ul className={classes.Halls}>
                {halls}
            </ul>
            <div className={classes.Buttons}>
                <Button btnType='Normal' clicked={props.detailsFarm} >szczegóły</Button>
                <Button btnType='Danger' clicked={props.deleteFarm}>usuń</Button>
            </div>
        </section>
    )
}

export default farm;