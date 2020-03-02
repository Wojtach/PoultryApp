import React from 'react';

import Farm from './Farm/Farm';

const farms = (props) => {

    const allFarms = props.farms.map(farm => <Farm key={farm.id} farmProps={farm} />);

    return (
        <>
            {allFarms}
        </>
    );
}

export default farms;