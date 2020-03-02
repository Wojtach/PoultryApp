import React from 'react';

import classes from './Farm.module.css';

const farm = ({ farmProps }) => {

    const halls = farmProps.halls.map(hall => (
        <li className={classes.Hall} key={hall.id}>
            <a href="">
                {hall.name}
            </a>
        </li>
    ))

    return (
        <div className={classes.FarmContent}>
            <h2>{farmProps.name}</h2>
            <ul className={classes.Halls}>
                {halls}
            </ul>
            <div className={classes.Buttons}>
                <button>Add</button>
                <button>Delete</button>
            </div>
        </div>
    )
}

export default farm;