import React from 'react';

import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {

    let classToggler = [classes.SideDrawer, classes.Close];

    if (props.open) {
        classToggler = [classes.SideDrawer, classes.Open];
    }

    return (
        <>
            <Backdrop show={props.open} clicked={props.sideDrawerHandler} />
            <div className={classToggler.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <ul>
                    <NavigationItems />
                </ul>
            </div>
        </>
    );
}

export default sideDrawer;