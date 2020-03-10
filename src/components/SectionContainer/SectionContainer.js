import React from 'react';

import classes from './SectionContainer.module.css';

const sectionContainer = (props) => {
    return (
        <section className={classes.SectionContent}>
            <header className={classes.SectionHeader}>{props.headerText}</header>
            {props.children}
        </section>
    );
}

export default sectionContainer;