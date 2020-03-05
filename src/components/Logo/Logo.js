import React from 'react';

import poultryappLogo from '../../assets/img/logo1.png';
import classes from './Logo.module.css';

const logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={poultryappLogo} alt="poultryapp logo" />
        </div>
    );
}

export default logo;