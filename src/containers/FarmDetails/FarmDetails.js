import React, { Component } from 'react';

// import Form from '../../components/UI/Form/Form';
import FarmDetailsList from '../../components/FarmDetailsList/FarmDetailsList';

class FarmDetails extends Component {
    state = {
        edit: {
            workers: false,
            halls: false,
            delivers: false
        },
        workers: [
            {
                name: 'Marian',
                lastname: 'Czerepko',
                id: '23sfsd122'
            },
            {
                name: 'Robert',
                lastname: 'Wo',
                id: '23sfsd332'
            }
        ],
        halls: [
            {
                name: 'Kurnik 1',
                id: '23sfsd33ss2'
            },
            {
                name: 'Kurnik 2',
                id: '23sfsd33ssww2'
            },
        ],
        delivers: [
            {
                // name: 'Wipasz',
                // id: '23sfsd3ee3ss2'
            },
            {
                // name: 'GasPol',
                // id: '23sfs22d33ssww2'
            },
        ]
    }

    handleEditMode = (type) => {
        console.log(type);
        this.setState(prevState => ({
            edit: {
                ...prevState.edit,
                [type]: !prevState.edit[type]
            }
        }))
    }

    render() {
        return (
            <div className='grid'>
                <FarmDetailsList name='Pracownicy'
                    click={() => this.handleEditMode('workers')}
                    arr={this.state.workers}
                    edit={this.state.edit.workers} />
                <FarmDetailsList name='Kurniki'
                    click={() => this.handleEditMode('halls')}
                    arr={this.state.halls}
                    edit={this.state.edit.halls} />
                <FarmDetailsList name='Dostawcy'
                    click={() => this.handleEditMode('delivers')}
                    arr={this.state.delivers}
                    edit={this.state.edit.delivers} />
            </div>
        );
    }
}

export default FarmDetails;