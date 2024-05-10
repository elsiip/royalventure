import React, { useState, useEffect } from "react";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { db } from '../../firebase'; // Import instance firestore Anda
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import useAuth from "../../hook/authContext";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

export default function Reservation() {
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        contact: Yup.string().required('Contact information is required'),
        partner1: Yup.string().required("Partner 1's name is required"),
        partner2: Yup.string().required("Partner 2's name is required"),
        date: Yup.date().required('Wedding date is required'),
        package: Yup.string().required('Please select a package'),
    });

    const formik = useFormik({
        initialValues: {
            contact: '',
            partner1: '',
            partner2: '',
            date: '',
            package: '',
            notes: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setIsLoading(true);

            try {
                if (!currentUser) {
                    throw new Error("User is not authenticated.");
                }

                await addDoc(collection(db, 'reservation'), {
                    ...values,
                    userId: currentUser.uid,
                    email: currentUser.email,
                    createdAt: serverTimestamp()
                });
                alert('Reservation sent successfully!');
                resetForm();
            } catch (error) {
                console.error("Error saving reservation:", error);
                setError('Please sign in to make a reservation.');
                console.log('useEffect is running');
                if (!currentUser) {
                    console.log('No current user, redirecting');
                    alert('Please sign in to make a reservation.');
                    navigate('/signin');
                }
            } finally {
                setIsLoading(false);
                setSubmitting(false);
            }
        },
    });

    return (
        <div id="reservation" className="flex justify-between mx-[200px]">
            <div className="w-full lg:w-[422px] mt-[56px]">
                <h1 className="roboto-bold text-[#576250] text-[32px]" style={{ lineHeight: '40px', letterSpacing: '-0.64px' }}>Reservation</h1>
                <h3 className="roboto-regular text-[#B8C1B2] text-base" style={{ lineHeight: '24px' }}>We are excited to get planning!</h3>
                <form onSubmit={formik.handleSubmit} className="form-control">
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {/* Form fields */}
                    <div className="mt-[24px]">
                        <label htmlFor="contact" className="roboto-medium text-base text-[#576250]" style={{ lineHeight: '24px' }}>Contact Information</label>
                        <input type="text" name="contact" id="contact" placeholder="Phone no." className="input input-bordered w-full h-[40px] mt-[16px]" onChange={formik.handleChange} value={formik.values.contact} />
                        {formik.touched.contact && formik.errors.contact ? <div style={{ color: 'red' }}>{formik.errors.contact}</div> : null}
                    </div>
                    <div className="mt-[24px]">
                        <label htmlFor="getMerried" className="roboto-medium text-base text-[#576250]" style={{ lineHeight: '24px' }}>Who's getting married</label>
                        <input type="text" name="partner1" id="partner1" placeholder="Partner 1" className="input input-bordered w-full h-[40px] mt-[16px]" onChange={formik.handleChange} value={formik.values.partner1} />
                        {formik.touched.partner1 && formik.errors.partner1 ? <div style={{ color: 'red' }}>{formik.errors.partner1}</div> : null}
                        <input type="text" name="partner2" id="partner2" placeholder="Partner 2" className="input input-bordered w-full h-[40px] mt-[16px]" onChange={formik.handleChange} value={formik.values.partner2} />
                        {formik.touched.partner2 && formik.errors.partner2 ? <div style={{ color: 'red' }}>{formik.errors.partner2}</div> : null}
                        <input type="datetime-local" name="date" id="date" className="input input-bordered w-full h-[40px] mt-[16px]" onChange={formik.handleChange} value={formik.values.date} />
                        {formik.touched.date && formik.errors.date ? <div style={{ color: 'red' }}>{formik.errors.date}</div> : null}
                    </div>
                    <div className="mt-[16px]">
                        <select className="select select-bordered w-full h-[40px]" name="package" onChange={formik.handleChange} value={formik.values.package}>
                            <option value="">Select a Package</option>
                            <option value="Intimate Wedding">Intimate Wedding</option>
                            <option value="Seaside Elegance Wedding">Seaside Elegance Wedding</option>
                            <option value="Grand Wedding">Grand Wedding</option>
                        </select>
                        {formik.touched.package && formik.errors.package ? <div style={{ color: 'red' }}>{formik.errors.package}</div> : null}
                    </div>
                    <div className="mt-[16px] mb-[24px]">
                        <textarea name="notes" id="notes" className="textarea textarea-bordered w-full h-[162px]" placeholder="Tell us anything more that can help! (Optional)" onChange={formik.handleChange} value={formik.values.notes}></textarea>
                    </div>
                    <div className="mb-[119px]">
                        <button type="submit" className="btn bg-[#A19E96] hover:bg-[#576250] text-white w-[160px]">
                            {isLoading ? (
                                <span className="loading loading-dots loading-sm"></span>
                            ) : (
                                "Send"
                            )}
                        </button>
                    </div>
                </form>
            </div>
            <div className="mt-[64px]">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d493.9457037760091!2d112.66096829221168!3d-7.940350236381776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1714580071787!5m2!1sid!2sid" width="393" height="360" className="border-none" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                <h1 className="mt-[24px] roboto-regular text-[#576250] text-base" style={{ lineHeight: '24px' }}>Head Office</h1>
                <p className="mt-[8px] roboto-regular text-base text-[#90998B]" style={{ lineHeight: '24px' }}>Royal Venture Wedding Organizer <br /> Jl. Blimbing Indah Megah, <br />Kota Araya, Blimbing, <br /> Kota Malang</p>
                <p className="mt-[8px] roboto-regular text-base text-[#90998B]" style={{ lineHeight: '24px' }}>Phone : 032 1 0442 <br />Mobile: +62 8575 5008381</p>
                <h1 className="mt-[24px] roboto-medium text-[#576250] text-base" style={{ lineHeight: '24px' }}>Follow Us</h1>
                <div className="flex space-x-[8px] mt-[16px]">
                    <button><FontAwesomeIcon icon={faFacebook} className='w-[24px] h-[24px] text-[#90998B]' /></button>
                    <button><FontAwesomeIcon icon={faInstagram} className='w-[24px] h-[24px] text-[#90998B]' /></button>
                    <button><FontAwesomeIcon icon={faTwitter} className='w-[24px] h-[24px] text-[#90998B]' /></button>
                </div>
            </div>
        </div>
    )
}
