import { Formik } from "formik";
import { Fragment } from "react";
import { Form } from "react-router-dom";

export const FormUser = ({ inputConfigs, initialValues, onSubmit, validationSchema, txtBtn }: any) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <>
                <Form className='space-y-8'>
                    {/* Renderizar los inputs configurados */}
                    {inputConfigs.map((config: any) => (
                        <Fragment key={config.id}>
                            {/* <InputFormLogin id={config.id} content={config.title} /> */}
                        </Fragment>
                    ))}
                    
                    <p>Debes aceptar el Captcha</p>
                    {/* <Buttom style='w-full'>{txtBtn}</Buttom> */}
                </Form>
            </>
        </Formik>
    );
};