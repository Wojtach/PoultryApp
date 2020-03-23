import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import ConfirmAction from '../../components/ConfirmAction/ConfirmAction';
import FarmDetailsList from '../../components/FarmDetailsList/FarmDetailsList';
import FormikForm from '../../components/FormikForm/FormikForm';

// dodać state do dodawania zeby formularz wyswietlalł sie po kliku w plus dopier i do tego dodać scrollTo i bedzie git
// potem dodać reduxa zeby uporządkowac akcje i state - zrobić mniejszy komponent

class FarmDetails extends Component {
    state = {
        edit: {
            pracownicy: false,
            kurniki: false,
            dostawcy: false
        },
        deleting: false,
        objectToDelete: {
            name: null,
            id: null,
            type: null
        },
        formToRender: null,
        fetchedData: {
            pracownicy: [
                {
                    name: 'Marian',
                    lastName: 'Czerepko',
                    id: '23sfsd122'
                },
                {
                    name: 'Robert',
                    lastName: 'Wo',
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
        const defaultEdit = {}
        for (let key in this.state.edit) {
            defaultEdit[key] = false;
        }
        this.setState(prevState => ({
            edit: {
                ...defaultEdit,
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

    confirmAddObjectHandler = (type, object) => {
        let newObject = { ...object, id: Math.random() };
        this.setState(prevState => ({
            ...prevState,
            fetchedData: {
                ...prevState.fetchedData,
                [type]: [
                    ...prevState.fetchedData[type],
                    newObject
                ]
            }
        }))
    }

    toggleFormVisibilityhandler = () => {
        let formToRender = Object.keys(this.state.edit).find(key => this.state.edit[key]);
        this.setState({
            formToRender
        })
    }

    render() {
        const forms = {
            pracownicy: {
                header: 'pracownika',
                fields: [
                    { label: 'Imie', type: 'input', name: 'name', value: '', placeholder: 'Wpisz imię pracownika' },
                    { label: 'Nazwisko', type: 'input', name: 'lastName', value: '', placeholder: 'Wpisz nazwisko pracownika' },
                ]
            },
            kurniki: {
                header: 'kurnik',
                fields: [
                    { label: 'Nazwa', type: 'input', name: 'name', value: '', placeholder: 'Wpisz nazwe kurnika' },
                ]
            },
            dostawcy: {
                header: 'dostawce',
                fields: [
                    { label: 'Nazwa', type: 'input', name: 'name', value: '', placeholder: 'Wpisz nazwe dostawcy' },
                ]
            },
        };

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
                {this.state.formToRender ? <FormikForm header={forms[this.state.formToRender].header}
                    inputs={forms[this.state.formToRender].fields}
                    type={this.state.formToRender}
                    cancel={form}
                    addObject={this.confirmAddObjectHandler} /> : null}
            </>
        );
    }
}

export default FarmDetails;