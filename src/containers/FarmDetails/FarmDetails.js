import React, { Component } from 'react';
import { animateScroll as scroll } from 'react-scroll'

import Modal from '../../components/UI/Modal/Modal';
import ConfirmAction from '../../components/ConfirmAction/ConfirmAction';
import FarmDetailsList from '../../components/FarmDetailsList/FarmDetailsList';
import FormikForm from '../../components/FormikForm/FormikForm';



class FarmDetails extends Component {
    state = {
        editType: null,
        deleting: false,
        objectToDelete: {
            name: null,
            id: null,
        },
        objectToEdit: null,
        showForm: false,
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
        if (this.state.editType === type) {
            this.setState({
                editType: null,
                showForm: false,
            })
        } else {
            this.setState({
                editType: type,
                showForm: false,
            })
        }
    }


    deleteObjectHandler = (id, name) => {
        const toDelete = this.state.fetchedData[this.state.editType].find(item => item.id === id);
        this.setState({
            deleting: true,
            objectToDelete: {
                name,
                id: toDelete.id,
            }
        })
    }

    confirmDeleteHandler = () => {
        const { id } = this.state.objectToDelete;
        const type = this.state.editType;
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

    confirmAddObjectHandler = (object) => {
        let newObject = { ...object, id: Math.random() };
        const type = this.state.editType;
        this.setState(prevState => ({
            ...prevState,
            showForm: false,
            fetchedData: {
                ...prevState.fetchedData,
                [type]: [
                    ...prevState.fetchedData[type],
                    newObject
                ]
            }
        }))
        scroll.scrollToTop();
    }

    objectToEdit = (id) => {
        const { fetchedData, editType } = this.state;
        const objectToEdit = fetchedData[editType].find(object => object.id === id);
        this.setState({
            objectToEdit,
            showForm: true
        }, scroll.scrollToBottom());
    }

    submitEditedObjectHandler = (values) => {
        const { objectToEdit, fetchedData, editType } = this.state;
        const editedObject = { ...values, id: objectToEdit.id };
        const newArrayOfObjects = fetchedData[editType]
            .map(item => item.id === editedObject.id ? editedObject : item);
        this.setState({
            objectToEdit: null,
            fetchedData: {
                ...fetchedData,
                [editType]: newArrayOfObjects
            }
        }, this.showFormHandler)
    }

    showFormHandler = () => {
        this.setState(prevState => ({
            showForm: !prevState.showForm,
            objectToEdit: null
        }), () => this.state.showForm ? scroll.scrollToBottom() : scroll.scrollToTop())
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
                    {
                        label: 'Nazwa',
                        type: 'input',
                        name: 'name',
                        value: '',
                        placeholder: 'Wpisz nazwe dostawcy',
                        validationType: 'string',
                        validations: [
                            {
                                type: 'required',
                                params: ['Pole nie może być puste']
                            },
                            {
                                type: 'min',
                                params: [5, 'Nazwa musi składać się z więcej niż 5 znaków']
                            },
                            {
                                type: 'max',
                                params: [20, 'Nazwa musi składać się z mniej niż 20 znaków']
                            }
                        ]
                    },
                    {
                        label: 'Właściciel',
                        type: 'input',
                        name: 'owner',
                        value: '',
                        placeholder: 'Wpisz nazwe właściciela',
                        validationType: 'string',
                        validations: [
                            {
                                type: 'required',
                                params: ['Pole nie może być puste']
                            },
                            {
                                type: 'min',
                                params: [5, 'Nazwa musi składać się z więcej niż 5 znaków']
                            },
                            {
                                type: 'max',
                                params: [20, 'Nazwa musi składać się z mniej niż 20 znaków']
                            }
                        ]
                    },
                ]
            },
        };

        const FarmDetails = Object.keys(this.state.fetchedData).map(objectType => {
            return <FarmDetailsList
                key={objectType}
                name={objectType}
                click={() => this.handleEditMode(objectType)}
                objectToEdit={this.objectToEdit}
                delete={this.deleteObjectHandler}
                showForm={this.showFormHandler}
                arr={this.state.fetchedData[objectType]}
                edit={this.state.editType} />
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
                <h2 style={{ textAlign: 'center' }}>{this.props.match.params.farmName.replace('_', ' ')}</h2>
                <div className='grid'>
                    {FarmDetails}
                </div>
                {this.state.editType && this.state.showForm ? <FormikForm id='form' header={forms[this.state.editType].header}
                    name='form'
                    objectToEdit={this.state.objectToEdit}
                    inputs={forms[this.state.editType].fields}
                    type={this.state.editType}
                    cancel={this.showFormHandler}
                    editObject={this.submitEditedObjectHandler}
                    addObject={this.confirmAddObjectHandler} /> : null}
            </>
        );
    }
}

export default FarmDetails;