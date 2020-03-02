import React, { Component } from 'react';

import Farms from '../../components/Farms/Farms';

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
        return (
            <div>
                <Farms farms={this.state.fetchedFarms} />
            </div>
        );
    }
}

export default MyFarms;