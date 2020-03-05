import React, { Component } from 'react';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigations/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigations/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        sideDrawerIsOpen: false,
    }

    sideDrawerHandler = () => {
        this.setState(prevState => ({
            sideDrawerIsOpen: !prevState.sideDrawerIsOpen
        }));
    }

    render() {
        return (
            <>
                <SideDrawer open={this.state.sideDrawerIsOpen}
                    sideDrawerHandler={this.sideDrawerHandler} />
                <Toolbar open={this.state.sideDrawerIsOpen} clicked={this.sideDrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>
        );
    }
}

export default Layout;