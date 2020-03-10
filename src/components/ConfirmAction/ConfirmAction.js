import React from 'react';

import Button from '../UI/Buttons/Button/Button';
import classes from './ConfirmAction.module.css'

const confirmAction = (props) => (
    <div className={classes.ConfirmAction}>
        <p className={classes.Information}>{props.content}</p>
        <div className={classes.Flexbox}>
            <Button btnType='Normal' clicked={props.cancel}>anuluj</Button>
            <Button btnType={props.btnContent === 'usuń' ? 'Danger' : 'Success'}
                clicked={props.confirm}>
                {props.btnContent}
            </Button>
        </div>
    </div>
)

export default confirmAction;