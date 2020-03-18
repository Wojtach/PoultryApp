import React, { Component } from 'react';

// import Form from '../../components/UI/Form/Form';
import Modal from '../../components/UI/Modal/Modal';
import SectionContainer from '../../components/SectionContainer/SectionContainer';
import ConfirmAction from '../../components/ConfirmAction/ConfirmAction';
import FarmDetailsList from '../../components/FarmDetailsList/FarmDetailsList';
import FormikForm from '../../components/FormikForm/FormikForm';

class FarmDetails extends Component {
    state = {
        edit: {
            workers: false,
            halls: false,
            delivers: false
        },
        deleting: false,
        objectToDelete: {
            name: null,
            id: null,
            type: null
        },
        fetchedData: {
            pracownicy: [
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
            kurniki: [
                {
                    name: 'Kurnik 1',
                    id: '23sfsd33ss2'
                },
                {
                    name: 'Kurnik 2',
                    id: '23sfsd33ssww2'
                },
            ],
            dostawcy: [
                {
                    name: 'Wipasz',
                    id: '23sfsd3ee3ss2'
                },
                {
                    name: 'GasPol',
                    id: '23sfs22d33ssww2'
                },
            ]
        }
    }

    handleEditMode = (type) => {
        this.setState(prevState => ({
            edit: {
                ...prevState.edit,
                [type]: !prevState.edit[type]
            }
        }))
    }

    deleteObjectHandler = (id, type) => {
        const toDelete = this.state.fetchedData[type].find(item => item.id === id);
        this.setState({
            deleting: true,
            objectToDelete: {
                name: toDelete.name,
                id: toDelete.id,
                type
            }
        })
    }

    confirmDeleteHandler = () => {
        const { type, id } = this.state.objectToDelete;
        const updatedObjects = this.state.fetchedData[type].filter(object => object.id !== id);
        this.setState(prevState => ({
            fetchedData: {
                ...prevState.fetchedData,
                [type]: updatedObjects
            },
            deleting: false
        }));
    }

    cancelDeleteHandler = () => {
        this.setState({
            deleting: false
        })
    }



    render() {
        const fields = [
            { label: 'Imie', type: 'input', name: 'name', value: '', placeholder: 'Wpisz imię pracownika' },
            { label: 'Nazwisko', type: 'input', name: 'lastName', value: '', placeholder: 'Wpisz nazwisko pracownika' },
        ];

        const FarmDetails = Object.keys(this.state.fetchedData).map(type => {
            return <FarmDetailsList
                key={type}
                name={type}
                click={() => this.handleEditMode(type)}
                delete={this.deleteObjectHandler}
                arr={this.state.fetchedData[type]}
                edit={this.state.edit[type]} />
        })

        return (
            <>
                <Modal cancel={this.cancelDeleteHandler} show={this.state.deleting} >
                    <ConfirmAction
                        name={this.state.objectToDelete.name}
                        confirm={this.confirmDeleteHandler}
                        cancel={this.cancelDeleteHandler}
                    />
                </Modal>
                <div className='grid'>
                    {FarmDetails}
                </div>
                <FormikForm inputs={fields} />
            </>
        );
    }
}

export default FarmDetails;