import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useNavigate, useOutletContext } from 'react-router-dom';
import axios from 'axios';

const NewBlog = () => {
    const validationSchema = yup.object({
        title: yup.string()
            .required('Title required!')
            .max(26, 'Title should be maximum 26 characters!'),
        content: yup.string()
            .required('Content required!')
            .max(1000, 'Content should be maximum 1000 characters!')
    });

    const responseBody = useOutletContext();
    const navigate = useNavigate();
    const createBlog = (title, content) => {
        console.log(responseBody);
        axios.post('http://localhost:5000/posts/create', {
            title, content, creatorEmail: responseBody.email, userId: responseBody.userId
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(() => {
            navigate('/');
            window.location.reload(false);
        })
    }

    return (
        <div className='grid place-items-center bg-gray-800 min-h-screen text-white'>
            <Formik
                initialValues={{
                    title: '',  
                    content: ''
                }}
                onSubmit={values => createBlog(values.title, values.content)}
                validationSchema={validationSchema}
            >
            {({ errors, touched }) => (
                <Form className='flex flex-col'>
                    <h1 className='text-2xl self-center'>Create New Blog</h1>
                    <label className='mt-4'>Title</label>
                    <Field className='w-96 bg-gray-800 border-2 rounded-lg border-gray-600 p-2 transition outline-none focus:border-orange-500 focus:border-2' name="title" placeholder="Your title" />
                    {errors.title && touched.title && (
                        <p className='text-red-500'>{errors.title}</p>
                    )}
                    <label className='mt-4'>Content</label>
                    <Field component='textarea' className='w-96 h-80 bg-gray-800 border-2 rounded-lg border-gray-600 p-2 transition outline-none focus:border-orange-500 focus:border-2'
                    name="content" placeholder='Your content' />
                    {errors.content && touched.content && (
                        <div className='text-red-500'>{errors.content}</div>
                    )}
                    <button className="bg-gray-700 mt-2 pt-2 pb-2 rounded-md transition hover:bg-gray-600"
                        type='submit'>Submit</button>
                </Form>
            )
            }
            </Formik>
        </div>
    );
}

export default NewBlog;