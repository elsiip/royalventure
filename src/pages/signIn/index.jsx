import Background from '../../assets/backgroundSignIn.png';
import "../../App.css"
import Navbar from "../../components/navbar";
import Footer from '../../components/footer';
import { Link, useNavigate} from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useState} from 'react';
import { Formik, Form, Field, ErrorMessage, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { db } from '../../firebase'; 
import { collection, query, where, getDocs } from 'firebase/firestore';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invaliid email')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
})

export default function SignIn(){
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (values, { setSubmitting }) => {
        try {
            setIsLoading(true)
            const {email, password} = values
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const token = await userCredential.user.getIdToken()
            
            localStorage.setItem('authToken', token)
            
            const querySnapshot = await getDocs(query(collection(db, 'users'), where('userId', '==', userCredential.user.uid)));
            querySnapshot.forEach((doc) => {
                const name = doc.data().name;
                toast.success(`Welcome back, ${name}`, {
                    autoClose: 3000,
                    hideProgressBar: true
                })
            });

            navigate('/')
        } catch (error) {
            setErrorMessage('Failed to sign in. Please check your email and password')
        } finally {
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
        <div className="relative" style={heroStyle}>
            <Navbar />
            <div className='container w-[500px] pb-[24.43px] bg-[#F5F5F5] ms-[113px] mt-[85px] rounded-[30px] px-[40px] pt-[22px]'>
                <h1 className='roboto-medium text-black text-center text-[28px] mb-[27px]' style={{lineHeight: '24px'}}>Welcome Back!</h1>
                <h2 className='roboto-bold text-black text-[38px] text-center mb-[27px]' style={{lineHeight: '24px'}}>SIGN IN</h2>  
                <Formik initialValues={{ email: '', password: ''}} validationSchema={validationSchema} onSubmit={handleLogin}>
                    {({errors, touched, isSubmitting }) => (
                        <Form className="needs-validation form-control">
                            <div>
                                <label htmlFor="email" className='roboto-light text-[18px] text-black mb-[9.43px]'>Email</label>
                                <Field type="email" name="email" placeholder='signin@gmail.com' className="form-control input input-bordered w-full h-[40px] mb-[20px]" />
                                <ErrorMessage name="email" component="div" className="text-red-500 invalid-feedback" />
                            </div>
                            <div>
                                <label htmlFor="password" className='roboto-light text-[18px] text-black mb-[9.43px]'>Password</label>
                                <Field type="password" name="password" placeholder='********' className="form-control input input-bordered w-full h-[40px] mb-[20px]" />
                                <ErrorMessage name="password" component="div" className="text-red-500 invalid-feedback" />
                            </div>                            
                            <div className='col-12 text-red-500 mt-2'>{errorMessage}</div>
                            <div className='mt-[20px] mb-[20.66px] flex justify-center'>
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
                <h1 className='text-center roboto-regular text-[#73737C] text-base mb-[24.43px]' style={{lineHeight: '24px'}}>Don’t have account?
                    <Link to='/signup' className='no-underline'>
                        <span className='roboto-bold text-base text-[#576250]'> Create an account</span>
                    </Link>
                </h1>
            </div>
        </div>
    )
}
