import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const Login = () => {
    const validationSchema = yup.object({
        email: yup.string()
            .required('Email required!')
            .email('Invalid email address!'),
        password: yup.string()
            .required('Password required!')
            .min(6, 'Password should be minimum 6 characters!')
            .max(26, 'Password should be maximum 26 characters!')
    });

    const navigate = useNavigate();
    const [serverError, setServerError] = useState(null);
    const login = (email, password) => {
        axios.post('http://localhost:5000/auth/login', {
            email, password
        }).then(response => {
            const token = response.data.token;
            localStorage.setItem('token', token);
            navigate('/');
            window.location.reload(false);
        }).catch(() => {
            setServerError('Invalid email or password')
        });
    }

    return (
        <div className='grid place-items-center bg-gray-800 min-h-screen text-white'>
            <Formik
                initialValues={{
                    email: '',  
                    password: ''
                }}
                onSubmit={values => login(values.email, values.password)}
                validationSchema={validationSchema}
            >
            {({ errors, touched }) => (
                <Form className='flex flex-col'>
                    <h1 className='text-2xl self-center'>Login</h1>
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
                    <button className="bg-gray-700 mt-2 pt-2 pb-2 rounded-md transition hover:bg-gray-600"
                        type='submit'>Submit</button>
                    <p className='self-center mt-1'>Don't have an account? <Link to='/register' className='text-blue-500 transition hover:text-blue-400'>Create one!</Link></p>
                    <p className='mt-1 text-red-500 text-xl self-center font-bold'>{serverError}</p>
                </Form>
            )
            }
            </Formik>
        </div>
    );
}
 
export default Login;