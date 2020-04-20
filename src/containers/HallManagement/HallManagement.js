import React, { Component } from 'react';
import { v1 as generateId } from 'uuid';

import classes from './HallManagement.module.css';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import FormikForm from '../../components/FormikForm/FormikForm';

class HallManagement extends Component {
    state = {
        daysOfPeroid: [],
        peroids: null,
        selectedValue: '',
        selectedPeroid: null,
        showForm: false,
        indexOfDay: null
    }

    componentDidMount() {
        // api zwraca peroids if null set peroids as [{id: 1, end: ' '}]
        const peroids = [
            // {
            //     id: 1,
            //     end: ' '
            // }
            {
                id: 'ddde',
                days: 'idOfArray',
                count: 22,
                start: '10.01.2020',
                end: null
            },
            {
                id: 'rkere',
                days: 'reffee',
                count: 1,
                start: '02.11.2019',
                end: '28.12.2019'
            }
        ]
        this.setState({
            peroids,
            selectedValue: peroids[0].id,
            selectedPeroid: peroids[0],
        })
    }
    selectHandler = (event) => {
        const selectedPeroid = this.state.peroids.find(peroid => peroid.id === event.target.value);
        this.setState({
            selectedValue: event.target.value,
            selectedPeroid,
            showForm: false
        })
    }

    closePeroidHandler = () => {
        const peroidToClose = { ...this.state.selectedPeroid };
        peroidToClose.end = new Date().toLocaleDateString("pl", { year: "numeric", day: "2-digit", month: "2-digit" });
        const updatedPeroids = [...this.state.peroids];
        updatedPeroids[0] = peroidToClose;
        this.setState({
            peroids: updatedPeroids,
            selectedPeroid: peroidToClose,
            showForm: false
        })
    }

    showFormHandler = () => {
        this.setState(prevState => ({
            showForm: !prevState.showForm,
            indexOfDay: null
        }))
    }

    startPeroidHandler = () => {
        const newPeroid = {
            id: generateId(),
            days: 'daedde',
            count: 0,
            start: new Date().toLocaleDateString("pl", { year: "numeric", day: "2-digit", month: "2-digit" }),
            end: null
        }
        if (this.state.selectedValue !== 1) {
            this.setState({
                peroids: [newPeroid, ...this.state.peroids],
                selectedValue: newPeroid.id,
                selectedPeroid: newPeroid
            })
        } else {
            this.setState({
                peroids: [newPeroid],
                selectedValue: newPeroid.id,
                selectedPeroid: newPeroid
            })
        }
    }

    confirmAddDayHandler = (values) => {
        const newDay = {
            id: generateId(),
            date: new Date().toLocaleDateString("pl", { year: "numeric", day: "2-digit", month: "2-digit" }),
            ...values,
        }
        const updatedDays = [...this.state.daysOfPeroid, newDay];
        const updatedPeroid = {
            ...this.state.selectedPeroid,
            count: this.state.selectedPeroid.count + 1
        };
        const updatedPeroids = [...this.state.peroids];
        updatedPeroids[0] = updatedPeroid;
        this.setState({
            peroids: updatedPeroids,
            daysOfPeroid: updatedDays,
            selectedPeroid: updatedPeroid,
            showForm: false
        })
    }

    showDayHandler = (index) => {
        this.setState({
            indexOfDay: index,
            showForm: true,
        });
    }

    confirmEditDayHandler = (values) => {
        const { daysOfPeroid, indexOfDay } = this.state;
        const days = [...daysOfPeroid];
        const editedDay = { ...daysOfPeroid[indexOfDay], ...values };
        days[indexOfDay] = editedDay;
        this.setState({
            daysOfPeroid: days,
            showForm: false
        })
    }

    render() {
        let selectOpt = null;
        let daysContainer = null;
        if (this.state.selectedValue && this.state.selectedValue !== 1) {

            selectOpt = this.state.peroids.map(option => {
                return <option key={option.id} value={option.id}>
                    {`${option.start} - ${option.end ? option.end : 'teraz'}`}
                </option>
            })

            daysContainer = this.state.selectedPeroid.count ? <ul className={classes.DaysContainer}>
                {
                    [...Array(this.state.selectedPeroid.count).keys()].map(i => <li onClick={this.state.showForm ? null : () => this.showDayHandler(i)} className={classes.Day} key={i}>{i + 1}</li>).reverse()
                }
            </ul> : null;
        } else {
            selectOpt = <option>Dodaj pierwszy okres</option>
        }

        const fields = [
            {
                label: 'Temp. zewnętrzna',
                type: 'input',
                name: 'tempOut',
                value: '',
                placeholder: 'Temp',
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
                label: 'Temp. wewnętrzna',
                type: 'input',
                name: 'tempIn',
                value: '',
                placeholder: 'Temperatura wewnętrzna',
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
                label: 'Temp. zewnętrzna',
                type: 'input',
                name: 'owner',
                value: '',
                placeholder: 'Temp',
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

        return (
            <>
                {this.state.peroids ?
                    <div>
                        <h1 style={{ textAlign: "center" }}>Nazwa Fermy - Nazwa Kurnika</h1>
                        <div className={classes.Dropdown}>
                            <select className={classes.Select} id='peroid' value={this.state.selectedValue} onChange={this.selectHandler}>
                                {selectOpt}
                            </select></div>
                        <div className={classes.Buttons}>
                            {this.state.selectedPeroid === this.state.peroids[0] ? this.state.selectedPeroid.end ? <Button clicked={this.startPeroidHandler} btnType='Success'>Rozpocznij okres</Button> : <Button btnType='Danger' clicked={this.closePeroidHandler}>Zakończ okres</Button> : null}
                            {this.state.selectedPeroid.end ? null : <Button clicked={this.showFormHandler} btnType='Success'>Dodaj dzień</Button>}
                            <Button btnType='Normal'>Dodaj notatke</Button>
                        </div>
                        {daysContainer}
                    </div>
                    : <Spinner />}
                {this.state.showForm && this.state.selectedPeroid ? <FormikForm
                    header={`dzień ${this.state.indexOfDay + 1 ? this.state.indexOfDay + 1 : this.state.selectedPeroid.count + 1}`}
                    objectToEdit={this.state.daysOfPeroid[this.state.indexOfDay]}
                    inputs={fields}
                    cancel={this.showFormHandler}
                    editObject={this.confirmEditDayHandler}
                    addObject={this.confirmAddDayHandler} /> : null}
            </>
        );
    }
}

export default HallManagement;