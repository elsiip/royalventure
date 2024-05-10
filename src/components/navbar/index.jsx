import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import Logo from '../../assets/logo.png';
import '../../App.css';
import useAuth from "../../hook/authContext";

export default function Navbar() {
    const navbarStyle = {
        backgroundColor: 'transparent', 
    };

    const { currentUser } = useAuth();

    return (
        <div className={`px-[64px] py-[24px] flex justify-between items-center roboto-regular`} style={navbarStyle}>
            <NavLink to="/" className="flex items-center">
                <img src={Logo} alt="Logo" />
            </NavLink>
            <div className='flex space-x-[40px]'>
                <NavLink to="/" className="text-white">Home</NavLink>
                <ScrollLink to="packages" smooth={true} duration={1500} className='text-white cursor-pointer'> Packages</ScrollLink>
                <ScrollLink to="services" smooth={true} duration={2500} className='text-white cursor-pointer'> Services</ScrollLink>
                <ScrollLink to="testimonials" smooth={true} duration={3500} className='text-white cursor-pointer'> Testimonials</ScrollLink>
                <ScrollLink to="reservation" smooth={true} duration={4500} className='text-white cursor-pointer'> Reservation</ScrollLink>
                {currentUser && (
                    <NavLink to="/history" className='text-white'>History</NavLink>
                )}
                {/* <NavLink to="/history" className='text-white'>History</NavLink> */}
                {currentUser ? (
                    <span className="text-gray-400 cursor-not-allowed">Sign In/Sign Up</span>
                ) : (
                    <NavLink to='/signin' className="text-white">Sign In/Sign Up</NavLink>
                )}
            </div>
        </div>
    );
}
