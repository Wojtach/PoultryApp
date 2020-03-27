import React from 'react';
import { Link } from 'react-router-dom';

import poultryappLogo from '../../assets/img/logo1.png';
import classes from './Logo.module.css';

const logo = () => {
    return (
        <div className={classes.Logo}>
            <Link to='/'>
                <img src={poultryappLogo} alt="poultryapp logo" />
            </Link>
        </div>
    );
}

export default logo;