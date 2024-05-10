import React from "react";
import "../../App.css";
import Testimonial1 from "../../assets/testimonial1.png";
import Testimonial2 from "../../assets/testimonial2.png";
import Testimonial3 from "../../assets/testimonial3.png";

export default function Testimonials() {
    return(
        <div className="p-0 m-0" id="testimonials">
            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full bg-[#585B56]">
                <div className="justify-center items-center text-center">
                        <h1 className="roboto-bold text-white mt-[48px] mb-[4px]" style={{fontSize: '32px',lineHeight: '40px', letterSpacing: '-0.64px'}}>Testimonials</h1>
                        <h3 className="roboto-regular text-[#B8C1B2] text-base" style={{lineHeight: '24px'}}>from happy, delighted couples</h3>
                        <div className="flex space-x-[16px] mt-[48px] justify-center items-center m-auto max-w-[60%]">
                            <h1 className="text-[128px] roboto-bold text-[#464D43]" style={{lineHeight: '136px', letterSpacing: '-2.56px'}}>“</h1>
                            <p className="roboto-regular text-base text-[#FAFAFA]" style={{lineHeight: '24px'}}>I cannot emphasize enough how grateful I am to Royal Venture Wedding Organizer. From our first meeting to our wedding day, they have shown an exceptional level of professionalism and attention to every detail. Not only did they assist us in planning every aspect of the wedding, but they also provided the much-needed emotional support throughout the preparation. 
                                <br/><br/>The result? Our dream wedding came true without stress and worries. I highly recommend Royal Venture Wedding Organizer to anyone looking for an unforgettable wedding service.</p>
                            <h1 className="text-[128px] roboto-bold text-[#464D43]" style={{lineHeight: '136px', letterSpacing: '-2.56px'}}>”</h1>
                        </div>
                        <div className="flex justify-center items-center mt-[48px]">
                            <img src={Testimonial1} alt="Testimonial Joy & Jordan" className="w-[88px] h-[88px]"/>
                        </div>
                        <h1 className="roboto-medium text-white text-sm mt-[9px] mb-[79px]" style={{lineHeight: '22px'}}>Joy & Jordan</h1>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle">❮</a> 
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div> 
                <div id="slide2" className="carousel-item relative w-full bg-[#585B56]">
                    <div className="justify-center items-center text-center">
                        <h1 className="roboto-bold text-white mt-[48px] mb-[4px]" style={{fontSize: '32px',lineHeight: '40px', letterSpacing: '-0.64px'}}>Testimonials</h1>
                        <h3 className="roboto-regular text-[#B8C1B2] text-base" style={{lineHeight: '24px'}}>from happy, delighted couples</h3>
                        <div className="flex space-x-[16px] mt-[48px] justify-center items-center m-auto max-w-[60%]">
                            <h1 className="text-[128px] roboto-bold text-[#464D43]" style={{lineHeight: '136px', letterSpacing: '-2.56px'}}>“</h1>
                            <p className="roboto-regular text-base text-[#FAFAFA]" style={{lineHeight: '24px'}}>We consider ourselves lucky to have worked with Royal Venture Wedding Organizer. They not only helped us navigate the complex world of weddings but also became outstanding partners in designing our event. From vendor selection to meeting scheduling, every step was carried out meticulously and with care. 
                                <br/><br/>Our wedding was so beautiful and memorable thanks to the dedication and hard work of their team. Thank you, Royal Venture Wedding Organizer, for everything!</p>
                            <h1 className="text-[128px] roboto-bold text-[#464D43]" style={{lineHeight: '136px', letterSpacing: '-2.56px'}}>”</h1>
                        </div>
                        <div className="flex justify-center items-center mt-[48px]">
                            <img src={Testimonial2} alt="Testimonial Charlotte & William" className="w-[88px] h-[88px]"/>
                        </div>
                        <h1 className="roboto-medium text-white text-sm mt-[9px] mb-[79px]" style={{lineHeight: '22px'}}>Charlotte & William</h1>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">❮</a> 
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div> 
                <div id="slide3" className="carousel-item relative w-full bg-[#585B56]">
                    <div className="justify-center items-center text-center">
                        <h1 className="roboto-bold text-white mt-[48px] mb-[4px]" style={{fontSize: '32px',lineHeight: '40px', letterSpacing: '-0.64px'}}>Testimonials</h1>
                        <h3 className="roboto-regular text-[#B8C1B2] text-base" style={{lineHeight: '24px'}}>from happy, delighted couples</h3>
                        <div className="flex space-x-[16px] mt-[48px] justify-center items-center m-auto max-w-[60%]">
                            <h1 className="text-[128px] roboto-bold text-[#464D43]" style={{lineHeight: '136px', letterSpacing: '-2.56px'}}>“</h1>
                            <p className="roboto-regular text-base text-[#FAFAFA]" style={{lineHeight: '24px'}}>We would like to express our gratitude to Royal Venture Wedding Organizer for their outstanding assistance and support throughout our wedding journey. From the initial ideas to the big day, they truly understood our vision and worked hard to make it a reality. They helped us handle every detail, provided valuable advice, and ensured everything ran smoothly.
                                <br/><br/>We couldn't ask for more from this fantastic team. Thank you, Royal Venture Wedding Organizer, for your dedication and hard work!</p>
                            <h1 className="text-[128px] roboto-bold text-[#464D43]" style={{lineHeight: '136px', letterSpacing: '-2.56px'}}>”</h1>
                        </div>
                        <div className="flex justify-center items-center mt-[48px]">
                            <img src={Testimonial3} alt="Testimonial Im Sol & Ryu Seon Jae" className="w-[88px] h-[88px]"/>
                        </div>
                        <h1 className="roboto-medium text-white text-sm mt-[9px] mb-[79px]" style={{lineHeight: '22px'}}>Im Sol & Ryu Seon Jae</h1>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle">❮</a> 
                    <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div> 
                
            </div>
        </div>
    )
}