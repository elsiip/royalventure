import React from "react";
import "../../App.css";
import Vector from "../../assets/vector.png";
import Photography from "../../assets/photography.png";
import Ceremony from "../../assets/ceremony.png";
import Design from "../../assets/design.png";
import Dress from "../../assets/dress.png";

const servicesData = [
    { image: Photography, title: "Photography", alt: "Photography" },
    { image: Ceremony, title: "Ceremony", alt: "Ceremony" },
    { image: Design, title: "Wedding Design", alt: "Wedding Design" },
    { image: Dress, title: "Wedding Dress", alt: "Wedding Dress" }
];

export default function Services() {
    const vectorStyle = {
        backgroundImage: `url(${Vector})`,
        backgroundPosition: "center",
        height: "370px"
    };

    return (
        <div id="services" className="mb-[144.18px] h-[1229px]" style={vectorStyle}>
            <div className="container items-center justify-center pt-[42px] ps-[32px] pe-[28px] ms-[169px]" style={{ maxWidth: "75%" }}>
                <h1 className="roboto-bold" style={{ fontSize: "32px", lineHeight: "40px", letterSpacing: "-0.64px", color: "#576250" }}>Services</h1>
                <p className="w-[214px] mt-[4px] text-base" style={{ lineHeight: "24px", color: "#B8C1B2" }}>to plan and orchestrate your special occasion</p>
                <div className="flex space-x-[16px] mt-[10px]">
                    {servicesData.map((service, index) => (
                        <div key={index} className="card w-[248px] h-[280px] bg-white shadow-xl">
                            <figure className="mt-[12px] ms-[12px] me-[13px]">
                                <img src={service.image} alt={service.alt} className="w-[223px] h-[210px]" style={{ borderRadius: "8px 8px 0px 0px" }} />
                            </figure>
                            <div className="card-body items-center text-center p-0 h-[58px]">
                                <h2 className="card-title text-[#90998B] roboto-medium text-base my-[16px]" style={{ lineHeight: "24px" }}>{service.title}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
