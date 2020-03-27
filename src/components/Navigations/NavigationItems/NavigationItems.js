import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link='/'>Strona glowna</NavigationItem>
        <NavigationItem link='/myfarms'>My Farms</NavigationItem>
    </ul>
)

export default navigationItems;