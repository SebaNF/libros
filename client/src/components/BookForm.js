import React from 'react';
import { Field, Formik, Form } from 'formik';
import * as Yup from "yup";

const BookForm = (props) => {

    const {title, author, genre, onSubmitProp} = props;
    
    return (
        <div>
            <Formik
                initialValues={{
                    title: title,
                    author: author,
                    genre: genre,
                }}
                validationSchema={Yup.object().shape({
                    title: Yup
                        .string()
                        .required("Por favor ingrese el título"),
                    author: Yup
                        .string()
                        .required("Por favor ingrese un autor"),
                    genre: Yup
                        .string()
                        .required("Por favor ingrese una genero")


                })}
                onSubmit={(values, { setSubmitting }) => {
                    onSubmitProp(values);
                }}
            >
                {({ errors, touched, handleSubmit }) => {
                    return (
                    <div>
                        <Form>
                            <div className="container-fluid">
                                <div className="row">
                                    <div>
                                        <label htmlFor="title">Título</label>
                                        <Field id="title" type="text" name="title" className="form-control" />
                                        {errors.title && touched.title && <p className='error-validation' >{errors.title}</p>}

                                        <label htmlFor="author">Autor</label>
                                        <Field id="author" type="text" name="author" className="form-control" />
                                        {errors.author && touched.author && <p className='error-validation'>{errors.author}</p>}

                                        <label htmlFor="genre">Genero</label>
                                        <Field id="genre" type="text"  name="genre" className="form-control" />
                                        {errors.genre && touched.genre && <p className='error-validation'>{errors.genre}</p>}
                                    </div>
                                    
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={Object.values(errors).length > 0 || Object.values(touched).length === 0}>Enviar</button>
                            </div>
                        </Form>
                    </div>)
                }}

            </Formik>
        </div>
    );
}

export default BookForm;
