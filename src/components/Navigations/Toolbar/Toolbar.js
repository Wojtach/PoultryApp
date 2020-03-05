import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (props) => {

    return (
        <header className={classes.Toolbar}>
            <div className={classes.Burger}
                onClick={props.clicked}>
                <span>&nbsp;</span>
                <span>&nbsp;</span>
                <span>&nbsp;</span>
                <span>&nbsp;</span>
            </div>
            <Logo />
            <nav className={classes.Mobile}>
                <NavigationItems />
            </nav>
        </header>
    );
}

export default toolbar;