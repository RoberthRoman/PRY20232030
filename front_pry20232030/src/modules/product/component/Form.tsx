import { useFormik } from 'formik';
import * as Yup from 'yup';

interface InitialData {
    [key: string]: string;
}

const selectOptions = ['Option 1', 'Option 2', 'Option 3']; //REEMPLAZAR POR NOMBRES DE LOS PRODUCTOS

const Form = ({ initialData, title }: { initialData: InitialData, title: string }) => {

    const validationSchema = Yup.object().shape(
        Object.keys(initialData).reduce((schema, key) => {
            let fieldValidation
            if (key !== 'numericFieldName') {
                fieldValidation = Yup.string().required("No puede estar vacio")
            }
            else {
                fieldValidation = Yup.number()
                    .typeError("La cantidad debe ser un número")
                    .positive("La cantidad debe ser un número positivo")
                    .required("La cantidad es obligatoria")
            }
            return {
                ...schema,
                [key]: fieldValidation,
            };
        }, {})
    );

    const formik = useFormik({
        initialValues: initialData,
        validationSchema: validationSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    

    return (
        <div>
            <p className='text-4xl font-bold mb-4'>{title}</p>

            <form onSubmit={formik.handleSubmit} className='space-y-4'>
                {Object.keys(initialData).map(key => (
                    key !== 'selectField' ? (
                        <div key={key} className='space-y-1'>
                            <label htmlFor={key} className={` ${formik.touched[key] && formik.errors[key] ? 'text-red-500' : 'text-black'}`}>{key}</label>
                            <input
                                id={key}
                                type="text"
                                {...formik.getFieldProps(key)}
                                className={`w-full text-xl border border-[#707070] px-2 py-1 rounded-md ${formik.touched[key] && formik.errors[key] ? 'border-2 !border-red-500' : ''
                                    }`}
                            />
                            {formik.touched[key] && formik.errors[key] && (
                                <div className='text-red-500 font-semibold'>{formik.errors[key]}</div>
                            )}
                        </div>
                    ) : (
                        <div key={key} className='space-y-1'>
                            <label htmlFor={key} className={` ${formik.touched[key] && formik.errors[key] ? 'text-red-500' : 'text-black'}`}>Select an Option</label>
                            <select
                                id={key}
                                {...formik.getFieldProps(key)}
                                className={`bg-white w-full text-xl border border-[#707070] px-2 py-1 rounded-md ${formik.touched[key] && formik.errors[key] ? 'border-2 !border-red-500' : ''
                                    }`}
                            >
                                <option value="">Select an option</option>
                                {selectOptions.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            {formik.touched[key] && formik.errors[key] && (
                                <div className='text-red-500 font-semibold'>{formik.errors[key]}</div>
                            )}
                        </div>
                    )
                ))}
                <button type="submit" className='bg-[#4b836b] text-white w-full py-4 rounded-md font-bold !mt-8'>Submit</button>
            </form>
        </div>
    );
}

export default Form