import HeroImg from "../../assets/hero-image.png"
import Navbar from "../../components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-scroll"

export default function Hero(){
    const heroStyle = {
        backgroundImage: `url(${HeroImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '870px', 
    };

    return(
        <div className="relative" style={heroStyle}>
            <Navbar />
            <div className="container justify-center items-center mt-[100px] px-[200px]" style={{ maxWidth: '100%'}}>
                <h1 className="roboto-bold text-center" style={{fontSize: '56px', lineHeight: '1.2', maxWidth: '90%', margin: 'auto', color: '#576250'}}>Crafting Your Dream Wedding, Seamlessly Executed.</h1> 
                <p className="roboto-regular text-center text-base pt-[16px]" style={{lineHeight: '24px', maxWidth: '70%', margin: 'auto', color: '#90998B'}}>Welcome to your dream wedding destination! We are committed to bringing every aspect of your wedding dreams to life seamlessly. From planning to execution, our expert team is ready to take on every detail with precision. Discover how we can turn your wedding dreams into reality.</p>
                <div className="mt-[56px]" style={{ textAlign: 'center' }}> 
                    <Link
                        to="packages" 
                        smooth={true} 
                        duration={1500} 
                        offset={-70} 
                        className="mt-[56px]" 
                    >
                        <FontAwesomeIcon icon={faArrowDown} className="w-[24px] h-[24px]" style={{ color: '#90998B' }} />
                        <p className="roboto-regular text-sm" style={{ color: '#90998B', lineHeight: '22px' }}>Scroll</p>
                    </Link>
                    {/* <FontAwesomeIcon icon={faArrowDown} className="w-[24px] h-[24px]" style={{color: '#90998B'}} />
                    <p className="roboto-regular text-sm" style={{color: '#90998B', lineHeight: '22px'}}>Scroll</p> */}
                </div>
            </div>
        </div>
    )
}
