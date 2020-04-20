import React, { Component } from 'react';
import { animateScroll as scroll } from 'react-scroll'
import { Formik, Field, Form, ErrorMessage } from 'formik';

import Button from '../UI/Button/Button';
import classes from './FormikForm.module.css';

import * as Yup from 'yup';

class FormikForm extends Component {

    componentDidMount() {
        scroll.scrollToBottom();
    }
    componentWillUnmount() {
        scroll.scrollToTop();
    }

    createYupSchema = (schema, config) => {
        const { name, validationType, validations = [] } = config;
        if (!Yup[validationType]) {
            return schema;
        }
        let validator = Yup[validationType]();
        validations.forEach(validation => {
            const { params, type } = validation;
            if (!validator[type]) {
                return;
            }
            validator = validator[type](...params);
        });
        schema[name] = validator;
        return schema;
    }

    createFileds = (props) =>
        this.props.inputs.map(input => {
            let error = props.errors[input.name] && props.touched[input.name];
            return (
                <div className={classes.FieldContainer} key={input.name}>
                    <div className={classes.Field}>
                        <label htmlFor={input.name}>{input.label}</label>
                        <Field name={input.name} error={error}>
                            {props => (
                                <input
                                    className={error ? [classes.InputError, classes.Input].join(' ') : classes.Input}
                                    {...props.field}
                                    type='text'
                                    placeholder={input.placeholder}
                                    id={input.name}
                                />
                            )}
                        </Field>
                        <div className={classes.ErrorMessage}>
                            <ErrorMessage name={input.name} />
                        </div>

                    </div>
                </div>
            )
        })

    getInitValues(inputs) {
        const initialValues = {};
        inputs.forEach(field => {
            if (this.props.objectToEdit) {
                initialValues[field.name] = this.props.objectToEdit[field.name];
            } else {
                initialValues[field.name] = '';
            }
        });
        return initialValues;
    }

    render() {
        const initialValues = this.getInitValues(this.props.inputs);
        const yupSchema = this.props.inputs.reduce(this.createYupSchema, {});
        const validationSchema = Yup.object().shape(yupSchema);
        return (
            <div className={classes.Form}>
                <h2>{this.props.objectToEdit ? 'Edytuj' : 'Dodaj'} {this.props.header}</h2>
                <Formik
                    onSubmit={values => this.props.objectToEdit ?
                        this.props.editObject(values) : this.props.addObject(values)}
                    validationSchema={validationSchema}
                    initialValues={initialValues}>
                    {formikProps => {
                        return <div>
                            <Form>
                                {this.createFileds(formikProps)}
                                <div className={classes.ButtonsContainer}>
                                    <Button btnType='Danger' clicked={this.props.cancel}>Anuluj</Button>
                                    <Button submit btnType='Success' clicked={formikProps.onSubmit}>Zatwierdź</Button>
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