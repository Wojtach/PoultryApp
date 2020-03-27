import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Farm from '../../components/Farm/Farm';
import Modal from '../../components/UI/Modal/Modal';
import ConfirmAction from '../../components/ConfirmAction/ConfirmAction';

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
            {
                name: 'Kurnik 5',
                id: 'dfaees22f33aba'
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
        deleting: false,
        farmToDelete: {
            name: null,
            id: null
        }
    }

    deleteFarmHandler = (id) => {
        const toDelete = this.state.fetchedFarms.find(farm => farm.id === id);
        this.setState({
            deleting: true,
            farmToDelete: {
                name: toDelete.name,
                id: toDelete.id
            }
        })
    }

    cancelDeleteHandler = () => {
        this.setState({
            deleting: false
        })
    }

    confirmDeleteHandler = () => {
        const updatedFarms = this.state.fetchedFarms.filter(farm => farm.id !== this.state.farmToDelete.id);
        this.setState({
            fetchedFarms: updatedFarms,
            deleting: false
        });
    }

    detailsFarmHandler = (id, farmName) => {
        this.props.history.push(`/myfarms/farmdetails/${farmName.replace(' ', '_')}`);
        //pobiera dane o kurnikach dostawcach i pracownikach do store
        //pobiera dane o formularzu do store
    }

    render() {

        const allFarms = this.state.fetchedFarms.map(farm =>
            <Farm
                deleteFarm={() => this.deleteFarmHandler(farm.id)}
                detailsFarm={() => this.detailsFarmHandler(farm.id, farm.name)}
                key={farm.id}
                farmDetails={farm}
            />);

        return (
            <>
                <Modal cancel={this.cancelDeleteHandler} show={this.state.deleting} >
                    <ConfirmAction
                        name={this.state.farmToDelete.name}
                        btnContent='usuń'
                        confirm={this.confirmDeleteHandler}
                        cancel={this.cancelDeleteHandler}
                    />
                </Modal>
                <div className='grid'>
                    {allFarms}
                </div>
            </>
        );
    }
}

export default MyFarms;