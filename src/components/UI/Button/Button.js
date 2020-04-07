import React from 'react';

import classes from './Button.module.css'

const button = (props) => {
    let btnClasses = [classes.Button, classes[props.btnType]];

    if (props.edit) {
        btnClasses = [classes.RoundButton, classes[props.btnSign], classes[props.btnType], classes[props.size]];
        if (props.editmode) {
            btnClasses.push(classes.RoundButtonOn)
        }
    }


    return (
        <button
            type={props.submit ? 'submit' : 'button'}
            onClick={props.clicked}
            className={btnClasses.join(' ')}>
            {props.children}
        </button>
    );
}

export default button;