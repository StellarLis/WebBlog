import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { mainContext } from '../App';

const Register = () => {
    const validationSchema = yup.object({
        email: yup.string()
            .required('Email required!')
            .email('Invalid email address!'),
        password: yup.string()
            .required('Password required!')
            .min(6, 'Password should be minimum 6 characters!')
            .max(26, 'Password should be maximum 26 characters!'),
        repeatedPassword: yup.string()
            .required('Repeated password required!')
            .test('password-match', 'Passwords must match!', function(value) {
                return this.parent.password === value;
            })
    });

    const navigate = useNavigate();
    const [serverError, setServerError] = useState(null);
    const backendUrl = useContext(mainContext);
    const register = (email, password) => {
        axios.post(`${backendUrl}/auth/register`, {
            email, password
        }).then(response => {
            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate('/');
            window.location.reload(false);
        }).catch(err => {
            setServerError(err.response.data.message);
        })
    }

    return (
        <div className='grid place-items-center bg-gray-800 min-h-screen text-white'>
            <Formik
                initialValues={{
                    email: '',  
                    password: ''
                }}
                onSubmit={values => register(values.email, values.password)}
                validationSchema={validationSchema}
            >
            {({ errors, touched }) => (
                <Form className='flex flex-col'>
                    <h1 className='text-2xl self-center'>Register</h1>
                    <label className='mt-4'>Email</label>
                    <Field className='w-96 bg-gray-800 border-2 rounded-lg border-gray-600 p-2 transition outline-none focus:border-orange-500 focus:border-2' name="email" placeholder="Your email" />
                    {errors.email && touched.email && (
                        <p className='text-red-500'>{errors.email}</p>
                    )}
                    <label className='mt-4'>Password</label>
                    <Field className='w-96 bg-gray-800 border-2 rounded-lg border-gray-600 p-2 transition outline-none focus:border-orange-500 focus:border-2'
                    name="password" placeholder='Your password' type="password" />
                    {errors.password && touched.password && (
                        <div className='text-red-500'>{errors.password}</div>
                    )}
                    <label className='mt-4'>Confirm password</label>
                    <Field className='w-96 bg-gray-800 border-2 rounded-lg border-gray-600 p-2 transition outline-none focus:border-orange-500 focus:border-2'
                    name="repeatedPassword" placeholder='Repeat a password' type="password" />
                    {errors.repeatedPassword && touched.repeatedPassword && (
                        <div className='text-red-500'>{errors.repeatedPassword}</div>
                    )}
                    <button className="bg-gray-700 mt-2 pt-2 pb-2 rounded-md transition hover:bg-gray-600"
                        type='submit'>Submit</button>
                    <p className='mt-1 text-red-500 text-xl self-center font-bold'>{serverError}</p>
                </Form>
            )
            }
            </Formik>
        </div>
    );
}
 
export default Register;