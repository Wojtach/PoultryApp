import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';

import Button from '../UI/Button/Button';
import classes from './FormikForm.module.css';

class FormikForm extends Component {

    createFileds(inputs) {
        return inputs.map(input => {
            return (
                <div className={classes.FieldContainer} key={input.name}>
                    <label htmlFor={input.name}>{input.label}</label>
                    <div>
                        <Field name={input.name}>
                            {props => (
                                <input
                                    {...props.field}
                                    type='text'
                                    placeholder={input.placeholder}
                                    id={input.name}
                                />
                            )}
                        </Field>
                    </div>
                </div>
            )
        })
    }

    getInitValues(inputs) {
        const initialValues = {};
        inputs.forEach(field => {
            if (!initialValues[field.name]) {
                initialValues[field.name] = field.value;
            }
        });
        return initialValues;
    }

    render() {
        const initialValues = this.getInitValues(this.props.inputs);
        return (
            <div className={classes.Form}>
                <h2>Dodaj pracownika</h2>
                <Formik
                    onSubmit={values => (console.log(values))}
                    validationSchema={this.props.validation} not yet
                    initialValues={initialValues}>
                    {formikProps => {
                        return <div>
                            <Form>
                                {/* <pre>{JSON.stringify(formikProps.values, null, 2)}</pre> */}
                                {this.createFileds(this.props.inputs)}
                                <div className={classes.ButtonsContainer}>
                                    <Button btnType='Danger'>Anuluj</Button>
                                    <Button btnType='Success' click={formikProps.handleSubmit}>Zatwierdź</Button>
                                </div>
                            </Form>
                        </div>
                    }}
                </Formik>
            </div>
        );
    }
}

export default FormikForm;