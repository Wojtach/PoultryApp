import React, { Component } from 'react';

import Farm from '../../components/Farm/Farm';

const farms = [
    {
        id: '1234ddcd',
        name: 'Ferma Owieczki',
        adress: 'Owieczki 25',
        halls: [
            {
                name: 'Kurnik 1',
                id: 'dfasfaba'
            },
            {
                name: 'Kurnik 2',
                id: 'dfaasfasffaba'
            },
            {
                name: 'Kurnik 3',
                id: 'dfas22faba'
            },
            {
                name: 'Kurnik 4',
                id: 'dfaees22faba'
            },
        ]
    },
    {
        id: '1234dwwdcd',
        name: 'Ferma Prostki',
        adress: 'Prostki 35',
        halls: [
            {
                name: 'Kurnik A',
                id: 'dfaswwfaba'
            },
            {
                name: 'Kurnik B',
                id: 'dfaasfaqqqsffaba'
            },
            {
                name: 'Kurnik C',
                id: 'dfaseee22faba'
            },
        ]
    }
];

class MyFarms extends Component {
    state = {
        fetchedFarms: farms,
    }

    render() {

        const allFarms = this.state.fetchedFarms.map(farm =>
            <Farm key={farm.id} farmProps={farm} />);

        return (
            <div className='grid'>
                {allFarms}
            </div>
        );
    }
}

export default MyFarms;