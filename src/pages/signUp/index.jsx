import Background from '../../assets/backgroundSignIn.png';
import "../../App.css"
import Navbar from "../../components/navbar";
import Footer from '../../components/footer';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { db } from '../../firebase'; // Import instance firestore Anda
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
})

export default function SignUp(){
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false); 
    
    const handleSignUp = async (values, { setSubmitting }) =>{
        try {
            setIsLoading(true)
            const {email, password, name} = values
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const token = await userCredential.user.getIdToken()

            // Simpan nama pengguna ke Firestore
            await addDoc(collection(db, 'users'), {
                userId: userCredential.user.uid,
                email: email,
                name: name,
            });

            toast.success(`Welcome, ${name}`, {
                autoClose: 3000,
                hideProgressBar: true
            })
            navigate("/")
        } catch (error) {
            console.error("Error during registration:", error)
            setErrorMessage('Failed to sign up. Please check your email and password')
        }finally{
            setIsLoading(false)
            setSubmitting(false)
        }
    }

    const heroStyle = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '870px', 
    };

    return(
        <div style={heroStyle}>
            <Navbar />
            <div className='container w-[500px] pb-[24.43px] bg-[#F5F5F5] ms-[113px] mt-[50px] mb-[168.88px] rounded-[30px] px-[40px] pt-[22px]'>
                <h1 className='roboto-medium text-black text-center text-[28px] mb-[27px]' style={{lineHeight: '24px'}}>Welcome</h1>
                <h2 className='roboto-bold text-black text-[38px] text-center mb-[27px]' style={{lineHeight: '24px'}}>SIGN UP</h2>  
                <Formik initialValues={{name: '', email: '', password: ''}} validationSchema={validationSchema} onSubmit={handleSignUp}>
                    {({ errors, touched, isSubmitting }) => (
                        <Form className='needs-validation form-control' >
                            <div>
                                <label htmlFor='name' className='roboto-light text-[18px] text-black mb-[10.43px]'>Name</label>
                                <Field type='text' name='name' placeholder='Enter your name' className='form-control input input-bordered w-full h-[40px] mb-[27px]' />
                                <ErrorMessage name='name' component='div' className='text-red-500 invalid-feedback' />
                            </div>
                            <div>
                                <label htmlFor='email' className='roboto-light text-[18px] text-black mb-[10.43px]'>Email</label>
                                <Field type='email' name='email' placeholder='signup@gmail.com' className='form-control input input-bordered w-full h-[40px] mb-[27px]' />
                                <ErrorMessage name='email' component='div' className='text-red-500 invalid-feedback' />
                            </div>
                            <div>
                                <label htmlFor='password' className='roboto-light text-[18px] text-black mb-[10.43px]'>Password</label>
                                <Field type='password' name='password' placeholder='********' className='form-control input input-bordered w-full h-[40px] mb-[27px]' />
                                <ErrorMessage name='password' component='div' className='text-red-500 invalid-feedback' />
                            </div>
                            <div className='col-12 text-red-500'>{errorMessage}</div>
                            <div className='mt-[27px] mb-[24.26px] flex justify-center'>
                                <button type='submit' className="btn rounded-[23px] w-[150px] h-[47.99px] bg-[#A19E96] hover:bg-[#576250] text-white text-base roboto-medium" disabled={isSubmitting || isLoading}>
                                    {isLoading ? (
                                        <span className="loading loading-dots loading-sm"></span>
                                    ) : (
                                        "SIGN IN"
                                    )}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <h1 className='text-center roboto-regular text-[#73737C] text-base' style={{lineHeight: '24px'}}>You have account?
                    <Link to='/signin' className='no-underline'>
                        <span className='roboto-bold text-base text-[#576250]'> Sign in now</span>
                    </Link>
                </h1>
            </div>
        </div>
    )
}
