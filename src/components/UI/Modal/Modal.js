import React from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
    const visibility = props.show ? 'Show' : 'Hide';
    return (
        <>
            <Backdrop show={props.show} clicked={props.cancel} />
            <div className={[classes.Modal, classes[visibility]].join(' ')}>
                {props.children}
            </div>
        </>
    );
}

export default modal;