import React, { Component } from 'react';
import { v1 as generateId } from 'uuid';

import classes from './HallManagement.module.css';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import FormikForm from '../../components/FormikForm/FormikForm';

class HallManagement extends Component {
    state = {
        peroids: null,
        selectedValue: '',
        selectedPeroid: null,
        showForm: false
    }

    componentDidMount() {
        // api zwraca peroids if null set peroids as [{id: 1, end: ' '}]
        const peroids = {
            1: {
                id: 1,
                end: ' ',
                daysCount: 0
            },
            // 3123123123: {
            //     id: '3123123123',
            //     start: '10.01.2020',
            //     end: null,
            //     days: id of array with days of chosen peroid, 
            //     daysCount: 33
            //   
            // },
            // 31231233132133: {
            //     id: '31231233132133',
            //     start: '10.01.2020',
            //     end: '20.12.2019',
            //     days: {
            //         count: 10,
            //         data: {}
            //     },
            // },
        }
        // [
        // {
        //     id: 1,
        //     end: ' '
        // }
        //     {
        //         id: 'ddde',
        //         days: {
        //             count: 1,
        //             date: {}
        //         },
        //         start: '10.01.2020',
        //         end: null
        //     },
        //     {
        //         id: 'rkere',
        //         days: [{}, {}, {}],
        //         start: '02.11.2019',
        //         end: '28.12.2019'
        //     }
        // ]
        this.setState({
            peroids,
            selectedValue: Object.keys(peroids)[0],
            selectedPeroid: peroids[Object.keys(peroids)[0]],
        })
    }
    selectHandler = (event) => {
        this.setState({
            selectedValue: event.target.value,
            selectedPeroid: {
                ...this.state.peroids[event.target.value]
            }
        })
    }

    closePeroidHandler = () => {
        const peroidToClose = { ...this.state.selectedPeroid };
        peroidToClose.end = new Date().toLocaleDateString("pl", { year: "numeric", day: "2-digit", month: "2-digit" });
        this.setState({
            selectedPeroid: peroidToClose,
            peroids: { ...this.state.peroids, [peroidToClose.id]: peroidToClose },
        })
    }

    showFormHandler = () => {
        this.setState(prevState => ({
            showForm: !prevState.showForm
        }))
    }

    startPeroidHandler = () => {
        const id = generateId();
        const newPeroid = {
            id,
            daysCount: 0,
            days: 213213,
            start: new Date().toLocaleDateString("pl", { year: "numeric", day: "2-digit", month: "2-digit" }),
            end: null
        }
        if (this.state.selectedValue !== '1') {
            this.setState({
                peroids: { [id]: newPeroid, ...this.state.peroids },
                selectedValue: id,
                selectedPeroid: newPeroid
            })
        } else {
            this.setState({
                peroids: { [id]: newPeroid },
                selectedValue: id,
                selectedPeroid: newPeroid
            })
        }
    }

    confirmAddDayHandler = (values) => {
        const date = new Date().toLocaleDateString("pl", { year: "numeric", day: "2-digit", month: "2-digit" });
        const newDay = {
            ...values,
            id: generateId(),
        }
        this.setState(prevState => ({
            peroids: {
                ...prevState.peroids,
                [prevState.selectedValue]: {
                    ...prevState.peroids[prevState.selectedValue],
                    days: {
                        [date]: newDay,
                        ...prevState.peroids[prevState.selectedValue].days,
                        count: prevState.peroids[prevState.selectedValue].daysCount + 1
                    }
                }
            },
            selectedPeroid: {
                ...prevState.selectedPeroid,
                daysCount: prevState.selectedPeroid.daysCount + 1
            }
        }))
    }

    render() {
        const { peroids, selectedValue, selectedPeroid } = this.state;
        let selectOpt = null;
        let daysContainer = null;
        if (selectedValue && selectedValue !== '1') {
            console.log(this.state.selectedPeroid.daysCount);

            selectOpt = Object.keys(peroids).map(peroid => {
                return <option key={peroid} value={peroid}>
                    {`${peroids[peroid].start} - ${peroids[peroid].end ? peroids[peroid].end : 'teraz'}`}
                </option>
            })

            daysContainer = selectedPeroid.daysCount ? <ul className={classes.DaysContainer}>
                {
                    [...Array(selectedPeroid.daysCount).keys()].map(i => <li className={classes.Day} key={i}>{i + 1}</li>).reverse()
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
                            {this.state.selectedPeroid === this.state.peroids[Object.keys(this.state.peroids)[0]] ? this.state.selectedPeroid.end ? <Button clicked={this.startPeroidHandler} btnType='Success'>Rozpocznij okres</Button> : <Button btnType='Danger' clicked={this.closePeroidHandler}>Zakończ okres</Button> : null}
                            {this.state.selectedPeroid.end ? null : <Button clicked={this.showFormHandler} btnType='Success'>Dodaj dzień</Button>}
                            <Button btnType='Normal'>Dodaj notatke</Button>
                        </div>
                        {daysContainer}
                    </div>
                    : <Spinner />}
                {this.state.showForm && this.state.selectedPeroid ? <FormikForm
                    id='form'
                    header={'Dzień ' + (this.state.selectedPeroid.daysCount + 1)}
                    objectToEdit={this.state.objectToEdit}
                    inputs={fields}
                    cancel={this.showFormHandler}
                    editObject={this.confirmEditDayHandler}
                    addObject={this.confirmAddDayHandler} /> : null}
            </>
        );
    }
}

export default HallManagement;