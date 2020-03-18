import React from 'react';

import Button from '../UI/Button/Button';
import classes from './ConfirmAction.module.css'

const confirmAction = (props) => (
    <div className={classes.ConfirmAction}>
        <p className={classes.Information}>
            {`Czy na pewno chcesz usunąć obiekt o nazwie "${props.name}"? 
                    Zmiany będą nie odwracalne.`}
            {props.content}</p>
        <div className={classes.Flexbox}>
            <Button btnType='Normal' clicked={props.cancel}>anuluj</Button>
            <Button btnType='Danger'
                clicked={props.confirm}>
                usuń
            </Button>
        </div>
    </div>
)

export default confirmAction;