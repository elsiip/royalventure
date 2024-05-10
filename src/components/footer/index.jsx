import Logo from '../../assets/logo.png';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import useAuth from "../../hook/authContext";

export default function Footer() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('token');
            navigate('/signin');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <footer className={`px-[200px] py-[20px] flex justify-between items-center roboto-regular`} style={{backgroundColor: '#424242'}}>
            <NavLink to="/" className="flex items-center">
                <img src={Logo} alt="Logo" />
            </NavLink>
            {/* <img src={Logo} alt="Logo" /> */}
            <div className='flex space-x-[40px] text-white'>
                {currentUser ? (
                    <span className="text-gray-400 cursor-not-allowed">Sign In/Sign Up</span>
                ) : (
                    <NavLink to='/signin' className="text-white">Sign In/Sign Up</NavLink>
                )}
                {currentUser ? (
                    <button onClick={handleSignOut} className="cursor-pointer">Sign Out</button>
                ) : (
                    <span className="text-gray-400 cursor-not-allowed">Sign Out</span>
                )}
                <button>About us</button>
                {currentUser && (
                    <NavLink to="/history" className='text-white'>History</NavLink>
                )}
                {/* <NavLink to="/history" className="text-white">History</NavLink>                */}
                <button>Privacy Policy</button>
                <NavLink to="/chatai" className="text-white">FAQ</NavLink>
            </div>
            <div className='flex space-x-[8px] text-white'>
                <button><FontAwesomeIcon icon={faFacebook} className='w-[24px] h-[24px]' /></button>
                <button><FontAwesomeIcon icon={faInstagram} className='w-[24px] h-[24px]' /></button>
                <button><FontAwesomeIcon icon={faTwitter} className='w-[24px] h-[24px]' /></button>
            </div>
        </footer>
    );
}
